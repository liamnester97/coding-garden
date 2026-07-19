import { z } from "zod";

export const teachingQuestionContentSchema = z.object({
  findingId: z.string().min(1),
  codeExcerpt: z.string().min(1).max(1200),
  language: z.literal("javascript"),
  choices: z.array(z.string().min(1).max(180)).min(2).max(4),
  answers: z.array(z.string().min(1)).min(1),
  explanation: z.string().min(1),
});

export type TeachingQuestionContent = z.infer<
  typeof teachingQuestionContentSchema
>;

/**
 * Short excerpts are copied from the committed teaching fixture. They are
 * deliberately small, safe to display, and tied to the analyzer finding that
 * the learner is inspecting.
 */
export const teachingQuestionContent: Record<string, TeachingQuestionContent> =
  {
    "first-sprouts-coverage": {
      findingId: "first-sprouts-coverage",
      codeExcerpt: `export function greetGarden(name) {\n  return \`Hello, \${name}!\`;\n}\n\nexport function unusedSprout() {\n  return "waiting for sunlight";\n}`,
      language: "javascript",
      choices: [
        "The file has no test that checks its behavior.",
        "The function has too many imports.",
        "The plant is healthy because it returns text.",
      ],
      answers: ["The file has no test that checks its behavior."],
      explanation:
        "The report uses a test-file check and found no matching test for this module. A small test would give this code more sunlight.",
    },
    "first-sprouts-dead": {
      findingId: "first-sprouts-dead",
      codeExcerpt: `export function unusedSprout() {\n  return "waiting for sunlight";\n}`,
      language: "javascript",
      choices: [
        "Nothing imports this file in the lesson graph.",
        "The function name is too short.",
        "The return value is a string.",
      ],
      answers: ["Nothing imports this file in the lesson graph."],
      explanation:
        "The import graph found no incoming root to this file. Check the roots before removing code that may be unused.",
    },
    "root-riddles-coverage": {
      findingId: "root-riddles-coverage",
      codeExcerpt: `export function add(first, second) {\n  return first + second;\n}`,
      language: "javascript",
      choices: [
        "There is no matching test for this module.",
        "The function adds two numbers.",
        "The file is imported by the lesson entrypoint.",
      ],
      answers: ["There is no matching test for this module."],
      explanation:
        "The function is used, but the report could not find a matching test file. A focused test would protect the addition.",
    },
    "root-riddles-dead": {
      findingId: "root-riddles-dead",
      codeExcerpt: `export function unusedHelper(value) {\n  return value * 2;\n}`,
      language: "javascript",
      choices: [
        "No other lesson file imports this helper.",
        "Multiplication is never safe.",
        "The helper has a parameter.",
      ],
      answers: ["No other lesson file imports this helper."],
      explanation:
        "The helper has a test-shaped neighbor, but the import roots do not lead to it. That is evidence to inspect before pruning.",
    },
    "safe-harvest-dead": {
      findingId: "safe-harvest-dead",
      codeExcerpt: `export function unusedHelper(value) {\n  return value.trim();\n}`,
      language: "javascript",
      choices: [
        "Check incoming imports, then choose the smallest safe change.",
        "Delete every helper in the repository immediately.",
        "Add more decorations to the garden.",
      ],
      answers: [
        "Check incoming imports, then choose the smallest safe change.",
      ],
      explanation:
        "A safe next step uses evidence first: inspect incoming imports before deciding whether this helper can be removed.",
    },
  };

for (const content of Object.values(teachingQuestionContent)) {
  teachingQuestionContentSchema.parse(content);
}
