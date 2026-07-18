import { describe, expect, it } from "vitest";
import { gardenerStart, moveGardener, toolStations } from "@/lib/garden/world";

describe("garden world controls", () => {
  it("moves with keyboard directions and stays inside the map", () => {
    expect(moveGardener(gardenerStart, "ArrowUp")).toEqual({ x: 50, y: 82 });
    expect(moveGardener({ x: 6, y: 6 }, "a")).toEqual({ x: 6, y: 6 });
    expect(moveGardener({ x: 94, y: 94 }, "ArrowRight")).toEqual({
      x: 94,
      y: 94,
    });
    expect(moveGardener(gardenerStart, "unknown")).toEqual(gardenerStart);
  });

  it("keeps the three learning stations named and stable", () => {
    expect(toolStations.map((station) => station.label)).toEqual([
      "Magnifying Glass",
      "Clippers",
      "Watering Can",
    ]);
  });
});
