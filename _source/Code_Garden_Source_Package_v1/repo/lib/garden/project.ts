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
  ariaLabel: string;
  color: string;
};

export type GardenScene = {
  repoName: string;
  reportHash: string;
  plants: GardenPlant[];
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
  return {
    repoName: report.repo.name,
    reportHash: report.reportHash,
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
        ...positionFor(node.id),
        findingCount: findings.length,
        findingLabels,
        ariaLabel: `${node.path}: ${metaphor.label}${issueText}`,
        color: metaphor.color,
      };
    }),
  };
}
