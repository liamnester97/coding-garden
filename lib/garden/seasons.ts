import type { HealthReport } from "@/lib/analysis/schema";
import type { ChallengeDifficulty } from "./challenges";
import { reanalyzeDemoReport } from "./reanalysis";

export type GardenSeason = {
  id: string;
  level: number;
  recommendedDifficulty: ChallengeDifficulty;
  label: string;
  description: string;
  gradeBand: string;
  learningFocus: string;
  report: HealthReport;
};

export function sampleSeasons(report: HealthReport): GardenSeason[] {
  const dead = report.findings.find((finding) => finding.type === "dead-code");
  const coverage = report.findings.find(
    (finding) => finding.type === "coverage-gap",
  );
  const tendedDead = dead ? reanalyzeDemoReport(report, dead.id) : report;
  const tended = coverage
    ? reanalyzeDemoReport(tendedDead, coverage.id)
    : tendedDead;
  return [
    {
      id: "early-spring",
      level: 1,
      recommendedDifficulty: "easy",
      label: "Early spring",
      description: "The garden wakes with its original warning signals.",
      gradeBand: "Grades 1–5",
      learningFocus: "Notice and count",
      report,
    },
    {
      id: "mid-summer",
      level: 2,
      recommendedDifficulty: "medium",
      label: "Mid-summer",
      description: "One real tending action has cleared a withered branch.",
      gradeBand: "Grades 6–8",
      learningFocus: "Connect clues",
      report: tendedDead,
    },
    {
      id: "late-summer",
      level: 3,
      recommendedDifficulty: "hard",
      label: "Late summer",
      description: "A second tending action has restored the drought patch.",
      gradeBand: "Grades 9–12",
      learningFocus: "Explain a safe step",
      report: tended,
    },
  ];
}

export function plantVoice(report: HealthReport, nodeId: string): string {
  const node = report.nodes.find((candidate) => candidate.id === nodeId);
  if (!node) return "This plant is quiet.";
  const findings = report.findings.filter(
    (finding) => finding.nodeId === nodeId,
  );
  if (!findings.length)
    return `${node.path} says: I am growing steadily; keep my tests nearby.`;
  if (findings.some((finding) => finding.type === "dead-code"))
    return `${node.path} says: I may be unused; check my roots before you clip me.`;
  if (findings.some((finding) => finding.type === "coverage-gap"))
    return `${node.path} says: I need sunlight from a test that protects this path.`;
  return `${node.path} says: I have a warning signal that needs a closer look.`;
}
