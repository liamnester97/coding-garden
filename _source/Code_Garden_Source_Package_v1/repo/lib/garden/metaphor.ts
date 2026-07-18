import type { HealthReport } from "@/lib/analysis/schema";

export const healthMetaphor = {
  healthy: {
    label: "Healthy",
    description: "The report found no current warning signal for this module.",
    color: "#8bd36b",
  },
  stressed: {
    label: "Stressed",
    description: "The report found a signal that needs attention.",
    color: "#f0bd62",
  },
  withered: {
    label: "Withered",
    description: "The report found a severe or blocking signal.",
    color: "#e77767",
  },
} satisfies Record<HealthReport["nodes"][number]["health"], object>;

export const findingMetaphor = {
  "dead-code": "unreachable branch",
  "coverage-gap": "unwatered test path",
  vulnerability: "pest risk",
  complexity: "overgrown logic",
} as const;

export type HealthState = keyof typeof healthMetaphor;
