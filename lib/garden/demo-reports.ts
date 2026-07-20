import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { sampleSeasons } from "@/lib/garden/seasons";
import {
  demoTeachingReport,
  teachingLessonReports,
  type TeachingLesson,
} from "@/content/teaching-lessons";
import type { HealthReport } from "@/lib/analysis/schema";

export function demoReports(): HealthReport[] {
  return [
    demoTeachingReport,
    sampleHealthReport,
    ...sampleSeasons(sampleHealthReport)
      .slice(1)
      .map((season) => season.report),
    ...Object.values(teachingLessonReports).flatMap((report) => [
      report,
      ...sampleSeasons(report)
        .slice(1)
        .map((season) => season.report),
    ]),
  ];
}

export function teachingReportForLesson(
  lessonId: TeachingLesson["id"] | "sample",
) {
  return lessonId === "sample"
    ? demoTeachingReport
    : lessonId === "demo-garden"
      ? demoTeachingReport
      : (teachingLessonReports[lessonId] ?? sampleHealthReport);
}
