import { z } from "zod";
import { createHash } from "node:crypto";
import type { HealthReport } from "@/lib/analysis/schema";
import { explainNode, type GardenExplanation } from "@/lib/garden/explanation";

export { explainNode, type GardenExplanation } from "@/lib/garden/explanation";

const modelExplanationSchema = z.object({
  summary: z.string().min(1).max(600),
  health: z.string().min(1).max(600),
  needs: z.string().min(1).max(600),
});

const MODEL = "gpt-5.6";
const REQUEST_TIMEOUT_MS = 8_000;
const MAX_CACHE_ENTRIES = 100;
const explanationCache = new Map<
  string,
  { explanation: GardenExplanation; expiresAt: number }
>();
const CACHE_TTL_MS = 5 * 60 * 1000;

export const explanationLimits = {
  cacheTtlMs: CACHE_TTL_MS,
  maxCacheEntries: MAX_CACHE_ENTRIES,
  requestTimeoutMs: REQUEST_TIMEOUT_MS,
  maxRequestsPerIp: 30,
  rateLimitWindowMs: 10 * 60 * 1000,
  maxRequestBytes: 256_000,
  maxNodes: 200,
  maxEdges: 500,
  maxFindings: 500,
};

export const explanationSystemPrompt = `You explain a static-analysis report to a non-coder. Use only the supplied report context. Never claim a finding, metric, dependency, behavior, or source fact that is not present in the context. Preserve uncertainty such as possibly unused and estimated coverage. Explain jargon briefly. Return JSON with exactly three string fields: summary, health, needs.`;

function canonicalValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, canonicalValue(entry)]),
    );
  }
  return value;
}

/** Derive cache identity from validated report content, never client metadata. */
export function reportCacheIdentity(report: HealthReport) {
  const { reportHash: _clientHash, ...content } = report;
  return createHash("sha256")
    .update(JSON.stringify(canonicalValue(content)))
    .digest("hex")
    .slice(0, 32);
}

function contextFor(report: HealthReport, nodeId: string) {
  const node = report.nodes.find((candidate) => candidate.id === nodeId);
  if (!node) return null;
  return {
    repository: report.repo.name,
    reportHash: report.reportHash,
    node,
    findings: report.findings.filter((finding) => finding.nodeId === nodeId),
    imports: report.edges.filter(
      (edge) => edge.from === nodeId || edge.to === nodeId,
    ),
    scope: report.scope,
    methods: report.method,
  };
}

function extractResponseText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const response = payload as { output_text?: unknown; output?: unknown };
  if (typeof response.output_text === "string") return response.output_text;
  if (!Array.isArray(response.output)) return null;
  for (const item of response.output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (
        part &&
        typeof part === "object" &&
        typeof (part as { text?: unknown }).text === "string"
      )
        return (part as { text: string }).text;
    }
  }
  return null;
}

function parseModelJson(text: string) {
  const cleaned = text.replace(/^```json\s*|\s*```$/g, "").trim();
  return modelExplanationSchema.safeParse(JSON.parse(cleaned));
}

async function liveExplanation(
  report: HealthReport,
  nodeId: string,
): Promise<GardenExplanation | null> {
  const context = contextFor(report, nodeId);
  if (!context) return null;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey)
    return explainNode(
      report,
      nodeId,
      report.repo.commit === "offline-sample" ? "sample" : "fallback",
    );

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        input: [
          { role: "system", content: explanationSystemPrompt },
          {
            role: "user",
            content: `Explain this report context:\n${JSON.stringify(context)}`,
          },
        ],
        max_output_tokens: 500,
      }),
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(`OpenAI explanation failed (${response.status})`);
    const text = extractResponseText(await response.json());
    if (!text) throw new Error("OpenAI returned no explanation");
    const parsed = parseModelJson(text);
    if (!parsed.success)
      throw new Error("OpenAI returned invalid explanation JSON");
    const base = explainNode(report, nodeId, "report");
    if (!base) return null;
    return { ...base, ...parsed.data, mode: "report" };
  } catch {
    return explainNode(report, nodeId, "fallback");
  } finally {
    clearTimeout(timeout);
  }
}

export async function explainNodeWithModel(
  report: HealthReport,
  nodeId: string,
  now = Date.now(),
): Promise<GardenExplanation | null> {
  const cacheIdentity = reportCacheIdentity(report);
  const cached = getCachedExplanation(cacheIdentity, nodeId, now);
  if (cached) return cached;
  const key = `${cacheIdentity}:${nodeId}`;
  const explanation = await liveExplanation(report, nodeId);
  if (!explanation) return null;
  if (explanationCache.size >= MAX_CACHE_ENTRIES && !explanationCache.has(key))
    explanationCache.delete(explanationCache.keys().next().value as string);
  explanationCache.set(key, { explanation, expiresAt: now + CACHE_TTL_MS });
  return explanation;
}

export function getCachedExplanation(
  reportIdentity: string,
  nodeId: string,
  now = Date.now(),
): GardenExplanation | null {
  for (const [key, entry] of explanationCache) {
    if (entry.expiresAt <= now) explanationCache.delete(key);
  }
  return (
    explanationCache.get(`${reportIdentity}:${nodeId}`)?.explanation ?? null
  );
}

export function resetExplanationCache() {
  explanationCache.clear();
}
