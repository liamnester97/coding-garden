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
  explanation: z.string().min(1),
});

export const challengePublicSchema = challengeQuestionSchema.omit({
  answer: true,
  explanation: true,
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
  if (difficulty === "medium")
    return finding.type === "dead-code"
      ? "roots"
      : finding.type === "coverage-gap"
        ? "tests"
        : "safety";
  return finding.type === "dead-code"
    ? "check incoming imports before removing it"
    : finding.type === "coverage-gap"
      ? "add a test for this path"
      : "patch the reported vulnerability and rerun checks";
}

function explanationFor(
  finding: HealthReport["findings"][number],
  difficulty: ChallengeDifficulty,
) {
  if (difficulty === "easy")
    return "This plant has one warning signal in the report.";
  if (difficulty === "medium")
    return finding.type === "dead-code"
      ? "Roots show whether another plant depends on this code."
      : finding.type === "coverage-gap"
        ? "Tests give this code sunlight by checking that its path still works."
        : "Safety checks help us understand and repair a security warning.";
  return finding.type === "dead-code"
    ? "Check incoming imports before removing code that may be unused."
    : finding.type === "coverage-gap"
      ? "Add a small test for this path, then run the checks."
      : "Patch the reported issue, then run the checks again.";
}

function objectiveFor(type: HealthReport["findings"][number]["type"]) {
  if (type === "dead-code") return "Notice when a code plant may be unused.";
  if (type === "coverage-gap") return "See how a test helps protect code.";
  if (type === "vulnerability")
    return "Spot a code safety warning before fixing it.";
  return "Understand one code signal before acting.";
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
        ? `Look at the plant. How many warning signs do you see? Enter a number.`
        : difficulty === "medium"
          ? `What should we check first: roots, tests, or safety? Type one word.`
          : `What is one safe next step for this plant? Keep it short.`,
    hint:
      difficulty === "easy"
        ? "Count the warning signs on the plant."
        : difficulty === "medium"
          ? finding.type === "dead-code"
            ? "Look at the roots to see who depends on this plant."
            : finding.type === "coverage-gap"
              ? "Tests give a plant sunlight."
              : "Safety checks help us handle a security warning."
          : "Check first, then make the smallest safe change.",
    answer: answerFor(finding, difficulty),
    explanation: explanationFor(finding, difficulty),
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
