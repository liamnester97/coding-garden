import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST, resetChallengeRegistry } from "@/app/api/challenge/route";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { answerIsCorrect, questionForFinding } from "@/lib/garden/challenges";

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
    expect(question?.answer).toBe("import-graph");
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
    expect(question?.prompt).toContain("How many warnings");
    expect(question?.prompt).toContain("Type a number");
    expect(question?.objective).not.toContain("module");
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
        answer: "import-graph",
      }),
    );
    expect(right.status).toBe(200);
    expect((await right.json()).proof).toMatch(/^proof-/);
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
