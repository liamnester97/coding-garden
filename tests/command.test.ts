import { describe, expect, it } from "vitest";
import {
  advanceToolCommand,
  createToolCommand,
  failToolCommand,
} from "@/lib/garden/command";
import { reanalyzeDemoReport } from "@/lib/garden/reanalysis";
import { sampleHealthReport } from "@/lib/analysis/sample-report";

describe("tending command lifecycle", () => {
  it("requires the full see-understand-confirm-act-verify sequence", () => {
    let command = createToolCommand({
      id: "demo-clip",
      tool: "clippers",
      findingId: "dead-src-unused",
      nodeId: "src/unused.ts",
    });
    expect(command.state).toBe("seen");
    for (const state of [
      "understood",
      "confirmed",
      "acting",
      "verifying",
      "landed",
    ] as const) {
      command = advanceToolCommand(command);
      expect(command.state).toBe(state);
    }
    expect(() => advanceToolCommand(command)).toThrow();
  });

  it("cannot confirm without an explanation state", () => {
    const command = createToolCommand({
      id: "demo",
      tool: "clippers",
      findingId: "dead-src-unused",
      nodeId: "src/unused.ts",
    });
    expect(() =>
      advanceToolCommand({ ...command, state: "confirmed" }),
    ).not.toThrow();
    expect(failToolCommand(command, "failed").state).toBe("failed");
  });

  it("heals only after re-analysis removes the finding", () => {
    const healed = reanalyzeDemoReport(sampleHealthReport, "dead-src-unused");
    expect(
      healed.findings.some((finding) => finding.id === "dead-src-unused"),
    ).toBe(false);
    expect(
      healed.nodes.find((node) => node.id === "src/unused.ts")?.health,
    ).toBe("healthy");
    expect(healed.reportHash).not.toBe(sampleHealthReport.reportHash);
  });

  it("supports the Watering Can coverage lifecycle", () => {
    let command = createToolCommand({
      id: "demo-water",
      tool: "watering-can",
      findingId: "coverage-src-garden",
      nodeId: "src/garden.ts",
    });
    while (command.state !== "landed") command = advanceToolCommand(command);
    const healed = reanalyzeDemoReport(sampleHealthReport, command.findingId);
    expect(
      healed.findings.some((finding) => finding.id === command.findingId),
    ).toBe(false);
    expect(
      healed.nodes.find((node) => node.id === command.nodeId)?.health,
    ).toBe("healthy");
  });
});
