import { createHash } from "node:crypto";
import type { HealthReport } from "@/lib/analysis/schema";

export function reanalyzeDemoReport(
  report: HealthReport,
  findingId: string,
): HealthReport {
  const findings = report.findings.filter(
    (finding) => finding.id !== findingId,
  );
  const healthByNode = new Map<string, number>();
  for (const finding of findings)
    healthByNode.set(
      finding.nodeId,
      (healthByNode.get(finding.nodeId) ?? 0) + 1,
    );
  const nodes = report.nodes.map((node) => {
    const count = healthByNode.get(node.id) ?? 0;
    return {
      ...node,
      health: count === 0 ? "healthy" : count > 1 ? "withered" : "stressed",
    } as const;
  });
  const reportHash = createHash("sha256")
    .update(JSON.stringify({ ...report, nodes, findings }))
    .digest("hex")
    .slice(0, 16);
  return { ...report, nodes, findings, reportHash };
}
