import { z } from "zod";
import { healthReportSchema, type HealthReport } from "@/lib/analysis/schema";

export const teachingLessonSchema = z.object({
  id: z.string().min(1),
  gradeBand: z.enum(["grades-1-5", "grades-6-8", "grades-9-12"]),
  title: z.string().min(1),
  learningObjective: z.string().min(1),
  repositoryPath: z.string().min(1),
  findingTypes: z.array(z.string().min(1)).min(1),
  questionTypes: z
    .array(z.enum(["notice", "evidence", "safe-next-step"]))
    .min(1),
});

export type TeachingLesson = z.infer<typeof teachingLessonSchema>;

function lessonReport(
  id: string,
  nodes: Array<{
    id: string;
    path: string;
    health: "healthy" | "stressed" | "withered";
  }>,
  findings: HealthReport["findings"],
  edges: HealthReport["edges"],
): HealthReport {
  return healthReportSchema.parse({
    reportHash: `teaching-${id}-v1`,
    repo: { name: `teaching-${id}`, ref: "main", commit: `offline-${id}` },
    scope: {
      kind: "complete",
      supportedFiles: nodes.length,
      analyzedFiles: nodes.length,
      omittedFiles: 0,
    },
    method: {
      deadCode: "measured",
      coverage: "estimated",
      complexity: "estimated",
      vulnerabilities: "unavailable",
    },
    nodes,
    edges,
    findings,
  });
}

/**
 * Curated lesson metadata is deliberately separate from HealthReport truth.
 * The report supplies findings; this registry supplies the teaching intent.
 */
export const teachingLessons = [
  {
    id: "first-sprouts",
    gradeBand: "grades-1-5",
    title: "Find the missing sunlight",
    learningObjective:
      "Notice a warning signal and count what the report found.",
    repositoryPath: "lessons/grades-1-5/first-sprouts",
    findingTypes: ["coverage-gap", "dead-code"],
    questionTypes: ["notice"],
  },
  {
    id: "root-riddles",
    gradeBand: "grades-6-8",
    title: "Follow the roots",
    learningObjective: "Use imports and tests as evidence for a code decision.",
    repositoryPath: "lessons/grades-6-8/root-riddles",
    findingTypes: ["dead-code", "coverage-gap"],
    questionTypes: ["evidence"],
  },
  {
    id: "safe-harvest",
    gradeBand: "grades-9-12",
    title: "Choose the safe next step",
    learningObjective:
      "Explain a small, evidence-based action before changing code.",
    repositoryPath: "lessons/grades-9-12/safe-harvest",
    findingTypes: ["dead-code", "coverage-gap", "vulnerability"],
    questionTypes: ["safe-next-step"],
  },
] satisfies TeachingLesson[];

export const demoTeachingReport = lessonReport(
  "demo-garden",
  [
    { id: "src/greeting.js", path: "src/greeting.js", health: "stressed" },
    {
      id: "src/unused-helper.js",
      path: "src/unused-helper.js",
      health: "withered",
    },
    { id: "src/score.js", path: "src/score.js", health: "stressed" },
    { id: "src/format.js", path: "src/format.js", health: "stressed" },
    { id: "src/lesson.js", path: "src/lesson.js", health: "stressed" },
  ],
  [
    {
      id: "demo-syntax",
      type: "syntax-error",
      nodeId: "src/greeting.js",
      summary: "A closing brace is missing from this function.",
      evidence: { tool: "teaching-fixture", file: "src/greeting.js" },
    },
    {
      id: "demo-dead-code",
      type: "dead-code",
      nodeId: "src/unused-helper.js",
      summary: "No incoming import was found for this helper.",
      evidence: { tool: "teaching-fixture", file: "src/unused-helper.js" },
    },
    {
      id: "demo-coverage",
      type: "coverage-gap",
      nodeId: "src/score.js",
      summary: "This score path has no matching test yet.",
      evidence: { tool: "teaching-fixture", file: "src/score.js" },
    },
    {
      id: "demo-logic",
      type: "logic-bug",
      nodeId: "src/format.js",
      summary: "The formatter uses the wrong separator for a friendly message.",
      evidence: { tool: "teaching-fixture", file: "src/format.js" },
    },
    {
      id: "demo-function",
      type: "missing-function",
      nodeId: "src/lesson.js",
      summary: "The lesson calls a function that has not been defined.",
      evidence: { tool: "teaching-fixture", file: "src/lesson.js" },
    },
  ],
  [
    { from: "src/lesson.js", to: "src/greeting.js" },
    { from: "src/lesson.js", to: "src/score.js" },
    { from: "src/lesson.js", to: "src/format.js" },
  ],
);

export const teachingLessonReports: Record<string, HealthReport> = {
  "first-sprouts": lessonReport(
    "first-sprouts",
    [
      {
        id: "lessons/grades-1-5/first-sprouts/index.js",
        path: "lessons/grades-1-5/first-sprouts/index.js",
        health: "healthy",
      },
      {
        id: "lessons/grades-1-5/first-sprouts/garden.js",
        path: "lessons/grades-1-5/first-sprouts/garden.js",
        health: "stressed",
      },
      {
        id: "lessons/grades-1-5/first-sprouts/unused.js",
        path: "lessons/grades-1-5/first-sprouts/unused.js",
        health: "withered",
      },
    ],
    [
      {
        id: "first-sprouts-coverage",
        type: "coverage-gap",
        nodeId: "lessons/grades-1-5/first-sprouts/garden.js",
        summary: "No matching test file was found; coverage is estimated.",
        evidence: {
          tool: "test-file-mapping",
          file: "lessons/grades-1-5/first-sprouts/garden.js",
        },
      },
      {
        id: "first-sprouts-dead",
        type: "dead-code",
        nodeId: "lessons/grades-1-5/first-sprouts/unused.js",
        summary: "No incoming relative import was found for this file.",
        evidence: {
          tool: "import-graph",
          file: "lessons/grades-1-5/first-sprouts/unused.js",
        },
      },
    ],
    [
      {
        from: "lessons/grades-1-5/first-sprouts/index.js",
        to: "lessons/grades-1-5/first-sprouts/garden.js",
      },
    ],
  ),
  "root-riddles": lessonReport(
    "root-riddles",
    [
      {
        id: "lessons/grades-6-8/root-riddles/index.js",
        path: "lessons/grades-6-8/root-riddles/index.js",
        health: "healthy",
      },
      {
        id: "lessons/grades-6-8/root-riddles/math.js",
        path: "lessons/grades-6-8/root-riddles/math.js",
        health: "stressed",
      },
      {
        id: "lessons/grades-6-8/root-riddles/unused-helper.js",
        path: "lessons/grades-6-8/root-riddles/unused-helper.js",
        health: "withered",
      },
    ],
    [
      {
        id: "root-riddles-coverage",
        type: "coverage-gap",
        nodeId: "lessons/grades-6-8/root-riddles/math.js",
        summary: "No matching test file was found; coverage is estimated.",
        evidence: {
          tool: "test-file-mapping",
          file: "lessons/grades-6-8/root-riddles/math.js",
        },
      },
      {
        id: "root-riddles-dead",
        type: "dead-code",
        nodeId: "lessons/grades-6-8/root-riddles/unused-helper.js",
        summary: "No incoming relative import was found for this file.",
        evidence: {
          tool: "import-graph",
          file: "lessons/grades-6-8/root-riddles/unused-helper.js",
        },
      },
    ],
    [
      {
        from: "lessons/grades-6-8/root-riddles/index.js",
        to: "lessons/grades-6-8/root-riddles/math.js",
      },
    ],
  ),
  "safe-harvest": lessonReport(
    "safe-harvest",
    [
      {
        id: "lessons/grades-9-12/safe-harvest/index.js",
        path: "lessons/grades-9-12/safe-harvest/index.js",
        health: "healthy",
      },
      {
        id: "lessons/grades-9-12/safe-harvest/review.js",
        path: "lessons/grades-9-12/safe-harvest/review.js",
        health: "stressed",
      },
      {
        id: "lessons/grades-9-12/safe-harvest/unused-helper.js",
        path: "lessons/grades-9-12/safe-harvest/unused-helper.js",
        health: "withered",
      },
    ],
    [
      {
        id: "safe-harvest-coverage",
        type: "coverage-gap",
        nodeId: "lessons/grades-9-12/safe-harvest/review.js",
        summary: "No matching test file was found; coverage is estimated.",
        evidence: {
          tool: "test-file-mapping",
          file: "lessons/grades-9-12/safe-harvest/review.js",
        },
      },
      {
        id: "safe-harvest-dead",
        type: "dead-code",
        nodeId: "lessons/grades-9-12/safe-harvest/unused-helper.js",
        summary: "No incoming relative import was found for this file.",
        evidence: {
          tool: "import-graph",
          file: "lessons/grades-9-12/safe-harvest/unused-helper.js",
        },
      },
    ],
    [
      {
        from: "lessons/grades-9-12/safe-harvest/index.js",
        to: "lessons/grades-9-12/safe-harvest/review.js",
      },
    ],
  ),
};

export function teachingLessonForGradeBand(
  gradeBand: TeachingLesson["gradeBand"],
) {
  return (
    teachingLessons.find((lesson) => lesson.gradeBand === gradeBand) ??
    teachingLessons[0]
  );
}
