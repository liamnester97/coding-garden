import { readFile } from "node:fs/promises";

const required = [
  "lib/analysis/schema.ts",
  "lib/analysis/sample-report.ts",
  "fixtures/sample-report.json",
];
for (const file of required) await readFile(file, "utf8");
const report = JSON.parse(
  await readFile("fixtures/sample-report.json", "utf8"),
);
if (
  !report.reportHash ||
  !Array.isArray(report.nodes) ||
  !Array.isArray(report.findings) ||
  !report.scope ||
  !["complete", "bounded"].includes(report.scope.kind) ||
  !Number.isInteger(report.scope.supportedFiles) ||
  !Number.isInteger(report.scope.analyzedFiles) ||
  !Number.isInteger(report.scope.omittedFiles)
)
  throw new Error("offline analysis fixture is missing required report fields");
console.log(`analysis fixture structure valid (${required.length} files)`);
