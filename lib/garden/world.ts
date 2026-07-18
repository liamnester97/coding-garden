export type WorldPoint = { x: number; y: number };
export type Facing = "up" | "down" | "left" | "right";

export type WorldMove = {
  point: WorldPoint;
  facing: Facing;
  moved: boolean;
};

export const gardenerStart: WorldPoint = { x: 50, y: 86 };
export const toolStations = [
  { id: "magnify", label: "Magnifying Glass", x: 12, y: 16 },
  { id: "clippers", label: "Clippers", x: 88, y: 18 },
  { id: "watering-can", label: "Watering Can", x: 86, y: 82 },
] as const;

type SolidArea = { x: number; y: number; width: number; height: number };

function directionFor(direction: string): Facing | null {
  if (direction === "ArrowUp" || direction === "w") return "up";
  if (direction === "ArrowDown" || direction === "s") return "down";
  if (direction === "ArrowLeft" || direction === "a") return "left";
  if (direction === "ArrowRight" || direction === "d") return "right";
  return null;
}

function overlapsSolid(point: WorldPoint, solids: SolidArea[]) {
  const radius = 3;
  return solids.some(
    (solid) =>
      point.x + radius > solid.x &&
      point.x - radius < solid.x + solid.width &&
      point.y + radius > solid.y &&
      point.y - radius < solid.y + solid.height,
  );
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
  if (overlapsSolid(nextPoint, solids)) {
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
