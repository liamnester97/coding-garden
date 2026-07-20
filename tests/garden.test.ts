import { describe, expect, it } from "vitest";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { projectHealthReport } from "@/lib/garden/project";
import { explainNode } from "@/lib/garden/explanation";
import { authoredGardenMap } from "@/lib/garden/map";
import { demoTeachingReport } from "@/content/teaching-lessons";
import {
  pixelSpriteManifest,
  spriteForHealth,
  spritePosition,
} from "@/lib/garden/assets";

describe("HealthReport garden projection", () => {
  it("keeps the authored map fixed and analytical content report-derived", () => {
    const first = projectHealthReport(sampleHealthReport);
    const second = projectHealthReport(sampleHealthReport);

    expect(authoredGardenMap.zones.map((zone) => zone.id)).toEqual([
      "entrance",
      "learning",
      "code-beds",
      "root-crossing",
      "tool-shed",
      "payoff",
    ]);
    expect(authoredGardenMap.paths).toHaveLength(6);
    expect(authoredGardenMap.paths.map((path) => path.id)).toEqual([
      "main-walk",
      "learning-walk",
      "magnify-walk",
      "tool-walk",
      "clippers-walk",
      "reflection-walk",
    ]);
    expect(first.plants).toEqual(second.plants);
    expect(first.roots).toEqual(second.roots);
    expect(first.plants).toHaveLength(sampleHealthReport.nodes.length);
    expect(first.roots).toHaveLength(
      new Set(
        sampleHealthReport.edges.map((edge) => `${edge.from}\0${edge.to}`),
      ).size,
    );
  });

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

  it("resolves colliding hash slots without changing stable placement", () => {
    const report = {
      ...sampleHealthReport,
      nodes: [
        {
          id: "src/module-22.ts",
          path: "src/module-22.ts",
          health: "healthy" as const,
        },
        {
          id: "src/module-147.ts",
          path: "src/module-147.ts",
          health: "healthy" as const,
        },
      ],
      findings: [],
      edges: [],
    };
    const first = projectHealthReport(report);
    const second = projectHealthReport(report);
    expect(first).toEqual(second);
    expect(first.plants[0]).not.toMatchObject({
      x: first.plants[1]?.x,
      y: first.plants[1]?.y,
    });
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
      "unreachable branch: This module has no incoming imports. Source: src/unused.ts. Check: import map.",
    ]);
  });

  it("returns a calm explanation for a healthy plant", () => {
    const explanation = explainNode(sampleHealthReport, "src/health.ts");

    expect(explanation?.summary).toContain("looks healthy");
    expect(explanation?.evidence).toEqual([]);
  });

  it("keeps the inspector explanation understandable without static-analysis jargon", () => {
    const explanation = explainNode(sampleHealthReport, "src/unused.ts");

    expect(explanation?.summary).toContain("issue");
    expect(explanation?.health).toContain("needs attention");
    expect(explanation?.evidence[0]).toContain("import map");
    expect(explanation?.needs).toContain("understand what is happening");
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
      edges: [
        { from: "src/v4/inbox.js", to: "src/v4/toast.js" },
        { from: "src/v4/inbox.js", to: "src/v4/toast.js" },
      ],
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

  it("maps HealthReport health to the authored plant sprite states", () => {
    const scene = projectHealthReport(sampleHealthReport);

    expect(scene.plants.map((plant) => plant.sprite)).toEqual([
      "stressed-plant",
      "withered-plant",
      "healthy-plant",
    ]);
    expect(spriteForHealth("healthy")).toBe("healthy-plant");
    expect(spriteForHealth("stressed")).toBe("stressed-plant");
    expect(spriteForHealth("withered")).toBe("withered-plant");
  });

  it("keeps every authored sprite manifest entry inside the four-cell atlas", () => {
    for (const sprite of Object.values(pixelSpriteManifest)) {
      expect(sprite.column).toBeGreaterThanOrEqual(0);
      expect(sprite.column).toBeLessThanOrEqual(3);
      expect(sprite.row).toBeGreaterThanOrEqual(0);
      expect(sprite.row).toBeLessThanOrEqual(3);
      expect(sprite.label.length).toBeGreaterThan(0);
      expect(sprite.purpose.length).toBeGreaterThan(0);
    }
    expect(spritePosition("healthy-plant")).toMatchObject({
      backgroundSize: "400% 400%",
      backgroundPosition: "0% 66.66666666666667%",
    });
  });

  it("keeps all four directional gardener sprites distinct and addressable", () => {
    const sprites = [
      "gardener-up",
      "gardener-down",
      "gardener-left",
      "gardener-right",
    ] as const;
    expect(
      new Set(
        sprites.map((sprite) => spritePosition(sprite).backgroundPosition),
      ).size,
    ).toBe(4);
  });

  it("projects the Python demo into five distinct target categories", () => {
    const scene = projectHealthReport(demoTeachingReport);
    expect(scene.plants).toHaveLength(5);
    expect(
      new Set(scene.plants.map((plant) => plant.targetCategory)).size,
    ).toBe(3);
    expect(
      scene.plants.every((plant) => plant.path === "lesson_garden.py"),
    ).toBe(true);
  });
});
