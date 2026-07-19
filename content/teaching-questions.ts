import { z } from "zod";

export const teachingQuestionContentSchema = z.object({
  findingId: z.string().min(1),
  codeExcerpt: z.string().min(1).max(1200),
  language: z.literal("javascript"),
  choices: z.array(z.string().min(1).max(180)).min(2).max(4),
  answers: z.array(z.string().min(1)).min(1),
  explanation: z.string().min(1),
  actionLabel: z.string().min(1),
  example: z.string().min(1),
  beforeCode: z.string().min(1),
  afterCode: z.string().min(1),
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
    "demo-syntax": {
      findingId: "demo-syntax",
      language: "javascript",
      codeExcerpt: `export function greet(name) {\n  return "Hello, " + name;\n`,
      choices: [
        "A closing brace is missing.",
        "The name is too long.",
        "The return should be a number.",
        "The function needs a picture.",
      ],
      answers: ["A closing brace is missing."],
      explanation:
        "The function opens with { but never closes with }. Matching braces help JavaScript know where the function ends.",
      actionLabel: "Trim the syntax weeds",
      example: `function greet(name) {\n  return "Hello, " + name;\n}`,
      beforeCode: `export function greet(name) {\n  return "Hello, " + name;`,
      afterCode: `export function greet(name) {\n  return "Hello, " + name;\n}`,
    },
    "demo-dead-code": {
      findingId: "demo-dead-code",
      language: "javascript",
      codeExcerpt: `export function unusedHelper(value) {\n  return value * 2;\n}`,
      choices: [
        "Nothing imports this helper.",
        "Multiplication is always wrong.",
        "The parameter is too small.",
        "Every helper must be deleted.",
      ],
      answers: ["Nothing imports this helper."],
      explanation:
        "The report found no incoming root to this helper. Check the roots before removing code.",
      actionLabel: "Clip the unused branch",
      example: `import { useful } from "./useful.js";`,
      beforeCode: `export function unusedHelper(value) {\n  return value * 2;\n}`,
      afterCode: `// Remove only after checking incoming imports.`,
    },
    "demo-coverage": {
      findingId: "demo-coverage",
      language: "javascript",
      codeExcerpt: `export function score(points, bonus) {\n  return points + bonus;\n}`,
      choices: [
        "Add a test for this path.",
        "Rename every variable.",
        "Delete the score function.",
        "Add more colors.",
      ],
      answers: ["Add a test for this path."],
      explanation:
        "A test is like sunlight: it checks that this path keeps working when code changes.",
      actionLabel: "Water the missing test",
      example: `expect(score(2, 3)).toBe(5);`,
      beforeCode: `export function score(points, bonus) {\n  return points + bonus;\n}`,
      afterCode: `test("scores points and bonus", () => {\n  expect(score(2, 3)).toBe(5);\n});`,
    },
    "demo-logic": {
      findingId: "demo-logic",
      language: "javascript",
      codeExcerpt: `export function formatName(first, last) {\n  return first + "," + last;\n}`,
      choices: [
        "Use a space between the names.",
        "Turn both names into numbers.",
        "Remove the return value.",
        "Import a new package.",
      ],
      answers: ["Use a space between the names."],
      explanation:
        "The code joins the names with a comma. A friendly full name usually needs a space instead.",
      actionLabel: "Water the logic bed",
      example: `formatName("Ada", "Lovelace") // "Ada Lovelace"`,
      beforeCode: `return first + "," + last;`,
      afterCode: `return first + " " + last;`,
    },
    "demo-function": {
      findingId: "demo-function",
      language: "javascript",
      codeExcerpt: `export function startLesson(name) {\n  return welcome(name);\n}`,
      choices: [
        "Define welcome before calling it.",
        "Call the function twice.",
        "Remove the learner's name.",
        "Make the function much longer.",
      ],
      answers: ["Define welcome before calling it."],
      explanation:
        "The lesson calls welcome, but no definition is present. A small function definition gives the call a meaning.",
      actionLabel: "Plant the missing function",
      example: `function welcome(name) { return \`Hi, ${"${name}"}!\`; }`,
      beforeCode: `return welcome(name);`,
      afterCode: `function welcome(name) {\n  return \`Hi, ${"${name}"}!\`;\n}`,
    },
    "first-sprouts-coverage": {
      findingId: "first-sprouts-coverage",
      codeExcerpt: `export function greetGarden(name) {\n  return \`Hello, \${name}!\`;\n}\n\nexport function unusedSprout() {\n  return "waiting for sunlight";\n}`,
      language: "javascript",
      choices: [
        "The file has no test that checks its behavior.",
        "The function has too many imports.",
        "The plant is healthy because it returns text.",
        "The file is written in a different language.",
      ],
      answers: ["The file has no test that checks its behavior."],
      explanation:
        "The report uses a test-file check and found no matching test for this module. A small test would give this code more sunlight.",
      actionLabel: "Water this plant",
      example: "expect(greetGarden('Sam')).toContain('Sam');",
      beforeCode: "No test file was found.",
      afterCode: "Add a small test for greetGarden.",
    },
    "first-sprouts-dead": {
      findingId: "first-sprouts-dead",
      codeExcerpt: `export function unusedSprout() {\n  return "waiting for sunlight";\n}`,
      language: "javascript",
      choices: [
        "Nothing imports this file in the lesson graph.",
        "The function name is too short.",
        "The return value is a string.",
        "The file has no name.",
      ],
      answers: ["Nothing imports this file in the lesson graph."],
      explanation:
        "The import graph found no incoming root to this file. Check the roots before removing code that may be unused.",
      actionLabel: "Clip this branch",
      example: "import { unusedSprout } from './unused.js';",
      beforeCode: "No incoming import was found.",
      afterCode: "Remove only after checking the roots.",
    },
    "root-riddles-coverage": {
      findingId: "root-riddles-coverage",
      codeExcerpt: `export function add(first, second) {\n  return first + second;\n}`,
      language: "javascript",
      choices: [
        "There is no matching test for this module.",
        "The function adds two numbers.",
        "The file is imported by the lesson entrypoint.",
        "The function has no purpose.",
      ],
      answers: ["There is no matching test for this module."],
      explanation:
        "The function is used, but the report could not find a matching test file. A focused test would protect the addition.",
      actionLabel: "Water this plant",
      example: "expect(add(2, 3)).toBe(5);",
      beforeCode: "No matching test was found.",
      afterCode: "Add a focused test.",
    },
    "root-riddles-dead": {
      findingId: "root-riddles-dead",
      codeExcerpt: `export function unusedHelper(value) {\n  return value * 2;\n}`,
      language: "javascript",
      choices: [
        "No other lesson file imports this helper.",
        "Multiplication is never safe.",
        "The helper has a parameter.",
        "The helper is automatically safe.",
      ],
      answers: ["No other lesson file imports this helper."],
      explanation:
        "The helper has a test-shaped neighbor, but the import roots do not lead to it. That is evidence to inspect before pruning.",
      actionLabel: "Clip this branch",
      example: "Check imports before removing a helper.",
      beforeCode: "No incoming import was found.",
      afterCode: "Review roots, then make the smallest change.",
    },
    "safe-harvest-dead": {
      findingId: "safe-harvest-dead",
      codeExcerpt: `export function unusedHelper(value) {\n  return value.trim();\n}`,
      language: "javascript",
      choices: [
        "Check incoming imports, then choose the smallest safe change.",
        "Delete every helper in the repository immediately.",
        "Add more decorations to the garden.",
        "Skip the evidence and guess.",
      ],
      answers: [
        "Check incoming imports, then choose the smallest safe change.",
      ],
      explanation:
        "A safe next step uses evidence first: inspect incoming imports before deciding whether this helper can be removed.",
      actionLabel: "Choose a safe next step",
      example: "Search for an import before deleting code.",
      beforeCode: "The helper may be unused.",
      afterCode: "Inspect evidence before editing.",
    },
  };

for (const content of Object.values(teachingQuestionContent)) {
  teachingQuestionContentSchema.parse(content);
}
