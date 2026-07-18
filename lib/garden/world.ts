export type WorldPoint = { x: number; y: number };

export const gardenerStart: WorldPoint = { x: 50, y: 86 };
export const toolStations = [
  { id: "magnify", label: "Magnifying Glass", x: 12, y: 16 },
  { id: "clippers", label: "Clippers", x: 88, y: 18 },
  { id: "watering-can", label: "Watering Can", x: 86, y: 82 },
] as const;

export function moveGardener(
  point: WorldPoint,
  direction: string,
  step = 4,
): WorldPoint {
  const delta: Record<string, WorldPoint> = {
    ArrowUp: { x: 0, y: -step },
    w: { x: 0, y: -step },
    ArrowDown: { x: 0, y: step },
    s: { x: 0, y: step },
    ArrowLeft: { x: -step, y: 0 },
    a: { x: -step, y: 0 },
    ArrowRight: { x: step, y: 0 },
    d: { x: step, y: 0 },
  };
  const change = delta[direction];
  if (!change) return point;
  return {
    x: Math.min(94, Math.max(6, point.x + change.x)),
    y: Math.min(94, Math.max(6, point.y + change.y)),
  };
}
