export const explanationPromptVersion = "magnifying-glass-v1";

export const explanationEvaluationCases = [
  { nodeId: "dead-code", required: ["unused", "report"] },
  { nodeId: "coverage-gap", required: ["test", "estimated"] },
  { nodeId: "complexity", required: ["branch", "complex"] },
  { nodeId: "vulnerability", required: ["security", "dependency"] },
  { nodeId: "healthy", required: ["healthy", "warning"] },
] as const;
