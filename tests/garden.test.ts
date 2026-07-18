import { describe, expect, it } from "vitest";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { projectHealthReport } from "@/lib/garden/project";
import { explainNode } from "@/lib/ai/explain";

describe("HealthReport garden projection", () => {
  it("is deterministic and preserves report health", () => {
    const first = projectHealthReport(sampleHealthReport);
    const second = projectHealthReport(sampleHealthReport);

    expect(first).toEqual(second);
    expect(first.plants.map((plant) => plant.health)).toEqual([
      "stressed",
      "withered",
      "healthy",
    ]);
    expect(first.plants.every((plant) => plant.x >= 10 && plant.x <= 89)).toBe(
      true,
    );
  });

  it("anchors finding labels to report evidence", () => {
    const scene = projectHealthReport(sampleHealthReport);
    const unused = scene.plants.find((plant) => plant.id === "src/unused.ts");

    expect(unused?.findingLabels).toEqual(["unreachable branch"]);
    expect(unused?.ariaLabel).toContain("Withered");
    expect(unused?.findings).toEqual([
      {
        label: "unreachable branch",
        summary: "This module has no incoming imports.",
        evidence: "import-graph · src/unused.ts",
      },
    ]);
  });

  it("grounds the magnifying-glass explanation in report evidence", () => {
    const explanation = explainNode(sampleHealthReport, "src/unused.ts");

    expect(explanation?.mode).toBe("sample");
    expect(explanation?.summary).toContain("withered");
    expect(explanation?.evidence).toEqual([
      "unreachable branch: This module has no incoming imports. (import-graph · src/unused.ts)",
    ]);
  });

  it("returns a calm explanation for a healthy plant", () => {
    const explanation = explainNode(sampleHealthReport, "src/health.ts");

    expect(explanation?.summary).toContain("currently healthy");
    expect(explanation?.evidence).toEqual([]);
  });

  it("projects a real-analysis-shaped report without changing its health truth", () => {
    const report = {
      ...sampleHealthReport,
      reportHash: "gentelella-rehearsal",
      repo: {
        name: "gentelella",
        ref: "c4515bd2682660d79d6d0e64160a57cd86482451",
        commit: "c4515bd2682660d79d6d0e64160a57cd86482451",
      },
      nodes: [
        {
          id: "src/v4/inbox.js",
          path: "src/v4/inbox.js",
          health: "withered" as const,
        },
        {
          id: "src/v4/toast.js",
          path: "src/v4/toast.js",
          health: "stressed" as const,
        },
      ],
      edges: [{ from: "src/v4/inbox.js", to: "src/v4/toast.js" }],
      findings: [
        {
          id: "coverage-inbox",
          type: "coverage-gap" as const,
          nodeId: "src/v4/inbox.js",
          summary: "No matching test file was found; coverage is estimated.",
          evidence: { tool: "test-file-mapping", file: "src/v4/inbox.js" },
        },
        {
          id: "complexity-inbox",
          type: "complexity" as const,
          nodeId: "src/v4/inbox.js",
          summary: "This file has a high branching-syntax count.",
          evidence: {
            tool: "branch-count",
            file: "src/v4/inbox.js",
            metric: 165,
          },
        },
      ],
    };
    const scene = projectHealthReport(report);
    expect(scene.reportHash).toBe("gentelella-rehearsal");
    expect(scene.roots).toHaveLength(1);
    expect(scene.roots[0]).toMatchObject({
      from: "src/v4/inbox.js",
      to: "src/v4/toast.js",
    });
    expect(scene.plants.map((plant) => plant.health)).toEqual([
      "withered",
      "stressed",
    ]);
    expect(scene.plants[0]?.findingLabels).toEqual([
      "unwatered test path",
      "overgrown logic",
    ]);
    expect(scene.plants[0]?.x).toBeGreaterThanOrEqual(10);
    expect(scene.plants[0]?.x).toBeLessThanOrEqual(89);
  });
});
