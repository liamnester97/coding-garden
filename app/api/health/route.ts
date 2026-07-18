import { NextResponse } from "next/server";
import { sampleHealthReport } from "@/lib/analysis/sample-report";

export function GET() {
  return NextResponse.json({
    ok: true,
    mode: "sample",
    reportHash: sampleHealthReport.reportHash,
    message: "Code Garden is running in deterministic sample mode.",
  });
}
