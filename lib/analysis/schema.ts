import { z } from "zod";

export const findingSchema = z.object({
  id: z.string(),
  type: z.enum(["dead-code", "coverage-gap", "vulnerability", "complexity"]),
  nodeId: z.string(),
  summary: z.string(),
  evidence: z.object({
    tool: z.string(),
    file: z.string(),
    metric: z.number().optional(),
  }),
});

export const analysisScopeSchema = z.object({
  kind: z.enum(["complete", "bounded"]),
  supportedFiles: z.number().int().nonnegative(),
  analyzedFiles: z.number().int().nonnegative(),
  omittedFiles: z.number().int().nonnegative(),
});

export const healthReportSchema = z.object({
  reportHash: z.string(),
  repo: z.object({ name: z.string(), ref: z.string(), commit: z.string() }),
  scope: analysisScopeSchema,
  method: z.object({
    deadCode: z.enum(["measured", "estimated"]),
    coverage: z.enum(["measured", "estimated"]),
    complexity: z.enum(["measured", "estimated"]),
    vulnerabilities: z.enum(["measured", "estimated", "unavailable"]),
  }),
  nodes: z.array(
    z.object({
      id: z.string(),
      path: z.string(),
      health: z.enum(["healthy", "stressed", "withered"]),
    }),
  ),
  edges: z.array(z.object({ from: z.string(), to: z.string() })),
  findings: z.array(findingSchema),
});

export type AnalysisScope = z.infer<typeof analysisScopeSchema>;
export type HealthReport = z.infer<typeof healthReportSchema>;
