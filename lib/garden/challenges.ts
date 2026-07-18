import type { HealthReport } from "@/lib/analysis/schema";
import { z } from "zod";

export const challengeDifficultySchema = z.enum(["easy", "medium", "hard"]);
export const challengeToolSchema = z.enum([
  "clippers",
  "watering-can",
  "pesticide",
]);

export const challengeQuestionSchema = z.object({
  id: z.string().min(1),
  findingId: z.string().min(1),
  nodeId: z.string().min(1),
  tool: challengeToolSchema,
  difficulty: challengeDifficultySchema,
  objective: z.string().min(1),
  prompt: z.string().min(1),
  hint: z.string().min(1),
  answer: z.string().min(1),
});

export const challengePublicSchema = challengeQuestionSchema.omit({
  answer: true,
});
export type ChallengeDifficulty = z.infer<typeof challengeDifficultySchema>;
export type ChallengeQuestion = z.infer<typeof challengeQuestionSchema>;
export type PublicChallengeQuestion = z.infer<typeof challengePublicSchema>;

const toolForFinding = {
  "dead-code": "clippers",
  "coverage-gap": "watering-can",
  vulnerability: "pesticide",
} as const;

const difficultyRank: Record<ChallengeDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

function answerFor(
  finding: HealthReport["findings"][number],
  difficulty: ChallengeDifficulty,
) {
  if (difficulty === "easy") return "1";
  if (difficulty === "medium") return finding.evidence.tool;
  return finding.type === "dead-code"
    ? "check incoming imports before removing it"
    : finding.type === "coverage-gap"
      ? "add a test for this path"
      : "patch the reported vulnerability and rerun checks";
}

function objectiveFor(type: HealthReport["findings"][number]["type"]) {
  if (type === "dead-code")
    return "Recognize evidence of an unused module before changing code.";
  if (type === "coverage-gap")
    return "Connect a missing test path to the protection it provides.";
  if (type === "vulnerability")
    return "Explain why a security signal needs verification before a fix.";
  return "Interpret a measured code-health signal before acting.";
}

export function questionForFinding(
  report: HealthReport,
  findingId: string,
  difficulty: ChallengeDifficulty,
): ChallengeQuestion | null {
  const finding = report.findings.find(
    (candidate) => candidate.id === findingId,
  );
  if (!finding || !(finding.type in toolForFinding)) return null;
  return challengeQuestionSchema.parse({
    id: `question-${finding.id}-${difficulty}`,
    findingId: finding.id,
    nodeId: finding.nodeId,
    tool: toolForFinding[finding.type as keyof typeof toolForFinding],
    difficulty,
    objective: objectiveFor(finding.type),
    prompt:
      difficulty === "easy"
        ? `How many report signals are attached to ${finding.evidence.file}? Enter a number.`
        : difficulty === "medium"
          ? `Which analyzer produced this signal for ${finding.evidence.file}? Enter its short name.`
          : `In a few words, what is the safest next step for this signal at ${finding.evidence.file}?`,
    hint:
      difficulty === "easy"
        ? "Count the warning cards for this file."
        : difficulty === "medium"
          ? `Look at the evidence label: ${finding.evidence.tool}.`
          : "Choose an action that verifies understanding and protects the code.",
    answer: answerFor(finding, difficulty),
  });
}

export function publicQuestion(
  question: ChallengeQuestion,
): PublicChallengeQuestion {
  return challengePublicSchema.parse(question);
}

export function normalizeAnswer(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function answerIsCorrect(question: ChallengeQuestion, value: string) {
  const actual = normalizeAnswer(value);
  const expected = normalizeAnswer(question.answer);
  if (actual === expected) return true;
  if (difficultyRank[question.difficulty] === 3) {
    return [
      "remove the unused code after checking imports",
      "write a test for this path",
      "add a test for this path and rerun checks",
      "fix the vulnerability and rerun checks",
    ].some((phrase) => actual.includes(phrase));
  }
  return false;
}
