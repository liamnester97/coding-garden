import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST, resetChallengeRegistry } from "@/app/api/challenge/route";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import {
  answerIsCorrect,
  misconceptionFeedback,
  questionForFinding,
} from "@/lib/garden/challenges";
import {
  demoTeachingReport,
  teachingLessonReports,
} from "@/content/teaching-lessons";
import { teachingQuestionContent } from "@/content/teaching-questions";

function request(body: unknown) {
  return new Request("http://localhost/api/challenge", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

describe("learning challenge gate", () => {
  beforeEach(() => resetChallengeRegistry());
  afterEach(() => vi.useRealTimers());

  it("creates a deterministic question without exposing its answer", () => {
    const question = questionForFinding(
      sampleHealthReport,
      "dead-src-unused",
      "medium",
    );
    expect(question?.objective).toContain("unused");
    expect(question?.answer).toBe("roots");
    expect(question?.questionType).toBe("evidence");
    expect(question?.gradeBand).toBe("grades-6-8");
    expect(
      JSON.stringify(
        questionForFinding(sampleHealthReport, "dead-src-unused", "medium"),
      ),
    ).toBe(JSON.stringify(question));
  });

  it("uses short, age-flexible prompts for the easy learning step", () => {
    const question = questionForFinding(
      sampleHealthReport,
      "dead-src-unused",
      "easy",
    );
    expect(question?.prompt).toContain("How many warning signs");
    expect(question?.prompt).toContain("Enter a number");
    expect(question?.objective).not.toContain("module");
    expect(question?.questionType).toBe("notice");
    expect(question?.gradeBand).toBe("grades-1-5");
    expect(question?.scaffolds).toHaveLength(3);
  });

  it("returns misconception-aware feedback without granting proof", () => {
    const question = questionForFinding(
      sampleHealthReport,
      "coverage-src-garden",
      "medium",
    );
    expect(misconceptionFeedback(question!, "roots")).toContain("tests");
  });

  it("requires the correct answer before issuing a proof", async () => {
    const start = await POST(
      request({
        report: sampleHealthReport,
        findingId: "dead-src-unused",
        difficulty: "medium",
      }),
    );
    const started = (await start.json()) as {
      attemptId: string;
      question: { difficulty: string };
    };
    const wrong = await POST(
      request({
        report: sampleHealthReport,
        findingId: "dead-src-unused",
        difficulty: started.question.difficulty,
        attemptId: started.attemptId,
        answer: "not-the-tool",
      }),
    );
    expect(wrong.status).toBe(422);
    expect((await wrong.json()).proof).toBeUndefined();
    const right = await POST(
      request({
        report: sampleHealthReport,
        findingId: "dead-src-unused",
        difficulty: started.question.difficulty,
        attemptId: started.attemptId,
        answer: "roots",
      }),
    );
    expect(right.status).toBe(200);
    expect((await right.json()).proof).toMatch(/^proof-/);
  });

  it("explains the answer after an incorrect response", async () => {
    const start = await POST(
      request({
        report: sampleHealthReport,
        findingId: "dead-src-unused",
        difficulty: "easy",
      }),
    );
    const started = (await start.json()) as { attemptId: string };
    const wrong = await POST(
      request({
        report: sampleHealthReport,
        findingId: "dead-src-unused",
        difficulty: "easy",
        attemptId: started.attemptId,
        answer: "2",
      }),
    );
    const payload = (await wrong.json()) as {
      explanation?: string;
      hint?: string;
      feedback?: string;
    };
    expect(wrong.status).toBe(422);
    expect(payload.hint).toBeTruthy();
    expect(payload.explanation).toContain("one warning");
    expect(payload.feedback).toContain("warning");
  });

  it("supports all three levels and does not accept arbitrary reports", async () => {
    for (const difficulty of ["easy", "medium", "hard"] as const) {
      const question = questionForFinding(
        sampleHealthReport,
        "coverage-src-garden",
        difficulty,
      );
      expect(question?.difficulty).toBe(difficulty);
      expect(answerIsCorrect(question!, question!.answer)).toBe(true);
    }
    const response = await POST(
      request({
        report: { ...sampleHealthReport, reportHash: "public" },
        findingId: "dead-src-unused",
        difficulty: "easy",
      }),
    );
    expect(response.status).toBe(403);
  });

  it("supports the curated teaching lessons as sample-only interactive reports", async () => {
    const report = teachingLessonReports["first-sprouts"];
    const finding = report.findings[0];
    const response = await POST(
      request({ report, findingId: finding.id, difficulty: "easy" }),
    );
    expect(response.status).toBe(200);
    expect((await response.json()).question.gradeBand).toBe("grades-1-5");
  });

  it("serves every default demo plant with four choices", async () => {
    for (const finding of demoTeachingReport.findings.slice(0, 5)) {
      const response = await POST(
        request({
          report: demoTeachingReport,
          findingId: finding.id,
          difficulty: teachingQuestionContent[finding.id].difficulty,
        }),
      );
      const payload = (await response.json()) as {
        question: { choices: string[]; findingId: string };
      };
      expect(response.status).toBe(200);
      expect(payload.question.findingId).toBe(finding.id);
      expect(payload.question.choices).toHaveLength(4);
    }
  });

  it("returns the authored Python excerpt and four choices", async () => {
    const report = demoTeachingReport;
    const response = await POST(
      request({
        report,
        findingId: "py-easy-01",
        difficulty: "easy",
      }),
    );
    const payload = (await response.json()) as {
      question: {
        codeExcerpt: string;
        choices: string[];
        answer?: string;
        explanation?: string;
      };
    };
    expect(response.status).toBe(200);
    expect(payload.question.codeExcerpt).toContain("def greet");
    expect(payload.question.choices).toHaveLength(4);
    expect(payload.question.answer).toBeUndefined();
    expect(payload.question.explanation).toBeUndefined();
  });

  it("expires attempts and bounds answer input before grading", async () => {
    vi.useFakeTimers();
    const start = await POST(
      request({
        report: sampleHealthReport,
        findingId: "dead-src-unused",
        difficulty: "easy",
      }),
    );
    const started = (await start.json()) as { attemptId: string };
    const oversized = await POST(
      request({
        report: sampleHealthReport,
        findingId: "dead-src-unused",
        difficulty: "easy",
        attemptId: started.attemptId,
        answer: "x".repeat(501),
      }),
    );
    expect(oversized.status).toBe(400);
    vi.advanceTimersByTime(10 * 60 * 1000 + 1);
    const expired = await POST(
      request({
        report: sampleHealthReport,
        findingId: "dead-src-unused",
        difficulty: "easy",
        attemptId: started.attemptId,
        answer: "1",
      }),
    );
    expect(expired.status).toBe(409);
    expect((await expired.json()).error).toContain("expired");
  });
});
