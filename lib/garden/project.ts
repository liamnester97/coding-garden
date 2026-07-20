import type { HealthReport } from "@/lib/analysis/schema";
import { findingMetaphor, healthMetaphor, type HealthState } from "./metaphor";
import { spriteForHealth, type PixelSpriteId } from "./assets";

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
  sprite: PixelSpriteId;
  targetCategory: "flower" | "hedge" | "tree";
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

function positionFor(nodeId: string, occupied: Set<string>) {
  const teachingPositions: Record<string, { x: number; y: number }> = {
    "lesson_garden.py::flowers": { x: 58, y: 78 },
    "lesson_garden.py::hedges": { x: 42, y: 30 },
    "lesson_garden.py::trees": { x: 62, y: 30 },
    "lesson_garden.py::beds": { x: 30, y: 60 },
    "lesson_garden.py::paths": { x: 70, y: 60 },
  };
  const authored = teachingPositions[nodeId];
  if (authored) {
    occupied.add(`${authored.x},${authored.y}`);
    return authored;
  }
  const hash = stableHash(nodeId);
  const start = hash % (80 * 66);
  for (let offset = 0; offset < 80 * 66; offset += 1) {
    const slot = (start + offset) % (80 * 66);
    const point = {
      x: 10 + (slot % 80),
      y: 18 + Math.floor(slot / 80),
    };
    const key = `${point.x},${point.y}`;
    if (!occupied.has(key)) {
      occupied.add(key);
      return point;
    }
  }
  throw new Error("Garden map has no available plant positions");
}

export function projectHealthReport(report: HealthReport): GardenScene {
  const occupied = new Set<string>();
  const positions = new Map(
    report.nodes.map((node) => [node.id, positionFor(node.id, occupied)]),
  );
  return {
    repoName: report.repo.name,
    reportHash: report.reportHash,
    roots: report.edges
      .filter((edge, index, edges) => {
        const key = `${edge.from}\0${edge.to}`;
        return (
          edges.findIndex(
            (candidate) => `${candidate.from}\0${candidate.to}` === key,
          ) === index
        );
      })
      .flatMap((edge) => {
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
    plants: report.nodes.map((node, index) => {
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
        sprite: spriteForHealth(node.health),
        targetCategory:
          index % 3 === 0 ? "flower" : index % 3 === 1 ? "hedge" : "tree",
      };
    }),
  };
}
