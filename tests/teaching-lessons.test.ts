import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  teachingLessonForGradeBand,
  teachingLessonReports,
  teachingLessonSchema,
  teachingLessons,
} from "@/content/teaching-lessons";
import { projectHealthReport } from "@/lib/garden/project";
import { analyzeJavaScriptRepository } from "@/lib/analysis/analyze-javascript";

describe("teaching lesson registry", () => {
  it("covers the three learner grade bands with validated objectives", () => {
    expect(teachingLessons).toHaveLength(3);
    for (const lesson of teachingLessons) {
      expect(teachingLessonSchema.parse(lesson)).toEqual(lesson);
      expect(lesson.learningObjective.length).toBeGreaterThan(10);
      expect(lesson.repositoryPath).toContain("lessons/");
    }
  });

  it("selects a deterministic lesson for each age band", () => {
    expect(teachingLessonForGradeBand("grades-1-5").id).toBe("first-sprouts");
    expect(teachingLessonForGradeBand("grades-6-8").id).toBe("root-riddles");
    expect(teachingLessonForGradeBand("grades-9-12").id).toBe("safe-harvest");
  });

  it("provides two intentional findings for every interactive lesson", () => {
    for (const lesson of teachingLessons) {
      const report = teachingLessonReports[lesson.id];
      expect(report.findings).toHaveLength(2);
      expect(
        report.findings.every((finding) =>
          report.nodes.some((node) => node.id === finding.nodeId),
        ),
      ).toBe(true);
      expect(
        projectHealthReport(report).plants.some(
          (plant) => plant.findingCount > 0,
        ),
      ).toBe(true);
    }
  });

  it("keeps the teaching fixture signals deterministic", async () => {
    const report = await analyzeJavaScriptRepository(
      path.resolve("fixtures/teaching-repo"),
      {
        id: "teaching-fixture",
        name: "teaching-fixture",
        source: "local",
        location: "fixtures/teaching-repo",
        language: "javascript",
        ref: "working-tree",
      },
    );

    expect(report.nodes).toHaveLength(9);
    expect(report.findings).toHaveLength(6);
    expect(
      report.findings.filter((finding) => finding.type === "coverage-gap"),
    ).toHaveLength(3);
    expect(
      report.findings.filter((finding) => finding.type === "dead-code"),
    ).toHaveLength(3);
  });
});
