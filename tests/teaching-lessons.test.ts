import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  teachingLessonForGradeBand,
  teachingLessonReports,
  teachingLessonSchema,
  teachingLessons,
  demoTeachingReport,
} from "@/content/teaching-lessons";
import { projectHealthReport } from "@/lib/garden/project";
import { analyzeJavaScriptRepository } from "@/lib/analysis/analyze-javascript";
import { teachingQuestionContent } from "@/content/teaching-questions";
import { activeQuestionIdsForDifficulty } from "@/content/teaching-questions";

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

    expect(report.nodes.length).toBeGreaterThanOrEqual(9);
    expect(report.findings.length).toBeGreaterThanOrEqual(6);
    expect(
      report.findings.filter((finding) => finding.type === "coverage-gap")
        .length,
    ).toBeGreaterThanOrEqual(3);
    expect(
      report.findings.filter((finding) => finding.type === "dead-code").length,
    ).toBeGreaterThanOrEqual(3);
  });

  it("provides the twenty authored Python questions and matching findings", () => {
    expect(Object.keys(teachingQuestionContent)).toHaveLength(20);
    expect(demoTeachingReport.findings).toHaveLength(20);
    expect(demoTeachingReport.nodes).toHaveLength(5);
    for (const content of Object.values(teachingQuestionContent)) {
      expect(content.codeExcerpt.length).toBeLessThanOrEqual(1200);
      expect(content.choices).toHaveLength(4);
      expect(content.language).toBe("python");
      expect(content.answers).toEqual([content.answer]);
      expect(content.explanation).toBeTruthy();
      expect(content.proposedFix).toBeTruthy();
      expect(content.reanalysisEvidence).toBeTruthy();
    }
  });

  it("keeps five active easy questions open in any order", () => {
    const ids = Object.values(teachingQuestionContent)
      .filter((question) => question.difficulty === "easy")
      .slice(0, 5)
      .map((question) => question.findingId);
    expect(ids).toHaveLength(5);
    for (const id of ids) {
      const question = teachingQuestionContent[id];
      expect(question.choices).toHaveLength(4);
      expect(question.example).toBeTruthy();
      expect(question.beforeCode).not.toBe(question.afterCode);
    }
  });

  it("selects one question per target for each authored level", () => {
    const easy = activeQuestionIdsForDifficulty("easy", () => 0.9);
    expect(easy).toHaveLength(5);
    expect(new Set(easy).size).toBe(5);
    expect(activeQuestionIdsForDifficulty("medium")).toHaveLength(5);
    expect(activeQuestionIdsForDifficulty("hard")).toHaveLength(5);
  });
});
