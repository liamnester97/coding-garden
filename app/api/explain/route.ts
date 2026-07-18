import { NextResponse } from "next/server";
import { z } from "zod";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { explainNode } from "@/lib/ai/explain";

const requestSchema = z.object({ nodeId: z.string().min(1) });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "nodeId is required" }, { status: 400 });
  }

  const explanation = explainNode(sampleHealthReport, parsed.data.nodeId);
  if (!explanation) {
    return NextResponse.json({ error: "Plant not found" }, { status: 404 });
  }

  return NextResponse.json(explanation);
}
