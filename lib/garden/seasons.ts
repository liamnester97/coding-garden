import type { HealthReport } from "@/lib/analysis/schema";
import { reanalyzeDemoReport } from "./reanalysis";

export type GardenSeason = {
  id: string;
  label: string;
  description: string;
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
      label: "Early spring",
      description: "The garden wakes with its original warning signals.",
      report,
    },
    {
      id: "mid-summer",
      label: "Mid-summer",
      description: "One real tending action has cleared a withered branch.",
      report: tendedDead,
    },
    {
      id: "late-summer",
      label: "Late summer",
      description: "A second tending action has restored the drought patch.",
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
