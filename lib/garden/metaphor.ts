import type { HealthReport } from "@/lib/analysis/schema";

export const healthMetaphor = {
  healthy: {
    label: "Healthy",
    description:
      "Nothing in the current check says this part of the code needs attention.",
    color: "#8bd36b",
  },
  stressed: {
    label: "Stressed",
    description: "One check found something worth looking at.",
    color: "#f0bd62",
  },
  withered: {
    label: "Withered",
    description:
      "Several checks, or one serious check, found a problem that needs attention.",
    color: "#e77767",
  },
} satisfies Record<HealthReport["nodes"][number]["health"], object>;

export const findingMetaphor = {
  "dead-code": "unreachable branch",
  "coverage-gap": "unwatered test path",
  vulnerability: "pest risk",
  complexity: "overgrown logic",
  "syntax-error": "tangled syntax",
  "logic-bug": "crooked logic",
  "missing-function": "missing sprout",
} as const;

export type HealthState = keyof typeof healthMetaphor;
