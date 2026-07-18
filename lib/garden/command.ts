import { z } from "zod";

export const toolSchema = z.enum(["clippers", "watering-can", "pesticide"]);
export const commandStateSchema = z.enum([
  "seen",
  "understood",
  "confirmed",
  "acting",
  "verifying",
  "landed",
  "failed",
]);

export const toolCommandSchema = z.object({
  id: z.string().min(1),
  tool: toolSchema,
  findingId: z.string().min(1),
  nodeId: z.string().min(1),
  state: commandStateSchema,
  mode: z.enum(["demo-rehearsal", "live"]).default("demo-rehearsal"),
  prUrl: z.string().url().nullable().default(null),
  message: z.string().optional(),
});

export type ToolCommand = z.infer<typeof toolCommandSchema>;
export type CommandState = z.infer<typeof commandStateSchema>;

const nextStates: Record<CommandState, CommandState | null> = {
  seen: "understood",
  understood: "confirmed",
  confirmed: "acting",
  acting: "verifying",
  verifying: "landed",
  landed: null,
  failed: null,
};

export function createToolCommand(
  input: Pick<ToolCommand, "id" | "tool" | "findingId" | "nodeId">,
): ToolCommand {
  return toolCommandSchema.parse({
    ...input,
    state: "seen",
    mode: "demo-rehearsal",
    prUrl: null,
  });
}

export function advanceToolCommand(command: ToolCommand): ToolCommand {
  const next = nextStates[command.state];
  if (!next) throw new Error(`Command cannot advance from ${command.state}`);
  if (command.state === "seen")
    return { ...command, state: next, message: "Explanation rendered." };
  if (command.state === "understood")
    return { ...command, state: next, message: "Change scope confirmed." };
  if (command.state === "confirmed")
    return {
      ...command,
      state: next,
      message: "Demo task started on a garden branch.",
    };
  if (command.state === "acting")
    return {
      ...command,
      state: next,
      message: "Checks passed in the rehearsal runner.",
    };
  return {
    ...command,
    state: next,
    message: "Re-analysis verified the finding change in the demo fixture.",
  };
}

export function failToolCommand(
  command: ToolCommand,
  message: string,
): ToolCommand {
  if (command.state === "landed")
    throw new Error("A landed command cannot fail");
  return toolCommandSchema.parse({ ...command, state: "failed", message });
}
