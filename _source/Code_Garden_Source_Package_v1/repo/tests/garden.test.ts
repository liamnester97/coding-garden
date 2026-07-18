import { describe, expect, it } from "vitest";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { projectHealthReport } from "@/lib/garden/project";

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
  });
});
