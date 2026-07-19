import type { HealthReport } from "@/lib/analysis/schema";
import {
  teachingQuestionContent,
  teachingQuestionContentSchema,
} from "@/content/teaching-questions";
import { z } from "zod";

export const challengeDifficultySchema = z.enum(["easy", "medium", "hard"]);
export const challengeToolSchema = z.enum([
  "clippers",
  "watering-can",
  "pesticide",
]);
export const challengeQuestionTypeSchema = z.enum([
  "notice",
  "evidence",
  "safe-next-step",
]);
export const challengeGradeBandSchema = z.enum([
  "grades-1-5",
  "grades-6-8",
  "grades-9-12",
]);

export const challengeQuestionSchema = z.object({
  id: z.string().min(1),
  findingId: z.string().min(1),
  nodeId: z.string().min(1),
  tool: challengeToolSchema,
  difficulty: challengeDifficultySchema,
  questionType: challengeQuestionTypeSchema,
  gradeBand: challengeGradeBandSchema,
  objective: z.string().min(1),
  prompt: z.string().min(1),
  hint: z.string().min(1),
  scaffolds: z.array(z.string().min(1)).min(1).max(3),
  answer: z.string().min(1),
  explanation: z.string().min(1),
  codeExcerpt: z.string().min(1).max(1200),
  language: z.literal("javascript"),
  choices: z.array(z.string().min(1).max(180)).min(2).max(4),
  answers: z.array(z.string().min(1)).min(1),
});

export const challengePublicSchema = challengeQuestionSchema.omit({
  answer: true,
  explanation: true,
  answers: true,
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

function fallbackContent(finding: HealthReport["findings"][number]) {
  const content = teachingQuestionContent[finding.id];
  if (content) return teachingQuestionContentSchema.parse(content);
  const choices = [
    "Read the report evidence before choosing a change.",
    "The plant is healthy because it is green.",
    "Change the repository without checking anything.",
  ];
  return {
    findingId: finding.id,
    codeExcerpt: `// Evidence file: ${finding.evidence.file}\n// ${finding.summary}`,
    language: "javascript" as const,
    choices,
    answers: [choices[0]],
    explanation: finding.summary,
  };
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

function scaffoldsFor(
  finding: HealthReport["findings"][number],
  difficulty: ChallengeDifficulty,
) {
  const topic =
    finding.type === "dead-code"
      ? "roots"
      : finding.type === "coverage-gap"
        ? "tests"
        : "safety";
  return [
    "Look at the plant and name the kind of warning you see.",
    `For this warning, check ${topic} first.`,
    difficulty === "hard"
      ? "Say one small, safe next step before making a change."
      : "Use the clue, then try your answer again.",
  ];
}

function objectiveFor(type: HealthReport["findings"][number]["type"]) {
  if (type === "dead-code") return "Notice when a code plant may be unused.";
  if (type === "coverage-gap") return "See how a test helps protect code.";
  if (type === "vulnerability")
    return "Spot a code safety warning before fixing it.";
  return "Understand one code signal before acting.";
}

function gradeBandFor(difficulty: ChallengeDifficulty) {
  return difficulty === "easy"
    ? "grades-1-5"
    : difficulty === "medium"
      ? "grades-6-8"
      : "grades-9-12";
}

function questionTypeFor(difficulty: ChallengeDifficulty) {
  return difficulty === "easy"
    ? "notice"
    : difficulty === "medium"
      ? "evidence"
      : "safe-next-step";
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
  const content = fallbackContent(finding);
  const difficultyAnswer = answerFor(finding, difficulty);
  const isCurated = Boolean(teachingQuestionContent[finding.id]);
  const answer = isCurated ? content.answers[0] : difficultyAnswer;
  const prompt = isCurated
    ? difficulty === "easy"
      ? "Look at the code. Which answer best describes the problem?"
      : difficulty === "medium"
        ? "Use the code and report evidence. Which answer is supported?"
        : "Choose the safest next step supported by this code and report."
    : difficulty === "easy"
      ? `Look at the plant. How many warning signs do you see? Enter a number.`
      : difficulty === "medium"
        ? `What should we check first: roots, tests, or safety? Type one word.`
        : `What is one safe next step for this plant? Keep it short.`;
  return challengeQuestionSchema.parse({
    id: `question-${finding.id}-${difficulty}`,
    findingId: finding.id,
    nodeId: finding.nodeId,
    tool: toolForFinding[finding.type as keyof typeof toolForFinding],
    difficulty,
    questionType: questionTypeFor(difficulty),
    gradeBand: gradeBandFor(difficulty),
    objective: objectiveFor(finding.type),
    prompt,
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
    scaffolds: scaffoldsFor(finding, difficulty),
    answer,
    explanation: isCurated
      ? content.explanation
      : explanationFor(finding, difficulty),
    codeExcerpt: content.codeExcerpt,
    language: content.language,
    choices: content.choices,
    answers: content.answers,
  });
}

export function misconceptionFeedback(
  question: ChallengeQuestion,
  answer: string,
) {
  const actual = normalizeAnswer(answer);
  if (!actual) return "Type an answer so we can look at the idea together.";
  if (question.difficulty === "easy")
    return "Try counting only the warning signs shown for this plant.";
  if (question.difficulty === "medium") {
    const expected = normalizeAnswer(question.answer);
    return `That choice does not match this warning. For this plant, check ${expected} first.`;
  }
  return "That next step is not quite safe yet. Start by checking the evidence, then choose the smallest change.";
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
  const accepted = [question.answer, ...question.answers].map(normalizeAnswer);
  if (accepted.includes(actual)) return true;
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
