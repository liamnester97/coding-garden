import { describe, expect, it } from "vitest";
import {
  gardenerStart,
  distanceBetween,
  isNearWorldPoint,
  moveGardener,
  moveGardenerWithFacing,
  isWorldPointWalkable,
  canReachWorldPoint,
  gardenNavigationTargets,
  toolStations,
} from "@/lib/garden/world";
import { authoredGardenMap } from "@/lib/garden/map";

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

  it.each([
    ["ArrowUp", "up"],
    ["ArrowDown", "down"],
    ["ArrowLeft", "left"],
    ["ArrowRight", "right"],
  ] as const)("maps %s to the %s gardener facing", (direction, facing) => {
    expect(
      moveGardenerWithFacing({ x: 50, y: 50 }, "down", direction, []).facing,
    ).toBe(facing);
  });

  it("supports proximity interaction zones", () => {
    expect(distanceBetween({ x: 10, y: 10 }, { x: 13, y: 14 })).toBe(5);
    expect(isNearWorldPoint({ x: 10, y: 10 }, { x: 13, y: 14 }, 5)).toBe(true);
    expect(isNearWorldPoint({ x: 10, y: 10 }, { x: 16, y: 14 }, 5)).toBe(false);
  });

  it("uses collision padding to keep the avatar outside authored solids", () => {
    const pond = { x: 67, y: 2, width: 16, height: 14 };
    expect(isWorldPointWalkable({ x: 66, y: 10 }, [pond])).toBe(false);
    expect(isWorldPointWalkable({ x: 60, y: 20 }, [pond])).toBe(true);
  });

  it("keeps every required destination reachable from the entrance", () => {
    for (const target of gardenNavigationTargets) {
      expect(
        canReachWorldPoint(
          gardenerStart,
          target.point,
          authoredGardenMap.solids,
        ),
        target.label,
      ).toBe(true);
    }
  });

  it("keeps authored route points outside solid areas", () => {
    for (const path of authoredGardenMap.paths) {
      for (const point of path.points.split(" ")) {
        const [x, y] = point.split(",").map(Number);
        expect(
          isWorldPointWalkable({ x, y }, authoredGardenMap.solids),
          path.label,
        ).toBe(true);
      }
    }
  });

  it("changes facing even when a movement command is blocked", () => {
    const result = moveGardenerWithFacing(
      { x: 66, y: 10 },
      "down",
      "ArrowRight",
      [{ x: 67, y: 2, width: 16, height: 14 }],
    );
    expect(result.point).toEqual({ x: 66, y: 10 });
    expect(result.facing).toBe("right");
    expect(result.moved).toBe(false);
  });
});
