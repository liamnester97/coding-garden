export const goldenPathStepIds = [
  "entered",
  "explored",
  "inspected",
  "answered",
  "confirmed",
  "rehearsed",
  "reanalyzed",
  "reflected",
] as const;

export type GoldenPathStepId = (typeof goldenPathStepIds)[number];

export type GoldenPathState = Record<GoldenPathStepId, boolean>;

export const goldenPathSteps: ReadonlyArray<{
  id: GoldenPathStepId;
  label: string;
  description: string;
}> = [
  {
    id: "entered",
    label: "Enter",
    description: "Start in the garden map.",
  },
  {
    id: "explored",
    label: "Explore",
    description: "Walk to a plant or learning area.",
  },
  {
    id: "inspected",
    label: "Inspect",
    description: "Read what the plant is telling you.",
  },
  {
    id: "answered",
    label: "Answer",
    description: "Show what you understand.",
  },
  {
    id: "confirmed",
    label: "Confirm",
    description: "Review the proposed demo scope.",
  },
  {
    id: "rehearsed",
    label: "Tend",
    description: "Run the sample-only rehearsal.",
  },
  {
    id: "reanalyzed",
    label: "Re-analyze",
    description: "Wait for the verified report update.",
  },
  {
    id: "reflected",
    label: "Reflect",
    description: "Compare the garden before and after.",
  },
];

export function initialGoldenPathState(): GoldenPathState {
  return {
    entered: true,
    explored: false,
    inspected: false,
    answered: false,
    confirmed: false,
    rehearsed: false,
    reanalyzed: false,
    reflected: false,
  };
}

export function advanceGoldenPath(
  state: GoldenPathState,
  step: GoldenPathStepId,
): GoldenPathState {
  const index = goldenPathStepIds.indexOf(step);
  if (index < 0) return state;
  const next = { ...state };
  for (const priorStep of goldenPathStepIds.slice(0, index + 1)) {
    next[priorStep] = true;
  }
  return next;
}

export function completedGoldenPathSteps(state: GoldenPathState) {
  return goldenPathSteps.filter((step) => state[step.id]);
}
