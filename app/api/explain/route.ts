import { NextResponse } from "next/server";
import { z } from "zod";
import { healthReportSchema } from "@/lib/analysis/schema";
import {
  explainNodeWithModel,
  explanationLimits,
  getCachedExplanation,
} from "@/lib/ai/explain";

const requestSchema = z.object({
  nodeId: z.string().min(1).max(300),
  report: healthReportSchema,
});

export const runtime = "nodejs";

type RateLimitEntry = { count: number; expiresAt: number };
const rateLimitEntries = new Map<string, RateLimitEntry>();

function clientKey(request: Request): string {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function consumeRateLimit(request: Request, now = Date.now()): number | null {
  for (const [key, entry] of rateLimitEntries) {
    if (entry.expiresAt <= now) rateLimitEntries.delete(key);
  }
  const key = clientKey(request);
  const existing = rateLimitEntries.get(key);
  if (!existing) {
    if (rateLimitEntries.size >= 1_000)
      rateLimitEntries.delete(rateLimitEntries.keys().next().value ?? key);
    rateLimitEntries.set(key, {
      count: 1,
      expiresAt: now + explanationLimits.rateLimitWindowMs,
    });
    return null;
  }
  if (existing.count >= explanationLimits.maxRequestsPerIp)
    return Math.max(1, Math.ceil((existing.expiresAt - now) / 1000));
  existing.count += 1;
  return null;
}

function validReportBudget(report: z.infer<typeof healthReportSchema>) {
  if (
    report.nodes.length > explanationLimits.maxNodes ||
    report.edges.length > explanationLimits.maxEdges ||
    report.findings.length > explanationLimits.maxFindings
  )
    return false;
  return [
    report.repo.name,
    report.repo.ref,
    report.repo.commit,
    ...report.nodes.flatMap((node) => [node.id, node.path]),
    ...report.edges.flatMap((edge) => [edge.from, edge.to]),
    ...report.findings.flatMap((finding) => [
      finding.id,
      finding.nodeId,
      finding.summary,
      finding.evidence.tool,
      finding.evidence.file,
    ]),
  ].every((value) => value.length <= 600);
}

export function resetExplanationGuards() {
  rateLimitEntries.clear();
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > explanationLimits.maxRequestBytes)
      return NextResponse.json(
        { error: "Explanation request is too large" },
        { status: 400 },
      );
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "A valid report and nodeId are required" },
      { status: 400 },
    );

  if (!validReportBudget(parsed.data.report))
    return NextResponse.json(
      { error: "Report exceeds the explanation request limits" },
      { status: 400 },
    );

  const cached = getCachedExplanation(
    parsed.data.report.reportHash,
    parsed.data.nodeId,
  );
  if (cached) return NextResponse.json(cached);

  const retryAfter = consumeRateLimit(request);
  if (retryAfter !== null)
    return NextResponse.json(
      { error: "Too many uncached explanations; try again later" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
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
