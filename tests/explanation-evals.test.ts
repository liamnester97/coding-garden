import { describe, expect, it } from "vitest";
import {
  explanationEvaluationCases,
  explanationPromptVersion,
} from "@/lib/ai/prompts/explanation";

describe("Magnifying Glass prompt contract", () => {
  it("keeps five representative evidence expectations versioned", () => {
    expect(explanationPromptVersion).toBe("magnifying-glass-v1");
    expect(explanationEvaluationCases).toHaveLength(5);
    for (const evaluation of explanationEvaluationCases) {
      expect(evaluation.required.length).toBeGreaterThanOrEqual(2);
    }
  });
});
