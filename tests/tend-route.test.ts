import { describe, expect, it } from "vitest";
import { POST, resetTendRegistry } from "@/app/api/tend/route";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { beforeEach, afterEach, vi } from "vitest";
import type { ToolCommand } from "@/lib/garden/command";
import { POST as challengePost } from "@/app/api/challenge/route";

function request(body: unknown) {
  return new Request("http://localhost/api/tend", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

async function proofFor(findingId: string) {
  const start = await challengePost(
    request({
      report: sampleHealthReport,
      findingId,
      difficulty: "easy",
    }),
  );
  const started = (await start.json()) as {
    attemptId: string;
    question: { difficulty: string };
  };
  const answer = await challengePost(
    request({
      report: sampleHealthReport,
      findingId,
      difficulty: started.question.difficulty,
      attemptId: started.attemptId,
      answer: "1",
    }),
  );
  return ((await answer.json()) as { proof: string }).proof;
}

type DemoCommand = {
  id: string;
  tool: "clippers";
  findingId: string;
  nodeId: string;
  state:
    "seen" | "understood" | "confirmed" | "acting" | "verifying" | "landed";
  mode: "demo-rehearsal";
  prUrl: null;
  message?: string;
};

describe("POST /api/tend", () => {
  beforeEach(() => resetTendRegistry());
  afterEach(() => vi.useRealTimers());

  it("advances a valid demo command and heals only at landed", async () => {
    let command = {
      id: "demo-clip",
      tool: "clippers" as const,
      findingId: "dead-src-unused",
      nodeId: "src/unused.ts",
    };
    let report = sampleHealthReport;
    const proof = await proofFor("dead-src-unused");
    for (const expected of [
      "understood",
      "confirmed",
      "acting",
      "verifying",
      "landed",
    ]) {
      const response = await POST(
        request({
          report,
          command,
          ...(expected === "understood" ? { proof } : {}),
        }),
      );
      expect(response.status).toBe(200);
      const payload = (await response.json()) as {
        command: DemoCommand;
        report: typeof report;
      };
      command = payload.command;
      report = payload.report;
      expect((command as DemoCommand).state).toBe(expected);
      if (expected !== "landed") expect(report.findings).toHaveLength(2);
    }
    expect(
      report.findings.some((finding) => finding.id === "dead-src-unused"),
    ).toBe(false);
  });

  it("rejects a command for a finding absent from the report", async () => {
    const response = await POST(
      request({
        report: sampleHealthReport,
        command: {
          id: "bad",
          tool: "clippers",
          findingId: "missing",
          nodeId: "src/missing.ts",
        },
      }),
    );
    expect(response.status).toBe(409);
  });

  it("requires a learning proof before starting a command", async () => {
    const response = await POST(
      request({
        report: sampleHealthReport,
        command: {
          id: "no-proof",
          tool: "clippers",
          findingId: "dead-src-unused",
          nodeId: "src/unused.ts",
        },
      }),
    );
    expect(response.status).toBe(409);
    expect((await response.json()).error).toContain("learning challenge");
  });

  it("expires commands and refuses a replayed learning proof", async () => {
    vi.useFakeTimers();
    const proof = await proofFor("dead-src-unused");
    const seed = {
      id: "expiring-clip",
      tool: "clippers" as const,
      findingId: "dead-src-unused",
      nodeId: "src/unused.ts",
    };
    const started = await POST(
      request({ report: sampleHealthReport, command: seed, proof }),
    );
    expect(started.status).toBe(200);
    const command = (await started.json()).command as ToolCommand;
    const replay = await POST(
      request({ report: sampleHealthReport, command: seed, proof }),
    );
    expect(replay.status).toBe(409);
    expect((await replay.json()).error).toContain("learning challenge");
    vi.advanceTimersByTime(10 * 60 * 1000 + 1);
    const expired = await POST(
      request({ report: sampleHealthReport, command }),
    );
    expect(expired.status).toBe(409);
    expect((await expired.json()).error).toContain("expired");
  });

  it("keeps health unchanged when a rehearsal fails", async () => {
    const proof = await proofFor("coverage-src-garden");
    const started = await POST(
      request({
        report: sampleHealthReport,
        command: {
          id: "failed-water",
          tool: "watering-can",
          findingId: "coverage-src-garden",
          nodeId: "src/garden.ts",
        },
        proof,
      }),
    );
    const command = (await started.json()).command as ToolCommand;
    const failed = await POST(
      request({ report: sampleHealthReport, command, action: "fail" }),
    );
    expect(failed.status).toBe(200);
    const payload = (await failed.json()) as {
      command: ToolCommand;
      report: typeof sampleHealthReport;
    };
    expect(payload.command.state).toBe("failed");
    expect(payload.report.findings).toHaveLength(
      sampleHealthReport.findings.length,
    );
  });

  it("rejects forged state transitions", async () => {
    const response = await POST(
      request({
        report: sampleHealthReport,
        command: {
          id: "forged",
          tool: "clippers",
          findingId: "dead-src-unused",
          nodeId: "src/unused.ts",
          state: "verifying",
          mode: "demo-rehearsal",
          prUrl: null,
        },
      }),
    );

    expect(response.status).toBe(409);
    expect((await response.json()).error).toContain("expired");
  });

  it("rejects tending a public report", async () => {
    const publicReport = {
      ...sampleHealthReport,
      repo: { ...sampleHealthReport.repo, commit: "public-commit" },
    };
    const response = await POST(
      request({
        report: publicReport,
        command: {
          id: "public-clip",
          tool: "clippers",
          findingId: "dead-src-unused",
          nodeId: "src/unused.ts",
        },
      }),
    );

    expect(response.status).toBe(403);
  });
});
