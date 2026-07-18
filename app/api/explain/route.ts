import { NextResponse } from "next/server";
import { z } from "zod";
import { healthReportSchema } from "@/lib/analysis/schema";
import { explainNodeWithModel } from "@/lib/ai/explain";

const requestSchema = z.object({
  nodeId: z.string().min(1).max(300),
  report: healthReportSchema,
});

export const runtime = "nodejs";

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
      { error: "A valid report and nodeId are required" },
      { status: 400 },
    );

  const explanation = await explainNodeWithModel(
    parsed.data.report,
    parsed.data.nodeId,
  );
  if (!explanation) {
    return NextResponse.json({ error: "Plant not found" }, { status: 404 });
  }

  return NextResponse.json(explanation);
}
