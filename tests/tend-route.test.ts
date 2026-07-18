import { describe, expect, it } from "vitest";
import { POST, resetTendRegistry } from "@/app/api/tend/route";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { beforeEach } from "vitest";

function request(body: unknown) {
  return new Request("http://localhost/api/tend", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
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

  it("advances a valid demo command and heals only at landed", async () => {
    let command = {
      id: "demo-clip",
      tool: "clippers" as const,
      findingId: "dead-src-unused",
      nodeId: "src/unused.ts",
    };
    let report = sampleHealthReport;
    for (const expected of [
      "understood",
      "confirmed",
      "acting",
      "verifying",
      "landed",
    ]) {
      const response = await POST(request({ report, command }));
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
