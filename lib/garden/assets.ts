/**
 * Stage 11 authored asset manifest.
 *
 * The two atlases were generated for this project with the built-in image-generation workflow,
 * converted to RGBA WebP, and checked into public/assets/pixel-garden/. They contain no third-party
 * logos, text, credentials, or analyzed-repository content. The manifest is the only code-level source
 * of truth for atlas coordinates and player-facing asset purposes.
 */
export type PixelAtlas = "terrain-landmarks" | "characters-tools-states";

export type PixelSpriteId =
  | "grass"
  | "soil"
  | "stone-path"
  | "pond"
  | "sign"
  | "gate"
  | "greenhouse"
  | "shed"
  | "flower-bed"
  | "root-arch"
  | "pond-edge"
  | "lantern"
  | "tree"
  | "bench"
  | "code-scroll"
  | "bridge"
  | "gardener-down"
  | "gardener-left"
  | "gardener-right"
  | "gardener-up"
  | "magnifying-glass"
  | "clippers"
  | "watering-can"
  | "seedling"
  | "healthy-plant"
  | "stressed-plant"
  | "withered-plant"
  | "roots"
  | "pest"
  | "drought-patch"
  | "learning-spark"
  | "reanalyze-glow";

export type PixelSprite = {
  id: PixelSpriteId;
  atlas: PixelAtlas;
  column: 0 | 1 | 2 | 3;
  row: 0 | 1 | 2 | 3;
  label: string;
  purpose: string;
};

export const pixelSpriteManifest: Record<PixelSpriteId, PixelSprite> = {
  grass: {
    id: "grass",
    atlas: "terrain-landmarks",
    column: 0,
    row: 0,
    label: "Grass tile",
    purpose: "Authored garden ground decoration.",
  },
  soil: {
    id: "soil",
    atlas: "terrain-landmarks",
    column: 1,
    row: 0,
    label: "Soil tile",
    purpose: "Authored code-bed ground decoration.",
  },
  "stone-path": {
    id: "stone-path",
    atlas: "terrain-landmarks",
    column: 2,
    row: 0,
    label: "Stone path tile",
    purpose: "Authored route between garden areas.",
  },
  pond: {
    id: "pond",
    atlas: "terrain-landmarks",
    column: 3,
    row: 0,
    label: "Pond",
    purpose: "Authored water landmark.",
  },
  sign: {
    id: "sign",
    atlas: "terrain-landmarks",
    column: 0,
    row: 1,
    label: "Garden sign",
    purpose: "Authored orientation landmark.",
  },
  gate: {
    id: "gate",
    atlas: "terrain-landmarks",
    column: 1,
    row: 1,
    label: "Garden gate",
    purpose: "Authored entrance landmark.",
  },
  greenhouse: {
    id: "greenhouse",
    atlas: "terrain-landmarks",
    column: 2,
    row: 1,
    label: "Learning greenhouse",
    purpose: "Authored learning-area landmark.",
  },
  shed: {
    id: "shed",
    atlas: "terrain-landmarks",
    column: 3,
    row: 1,
    label: "Tool shed",
    purpose: "Authored tending-area landmark.",
  },
  "flower-bed": {
    id: "flower-bed",
    atlas: "terrain-landmarks",
    column: 0,
    row: 2,
    label: "Flower bed",
    purpose: "Authored garden-bed decoration.",
  },
  "root-arch": {
    id: "root-arch",
    atlas: "terrain-landmarks",
    column: 1,
    row: 2,
    label: "Root arch",
    purpose: "Authored transition landmark for the root paths.",
  },
  "pond-edge": {
    id: "pond-edge",
    atlas: "terrain-landmarks",
    column: 2,
    row: 2,
    label: "Pond edge",
    purpose: "Authored water-edge decoration.",
  },
  lantern: {
    id: "lantern",
    atlas: "terrain-landmarks",
    column: 3,
    row: 2,
    label: "Garden lantern",
    purpose: "Authored route marker.",
  },
  tree: {
    id: "tree",
    atlas: "terrain-landmarks",
    column: 0,
    row: 3,
    label: "Tree",
    purpose: "Authored garden boundary decoration.",
  },
  bench: {
    id: "bench",
    atlas: "terrain-landmarks",
    column: 1,
    row: 3,
    label: "Garden bench",
    purpose: "Authored rest and reflection landmark.",
  },
  "code-scroll": {
    id: "code-scroll",
    atlas: "terrain-landmarks",
    column: 2,
    row: 3,
    label: "Code scroll",
    purpose: "Authored classroom comparison landmark.",
  },
  bridge: {
    id: "bridge",
    atlas: "terrain-landmarks",
    column: 3,
    row: 3,
    label: "Garden bridge",
    purpose: "Authored transition landmark.",
  },
  "gardener-down": {
    id: "gardener-down",
    atlas: "characters-tools-states",
    column: 0,
    row: 0,
    label: "Gardener facing down",
    purpose: "Player avatar idle state.",
  },
  "gardener-left": {
    id: "gardener-left",
    atlas: "characters-tools-states",
    column: 1,
    row: 0,
    label: "Gardener facing left",
    purpose: "Player avatar idle state.",
  },
  "gardener-right": {
    id: "gardener-right",
    atlas: "characters-tools-states",
    column: 2,
    row: 0,
    label: "Gardener facing right",
    purpose: "Player avatar idle state.",
  },
  "gardener-up": {
    id: "gardener-up",
    atlas: "characters-tools-states",
    column: 3,
    row: 0,
    label: "Gardener facing up",
    purpose: "Player avatar idle state.",
  },
  "magnifying-glass": {
    id: "magnifying-glass",
    atlas: "characters-tools-states",
    column: 0,
    row: 1,
    label: "Magnifying Glass",
    purpose: "Report-grounded inspection tool.",
  },
  clippers: {
    id: "clippers",
    atlas: "characters-tools-states",
    column: 1,
    row: 1,
    label: "Clippers",
    purpose: "Sample-only dead-code rehearsal tool.",
  },
  "watering-can": {
    id: "watering-can",
    atlas: "characters-tools-states",
    column: 2,
    row: 1,
    label: "Watering Can",
    purpose: "Sample-only coverage-gap rehearsal tool.",
  },
  seedling: {
    id: "seedling",
    atlas: "characters-tools-states",
    column: 3,
    row: 1,
    label: "Code seedling",
    purpose: "Neutral plant placeholder before health encoding.",
  },
  "healthy-plant": {
    id: "healthy-plant",
    atlas: "characters-tools-states",
    column: 0,
    row: 2,
    label: "Healthy code plant",
    purpose: "HealthReport healthy-state encoding.",
  },
  "stressed-plant": {
    id: "stressed-plant",
    atlas: "characters-tools-states",
    column: 1,
    row: 2,
    label: "Stressed code plant",
    purpose: "HealthReport stressed-state encoding.",
  },
  "withered-plant": {
    id: "withered-plant",
    atlas: "characters-tools-states",
    column: 2,
    row: 2,
    label: "Withered code plant",
    purpose: "HealthReport withered-state encoding.",
  },
  roots: {
    id: "roots",
    atlas: "characters-tools-states",
    column: 3,
    row: 2,
    label: "Root bundle",
    purpose: "Decorative root texture behind analyzed import edges.",
  },
  pest: {
    id: "pest",
    atlas: "characters-tools-states",
    column: 0,
    row: 3,
    label: "Pest",
    purpose: "Visual accent for a vulnerability finding only.",
  },
  "drought-patch": {
    id: "drought-patch",
    atlas: "characters-tools-states",
    column: 1,
    row: 3,
    label: "Drought patch",
    purpose: "Visual accent for a coverage-gap finding only.",
  },
  "learning-spark": {
    id: "learning-spark",
    atlas: "characters-tools-states",
    column: 2,
    row: 3,
    label: "Learning spark",
    purpose: "Non-health feedback for a completed learning objective.",
  },
  "reanalyze-glow": {
    id: "reanalyze-glow",
    atlas: "characters-tools-states",
    column: 3,
    row: 3,
    label: "Re-analysis glow",
    purpose: "Feedback shown only after verified re-analysis.",
  },
};

export const pixelAtlasSources: Record<PixelAtlas, string> = {
  "terrain-landmarks": "/assets/pixel-garden/terrain-landmarks.webp",
  "characters-tools-states":
    "/assets/pixel-garden/characters-tools-states.webp",
};

export const authoredGardenDecorations: Array<{
  id: string;
  sprite: PixelSpriteId;
  x: number;
  y: number;
  size: "small" | "medium" | "large";
  label: string;
}> = [
  {
    id: "entrance-gate",
    sprite: "gate",
    x: 5,
    y: 67,
    size: "large",
    label: "Garden entrance",
  },
  {
    id: "learning-greenhouse",
    sprite: "greenhouse",
    x: 61,
    y: 4,
    size: "large",
    label: "Learning greenhouse",
  },
  {
    id: "tool-shed",
    sprite: "shed",
    x: 68,
    y: 61,
    size: "large",
    label: "Tool shed",
  },
  {
    id: "root-arch",
    sprite: "root-arch",
    x: 36,
    y: 35,
    size: "medium",
    label: "Root path arch",
  },
  {
    id: "flower-bed",
    sprite: "flower-bed",
    x: 7,
    y: 12,
    size: "medium",
    label: "Flower bed",
  },
  {
    id: "pond",
    sprite: "pond",
    x: 75,
    y: 8,
    size: "medium",
    label: "Garden pond",
  },
  {
    id: "bench",
    sprite: "bench",
    x: 44,
    y: 72,
    size: "small",
    label: "Garden bench",
  },
  {
    id: "code-scroll",
    sprite: "code-scroll",
    x: 19,
    y: 72,
    size: "medium",
    label: "Classroom comparison scroll",
  },
  {
    id: "tree",
    sprite: "tree",
    x: 86,
    y: 39,
    size: "large",
    label: "Garden boundary tree",
  },
  {
    id: "lantern",
    sprite: "lantern",
    x: 49,
    y: 18,
    size: "small",
    label: "Learning path lantern",
  },
];

export function spriteForHealth(health: "healthy" | "stressed" | "withered") {
  return `${health}-plant` as PixelSpriteId;
}

export function spritePosition(spriteId: PixelSpriteId) {
  const sprite = pixelSpriteManifest[spriteId];
  return {
    backgroundImage: `url(${pixelAtlasSources[sprite.atlas]})`,
    backgroundPosition: `${sprite.column * (100 / 3)}% ${sprite.row * (100 / 3)}%`,
    backgroundSize: "400% 400%",
  };
}
