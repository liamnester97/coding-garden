import { NextResponse } from "next/server";
import { healthReportSchema } from "@/lib/analysis/schema";
import {
  advanceToolCommand,
  createToolCommand,
  failToolCommand,
  toolCommandSchema,
} from "@/lib/garden/command";
import { reanalyzeDemoReport } from "@/lib/garden/reanalysis";
import { z } from "zod";

export const runtime = "nodejs";

const requestSchema = z.object({
  report: healthReportSchema,
  command: z.union([
    toolCommandSchema,
    z.object({
      id: z.string().min(1),
      tool: toolCommandSchema.shape.tool,
      findingId: z.string().min(1),
      nodeId: z.string().min(1),
    }),
  ]),
  action: z.enum(["advance", "fail"]).default("advance"),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "A valid report and command are required" },
      { status: 400 },
    );

  const { report, action } = parsed.data;
  const command =
    "state" in parsed.data.command
      ? parsed.data.command
      : createToolCommand(parsed.data.command);
  if (!report.findings.some((finding) => finding.id === command.findingId))
    return NextResponse.json(
      { error: "Finding is not present in this report" },
      { status: 409 },
    );

  try {
    const next =
      action === "fail"
        ? failToolCommand(
            command,
            "The rehearsal task failed; garden health was not changed.",
          )
        : advanceToolCommand(command);
    const healedReport =
      next.state === "landed"
        ? reanalyzeDemoReport(report, command.findingId)
        : report;
    return NextResponse.json({
      command: next,
      report: healedReport,
      mode: "demo-rehearsal",
      prUrl: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Command could not advance",
      },
      { status: 409 },
    );
  }
}
