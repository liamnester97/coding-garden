import { describe, expect, it } from "vitest";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { plantVoice, sampleSeasons } from "@/lib/garden/seasons";

describe("season and plant voice stretch slices", () => {
  it("provides deterministic sample snapshots", () => {
    const seasons = sampleSeasons(sampleHealthReport);
    expect(seasons.map((season) => season.id)).toEqual([
      "early-spring",
      "mid-summer",
      "late-summer",
    ]);
    expect(seasons[0].report.reportHash).not.toBe(seasons[1].report.reportHash);
    expect(seasons[1].report.findings.length).toBeLessThan(
      seasons[0].report.findings.length,
    );
  });

  it("keeps plant voices grounded in findings", () => {
    expect(plantVoice(sampleHealthReport, "src/unused.ts")).toContain("unused");
    expect(plantVoice(sampleHealthReport, "src/health.ts")).toContain(
      "growing steadily",
    );
  });
});
