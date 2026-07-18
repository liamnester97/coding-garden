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

export const healthReportSchema = z.object({
  reportHash: z.string(),
  repo: z.object({ name: z.string(), ref: z.string(), commit: z.string() }),
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
  findings: z.array(findingSchema),
});

export type HealthReport = z.infer<typeof healthReportSchema>;
