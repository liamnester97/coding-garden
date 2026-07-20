export type WorldPoint = { x: number; y: number };
export type Facing = "up" | "down" | "left" | "right";

export type WorldMove = {
  point: WorldPoint;
  facing: Facing;
  moved: boolean;
};

export function distanceBetween(first: WorldPoint, second: WorldPoint) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

export function isNearWorldPoint(
  point: WorldPoint,
  target: WorldPoint,
  radius = 10,
) {
  return distanceBetween(point, target) <= radius;
}

export const gardenerStart: WorldPoint = { x: 50, y: 86 };
export const toolStations = [
  { id: "magnify", label: "Magnifying Glass", x: 20, y: 20 },
  { id: "clippers", label: "Clippers", x: 88, y: 18 },
  { id: "watering-can", label: "Watering Can", x: 86, y: 82 },
] as const;

/** Walkable approach points used by the authored route and its tests. */
export const gardenNavigationTargets = [
  { id: "entrance", label: "Garden gate", point: gardenerStart },
  { id: "magnify", label: "Magnifying Glass", point: { x: 20, y: 20 } },
  { id: "learning", label: "Learning greenhouse", point: { x: 75, y: 20 } },
  { id: "clippers", label: "Clippers", point: { x: 88, y: 18 } },
  { id: "watering-can", label: "Watering Can", point: { x: 86, y: 82 } },
  { id: "reflection", label: "Reflection bench", point: { x: 55, y: 86 } },
] as const;

export type SolidArea = { x: number; y: number; width: number; height: number };

export const gardenerCollisionRadius = 3;

function directionFor(direction: string): Facing | null {
  if (direction === "ArrowUp" || direction === "w") return "up";
  if (direction === "ArrowDown" || direction === "s") return "down";
  if (direction === "ArrowLeft" || direction === "a") return "left";
  if (direction === "ArrowRight" || direction === "d") return "right";
  return null;
}

function overlapsSolid(point: WorldPoint, solids: SolidArea[]) {
  return solids.some(
    (solid) =>
      point.x + gardenerCollisionRadius > solid.x &&
      point.x - gardenerCollisionRadius < solid.x + solid.width &&
      point.y + gardenerCollisionRadius > solid.y &&
      point.y - gardenerCollisionRadius < solid.y + solid.height,
  );
}

export function isWorldPointWalkable(point: WorldPoint, solids: SolidArea[]) {
  return (
    point.x >= 6 &&
    point.x <= 94 &&
    point.y >= 6 &&
    point.y <= 94 &&
    !overlapsSolid(point, solids)
  );
}

export function canReachWorldPoint(
  start: WorldPoint,
  target: WorldPoint,
  solids: SolidArea[],
  step = 4,
) {
  if (
    !isWorldPointWalkable(start, solids) ||
    !isWorldPointWalkable(target, solids)
  ) {
    return false;
  }
  const key = (point: WorldPoint) => `${point.x},${point.y}`;
  const queue = [start];
  const visited = new Set([key(start)]);
  const directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  while (queue.length) {
    const current = queue.shift();
    if (!current) break;
    if (distanceBetween(current, target) <= step) return true;
    for (const direction of directions) {
      const next = moveGardenerWithFacing(
        current,
        "down",
        direction,
        solids,
        step,
      );
      const nextKey = key(next.point);
      if (next.moved && !visited.has(nextKey)) {
        visited.add(nextKey);
        queue.push(next.point);
      }
    }
  }
  return false;
}

export function moveGardenerWithFacing(
  point: WorldPoint,
  facing: Facing,
  direction: string,
  solids: SolidArea[] = [],
  step = 4,
): WorldMove {
  const nextFacing = directionFor(direction);
  if (!nextFacing) return { point, facing, moved: false };
  const delta: Record<Facing, WorldPoint> = {
    up: { x: 0, y: -step },
    down: { x: 0, y: step },
    left: { x: -step, y: 0 },
    right: { x: step, y: 0 },
  };
  const change = delta[nextFacing];
  const nextPoint = {
    x: Math.min(94, Math.max(6, point.x + change.x)),
    y: Math.min(94, Math.max(6, point.y + change.y)),
  };
  if (!isWorldPointWalkable(nextPoint, solids)) {
    return { point, facing: nextFacing, moved: false };
  }
  return { point: nextPoint, facing: nextFacing, moved: true };
}

export function moveGardener(
  point: WorldPoint,
  direction: string,
  step = 4,
): WorldPoint {
  return moveGardenerWithFacing(point, "down", direction, [], step).point;
}
