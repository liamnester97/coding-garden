import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/tend/route";
import { sampleHealthReport } from "@/lib/analysis/sample-report";

function request(body: unknown) {
  return new Request("http://localhost/api/tend", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

describe("POST /api/tend", () => {
  it("advances a valid demo command and heals only at landed", async () => {
    let command = {
      id: "demo-clip",
      tool: "clippers" as const,
      findingId: "dead-src-unused",
      nodeId: "src/unused.ts",
      state: "seen" as const,
      mode: "demo-rehearsal" as const,
      prUrl: null,
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
        command: typeof command;
        report: typeof report;
      };
      command = payload.command;
      report = payload.report;
      expect(command.state).toBe(expected);
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
});
