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
import { consumeChallengeProof } from "@/app/api/challenge/route";
import { demoReports } from "@/lib/garden/demo-reports";

export const runtime = "nodejs";

const requestSchema = z.object({
  report: healthReportSchema,
  command: z.union([
    toolCommandSchema,
    z
      .object({
        tool: toolCommandSchema.shape.tool,
        findingId: z.string().min(1),
        nodeId: z.string().min(1),
      })
      .strict(),
  ]),
  commandToken: z.string().min(1).optional(),
  proof: z.string().min(1).optional(),
  action: z.enum(["advance", "fail"]).default("advance"),
});

const COMMAND_TTL_MS = 10 * 60 * 1000;
const MAX_ACTIVE_COMMANDS = 100;
type ActiveCommand = {
  command: z.infer<typeof toolCommandSchema>;
  report: z.infer<typeof healthReportSchema>;
  expiresAt: number;
};
const activeCommands = new Map<string, ActiveCommand>();

const sampleReports = demoReports();

function isSampleReport(report: z.infer<typeof healthReportSchema>) {
  return sampleReports.some(
    (sample) => JSON.stringify(report) === JSON.stringify(sample),
  );
}

function pruneCommands(now = Date.now()) {
  for (const [id, entry] of activeCommands) {
    if (entry.expiresAt <= now) activeCommands.delete(id);
  }
}

function sameCommandIdentity(
  left: z.infer<typeof toolCommandSchema>,
  right: z.infer<typeof toolCommandSchema>,
) {
  return (
    left.id === right.id &&
    left.tool === right.tool &&
    left.findingId === right.findingId &&
    left.nodeId === right.nodeId &&
    left.state === right.state &&
    left.mode === "demo-rehearsal" &&
    left.prUrl === null
  );
}

function toolMatchesFinding(
  report: z.infer<typeof healthReportSchema>,
  command: z.infer<typeof toolCommandSchema>,
) {
  const finding = report.findings.find(({ id }) => id === command.findingId);
  if (!finding || finding.nodeId !== command.nodeId) return false;
  return (
    (finding.type === "dead-code" && command.tool === "clippers") ||
    (finding.type === "coverage-gap" && command.tool === "watering-can") ||
    (finding.type === "vulnerability" && command.tool === "pesticide")
  );
}

export function resetTendRegistry() {
  activeCommands.clear();
}

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
  if (!isSampleReport(report))
    return NextResponse.json(
      { error: "Tending is available only for the offline sample rehearsal" },
      { status: 403 },
    );

  try {
    pruneCommands();
    const input = parsed.data.command;
    let commandToken = parsed.data.commandToken;
    const existing =
      "state" in input && parsed.data.commandToken
        ? activeCommands.get(parsed.data.commandToken)
        : null;
    if ("state" in input) {
      if (!existing)
        throw new Error("Command expired or the server restarted; start again");
      if (!sameCommandIdentity(input, existing.command))
        throw new Error("Command is stale or tried to skip a state");
    } else {
      if (
        !parsed.data.proof ||
        !consumeChallengeProof(
          parsed.data.proof,
          input.findingId,
          report.reportHash,
        )
      )
        throw new Error(
          "A correct learning challenge is required before tending",
        );
      const command = createToolCommand({
        ...input,
        id: `demo-${crypto.randomUUID()}`,
      });
      if (!toolMatchesFinding(report, command))
        throw new Error("The selected tool does not match the report finding");
      if (activeCommands.size >= MAX_ACTIVE_COMMANDS) {
        const oldest = activeCommands.keys().next().value;
        if (oldest) activeCommands.delete(oldest);
      }
      commandToken = `command-${crypto.randomUUID()}`;
      activeCommands.set(commandToken, {
        command,
        report,
        expiresAt: Date.now() + COMMAND_TTL_MS,
      });
    }
    const active = commandToken ? activeCommands.get(commandToken) : undefined;
    if (!active) throw new Error("Command expired; start the rehearsal again");
    const command = active.command;
    const currentReport = active.report;
    const next =
      action === "fail"
        ? failToolCommand(
            command,
            "The rehearsal task failed; garden health was not changed.",
          )
        : advanceToolCommand(command);
    const healedReport =
      next.state === "landed"
        ? reanalyzeDemoReport(currentReport, command.findingId)
        : currentReport;
    if (next.state === "failed" || next.state === "landed")
      activeCommands.delete(commandToken!);
    else {
      active.command = next;
      active.report = healedReport;
      active.expiresAt = Date.now() + COMMAND_TTL_MS;
    }
    return NextResponse.json({
      command: next,
      commandToken,
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
