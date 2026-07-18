import type { HealthReport } from "@/lib/analysis/schema";
import { findingMetaphor, healthMetaphor } from "./metaphor";

export type GardenExplanation = {
  nodeId: string;
  title: string;
  summary: string;
  health: string;
  needs: string;
  evidence: string[];
  mode: "sample" | "report" | "fallback";
};

function readableTool(tool: string) {
  const labels: Record<string, string> = {
    "import-graph": "import map",
    "test-file-mapping": "test-file check",
    "syntax-count": "branching check",
    "npm-audit": "dependency security check",
  };
  return labels[tool] ?? tool;
}

export function explainNode(
  report: HealthReport,
  nodeId: string,
  mode: GardenExplanation["mode"] = "sample",
): GardenExplanation | null {
  const node = report.nodes.find((candidate) => candidate.id === nodeId);
  if (!node) return null;

  const findings = report.findings.filter(
    (finding) => finding.nodeId === nodeId,
  );
  const metaphor = healthMetaphor[node.health];
  const evidence = findings.map(
    (finding) =>
      `${findingMetaphor[finding.type]}: ${finding.summary} Source: ${finding.evidence.file}. Check: ${readableTool(finding.evidence.tool)}.`,
  );

  return {
    nodeId,
    title: node.path,
    summary: findings.length
      ? `${node.path} looks ${metaphor.label.toLowerCase()} because the analysis found ${findings.length} issue${findings.length === 1 ? "" : "s"} to inspect.`
      : `${node.path} looks healthy; the analysis found no issues to flag right now.`,
    health: metaphor.description,
    needs: findings.length
      ? "Start with the evidence below to understand what is happening before choosing a tending tool."
      : "Keep protecting this part of the code with tests as the codebase changes.",
    evidence,
    mode,
  };
}
