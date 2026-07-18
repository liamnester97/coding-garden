import { NextResponse } from "next/server";
import { analyzePublicGitHubRepository } from "@/lib/analysis/github";
import {
  publicGitHubRepositoryFromUrl,
  publicRepositoryRequestSchema,
} from "@/lib/analysis/repository";
import type { HealthReport } from "@/lib/analysis/schema";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_RATE_LIMIT_ENTRIES = 1_000;
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_ENTRIES = 100;

type RateLimitEntry = { count: number; expiresAt: number };
type CachedReport = { key: string; report: HealthReport; expiresAt: number };

const rateLimitEntries = new Map<string, RateLimitEntry>();
const analysisCache = new Map<string, CachedReport>();

function pruneExpired<T extends { expiresAt: number }>(
  entries: Map<string, T>,
  now: number,
) {
  for (const [key, entry] of entries) {
    if (entry.expiresAt <= now) entries.delete(key);
  }
}

function clientKey(request: Request): string {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function consumeRateLimit(request: Request, now = Date.now()): number | null {
  pruneExpired(rateLimitEntries, now);
  const key = clientKey(request);
  const existing = rateLimitEntries.get(key);
  if (!existing) {
    if (rateLimitEntries.size >= MAX_RATE_LIMIT_ENTRIES) {
      const oldestKey = rateLimitEntries.keys().next().value;
      if (oldestKey) rateLimitEntries.delete(oldestKey);
    }
    rateLimitEntries.set(key, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return null;
  }
  if (existing.count >= RATE_LIMIT_MAX)
    return Math.max(1, Math.ceil((existing.expiresAt - now) / 1000));
  existing.count += 1;
  return null;
}

function getCachedReport(
  repositoryUrl: string,
  now = Date.now(),
): CachedReport | null {
  const cached = analysisCache.get(repositoryUrl);
  if (!cached) return null;
  if (cached.expiresAt <= now) {
    analysisCache.delete(repositoryUrl);
    return null;
  }
  return cached;
}

function cacheReport(
  repositoryUrl: string,
  report: HealthReport,
  now = Date.now(),
) {
  pruneExpired(analysisCache, now);
  if (
    analysisCache.size >= MAX_CACHE_ENTRIES &&
    !analysisCache.has(repositoryUrl)
  ) {
    const oldestKey = analysisCache.keys().next().value;
    if (oldestKey) analysisCache.delete(oldestKey);
  }
  analysisCache.set(repositoryUrl, {
    key: `${repositoryUrl}@${report.repo.commit}`,
    report,
    expiresAt: now + CACHE_TTL_MS,
  });
}

/** Test-only reset hook; it has no effect on the public API surface. */
export function resetPublicAnalysisGuards() {
  rateLimitEntries.clear();
  analysisCache.clear();
}

export const publicAnalysisLimits = {
  cacheTtlMs: CACHE_TTL_MS,
  maxCacheEntries: MAX_CACHE_ENTRIES,
  maxRequests: RATE_LIMIT_MAX,
  rateLimitWindowMs: RATE_LIMIT_WINDOW_MS,
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = publicRepositoryRequestSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "A public GitHub URL is required" },
      { status: 400 },
    );

  const repository = publicGitHubRepositoryFromUrl(parsed.data.url);
  if (!repository)
    return NextResponse.json(
      {
        error:
          "Only a public https://github.com/owner/repository URL is supported",
      },
      { status: 400 },
    );

  const cached = getCachedReport(repository.location);
  if (cached)
    return NextResponse.json({
      mode: "public-read-only",
      report: cached.report,
      cached: true,
    });

  const retryAfter = consumeRateLimit(request);
  if (retryAfter !== null)
    return NextResponse.json(
      { error: "Too many repository analyses; try again later" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );

  try {
    const report = await analyzePublicGitHubRepository(repository.location);
    cacheReport(repository.location, report);
    return NextResponse.json({ mode: "public-read-only", report });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Repository analysis failed";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
