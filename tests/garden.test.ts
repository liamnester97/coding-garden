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
});
