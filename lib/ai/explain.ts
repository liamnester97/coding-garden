import type { HealthReport } from "@/lib/analysis/schema";
import { findingMetaphor, healthMetaphor } from "@/lib/garden/metaphor";

export type GardenExplanation = {
  nodeId: string;
  title: string;
  summary: string;
  health: string;
  needs: string;
  evidence: string[];
  mode: "sample" | "fallback";
};

function findNode(report: HealthReport, nodeId: string) {
  return report.nodes.find((node) => node.id === nodeId);
}

export function explainNode(
  report: HealthReport,
  nodeId: string,
): GardenExplanation | null {
  const node = findNode(report, nodeId);
  if (!node) return null;

  const findings = report.findings.filter(
    (finding) => finding.nodeId === nodeId,
  );
  const metaphor = healthMetaphor[node.health];
  const evidence = findings.map(
    (finding) =>
      `${findingMetaphor[finding.type]}: ${finding.summary} (${finding.evidence.tool} · ${finding.evidence.file})`,
  );

  return {
    nodeId,
    title: node.path,
    summary: findings.length
      ? `${node.path} is ${metaphor.label.toLowerCase()} because the report recorded ${findings.length} warning signal${findings.length === 1 ? "" : "s"}.`
      : `${node.path} is currently healthy; the report recorded no warning signals for this module.`,
    health: metaphor.description,
    needs: findings.length
      ? "Use the evidence below to understand the issue before choosing a tending tool."
      : "Keep this module protected with tests as the codebase changes.",
    evidence,
    mode: "sample",
  };
}
