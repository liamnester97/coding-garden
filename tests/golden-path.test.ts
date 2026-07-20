import { describe, expect, it } from "vitest";
import {
  advanceGoldenPath,
  completedGoldenPathSteps,
  initialGoldenPathState,
} from "@/lib/garden/golden-path";

describe("exploration-to-learning golden path", () => {
  it("starts in the garden and advances the ordered journey", () => {
    const initial = initialGoldenPathState();
    expect(completedGoldenPathSteps(initial).map((step) => step.id)).toEqual([
      "entered",
    ]);

    const inspected = advanceGoldenPath(
      advanceGoldenPath(initial, "explored"),
      "inspected",
    );
    expect(completedGoldenPathSteps(inspected).map((step) => step.id)).toEqual([
      "entered",
      "explored",
      "inspected",
    ]);
  });

  it("keeps a completed step complete and makes skipped events truthful", () => {
    const state = advanceGoldenPath(initialGoldenPathState(), "confirmed");
    expect(state.confirmed).toBe(true);
    expect(state.answered).toBe(true);
    expect(state.rehearsed).toBe(false);

    const repeated = advanceGoldenPath(state, "inspected");
    expect(repeated).toEqual(state);
  });
});
