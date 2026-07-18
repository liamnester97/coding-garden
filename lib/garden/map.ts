/**
 * Fixed authored map data for Stage 12. Decorations explain the world; only
 * HealthReport nodes and edges supply analytical plants and roots.
 */
export type GardenMapZone = {
  id:
    | "entrance"
    | "learning"
    | "code-beds"
    | "root-crossing"
    | "tool-shed"
    | "payoff";
  label: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tone: "path" | "learning" | "beds" | "tools" | "payoff";
};

export type GardenMapPath = { id: string; points: string; label: string };
export type GardenMapSolid = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const authoredGardenMap = {
  viewBox: "0 0 100 100",
  zones: [
    {
      id: "entrance",
      label: "Garden gate",
      description: "Start here and get oriented.",
      x: 2,
      y: 59,
      width: 19,
      height: 30,
      tone: "path",
    },
    {
      id: "learning",
      label: "Learning greenhouse",
      description: "Inspect a plant and answer its code question.",
      x: 54,
      y: 2,
      width: 30,
      height: 22,
      tone: "learning",
    },
    {
      id: "code-beds",
      label: "Code beds",
      description: "Plants represent modules from the current report.",
      x: 21,
      y: 24,
      width: 53,
      height: 52,
      tone: "beds",
    },
    {
      id: "root-crossing",
      label: "Root crossing",
      description: "Roots show analyzed import relationships.",
      x: 31,
      y: 34,
      width: 38,
      height: 18,
      tone: "path",
    },
    {
      id: "tool-shed",
      label: "Tool shed",
      description: "Practice a sample-only tending rehearsal.",
      x: 73,
      y: 58,
      width: 25,
      height: 30,
      tone: "tools",
    },
    {
      id: "payoff",
      label: "Reflection bench",
      description: "Compare the report before and after re-analysis.",
      x: 19,
      y: 77,
      width: 39,
      height: 18,
      tone: "payoff",
    },
  ] satisfies GardenMapZone[],
  paths: [
    {
      id: "main-walk",
      label: "Main garden walk",
      points: "10,74 28,74 42,63 50,43 68,30 69,16",
    },
    {
      id: "learning-walk",
      label: "Learning greenhouse walk",
      points: "50,43 50,30 58,22 69,16",
    },
    {
      id: "magnify-walk",
      label: "Magnifying Glass walk",
      points: "10,74 12,58 12,30 12,16",
    },
    {
      id: "tool-walk",
      label: "Tool shed walk",
      points: "50,43 77,43 86,72 86,82",
    },
    {
      id: "reflection-walk",
      label: "Reflection bench walk",
      points: "42,63 42,84 38,86",
    },
  ] satisfies GardenMapPath[],
  solids: [
    {
      id: "flower-bed",
      label: "Flower bed",
      x: 0,
      y: 4,
      width: 15,
      height: 16,
    },
    { id: "pond", label: "Pond", x: 67, y: 2, width: 16, height: 14 },
    {
      id: "greenhouse",
      label: "Learning greenhouse",
      x: 51,
      y: 2,
      width: 21,
      height: 14,
    },
    { id: "shed", label: "Tool shed", x: 57, y: 50, width: 22, height: 22 },
    { id: "tree", label: "Boundary tree", x: 75, y: 28, width: 21, height: 22 },
    {
      id: "bench",
      label: "Reflection bench",
      x: 39,
      y: 68,
      width: 10,
      height: 8,
    },
    {
      id: "code-scroll",
      label: "Classroom scroll",
      x: 11,
      y: 64,
      width: 16,
      height: 16,
    },
  ] satisfies GardenMapSolid[],
} as const;

export type AuthoredGardenMap = typeof authoredGardenMap;
