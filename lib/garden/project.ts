import type { HealthReport } from "@/lib/analysis/schema";
import { findingMetaphor, healthMetaphor, type HealthState } from "./metaphor";

export type GardenPlant = {
  id: string;
  path: string;
  health: HealthState;
  x: number;
  y: number;
  findingCount: number;
  findingLabels: string[];
  findings: Array<{
    label: string;
    summary: string;
    evidence: string;
  }>;
  ariaLabel: string;
  color: string;
};

export type GardenScene = {
  repoName: string;
  reportHash: string;
  plants: GardenPlant[];
  roots: Array<{
    from: string;
    to: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }>;
};

function stableHash(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function positionFor(nodeId: string) {
  const hash = stableHash(nodeId);
  return {
    x: 10 + (hash % 80),
    y: 18 + (Math.floor(hash / 97) % 66),
  };
}

export function projectHealthReport(report: HealthReport): GardenScene {
  const positions = new Map(
    report.nodes.map((node) => [node.id, positionFor(node.id)]),
  );
  return {
    repoName: report.repo.name,
    reportHash: report.reportHash,
    roots: report.edges.flatMap((edge) => {
      const from = positions.get(edge.from);
      const to = positions.get(edge.to);
      return from && to
        ? [
            {
              from: edge.from,
              to: edge.to,
              x1: from.x,
              y1: from.y,
              x2: to.x,
              y2: to.y,
            },
          ]
        : [];
    }),
    plants: report.nodes.map((node) => {
      const findings = report.findings.filter(
        (finding) => finding.nodeId === node.id,
      );
      const metaphor = healthMetaphor[node.health];
      const findingLabels = findings.map(
        (finding) => findingMetaphor[finding.type],
      );
      const issueText = findingLabels.length
        ? `; ${findingLabels.join(", ")}`
        : "; no warning signals";

      return {
        id: node.id,
        path: node.path,
        health: node.health,
        ...positions.get(node.id)!,
        findingCount: findings.length,
        findingLabels,
        findings: findings.map((finding) => ({
          label: findingMetaphor[finding.type],
          summary: finding.summary,
          evidence: `${finding.evidence.tool} · ${finding.evidence.file}`,
        })),
        ariaLabel: `${node.path}: ${metaphor.label}${issueText}`,
        color: metaphor.color,
      };
    }),
  };
}
