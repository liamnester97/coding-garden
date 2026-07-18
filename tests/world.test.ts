import { describe, expect, it } from "vitest";
import {
  gardenerStart,
  moveGardener,
  moveGardenerWithFacing,
  toolStations,
} from "@/lib/garden/world";

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

  it("faces the direction of travel and blocks authored obstacles", () => {
    const right = moveGardenerWithFacing(
      { x: 40, y: 40 },
      "down",
      "ArrowRight",
      [],
    );
    expect(right).toMatchObject({
      point: { x: 44, y: 40 },
      facing: "right",
      moved: true,
    });

    const blocked = moveGardenerWithFacing(
      { x: 48, y: 40 },
      "left",
      "ArrowRight",
      [{ x: 50, y: 35, width: 10, height: 10 }],
    );
    expect(blocked).toMatchObject({
      point: { x: 48, y: 40 },
      facing: "right",
      moved: false,
    });
  });
});
