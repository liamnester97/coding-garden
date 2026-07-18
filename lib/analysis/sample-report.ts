import { healthReportSchema, type HealthReport } from "./schema";

export const sampleHealthReport: HealthReport = healthReportSchema.parse({
  reportHash: "sample-v1",
  repo: { name: "sample-garden", ref: "main", commit: "offline-sample" },
  method: {
    deadCode: "estimated",
    coverage: "estimated",
    complexity: "estimated",
    vulnerabilities: "unavailable",
  },
  nodes: [
    { id: "src/garden.ts", path: "src/garden.ts", health: "stressed" },
    { id: "src/unused.ts", path: "src/unused.ts", health: "withered" },
    { id: "src/health.ts", path: "src/health.ts", health: "healthy" },
  ],
  findings: [
    {
      id: "dead-src-unused",
      type: "dead-code",
      nodeId: "src/unused.ts",
      summary: "This module has no incoming imports.",
      evidence: { tool: "import-graph", file: "src/unused.ts" },
    },
    {
      id: "coverage-src-garden",
      type: "coverage-gap",
      nodeId: "src/garden.ts",
      summary: "No matching test file was found.",
      evidence: { tool: "test-file-mapping", file: "src/garden.ts" },
    },
  ],
});
