import { beforeEach, describe, expect, it, vi } from "vitest";
import { sampleHealthReport } from "@/lib/analysis/sample-report";

const analyzeMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/analysis/github", () => ({
  analyzePublicGitHubRepository: analyzeMock,
}));

import {
  POST,
  publicAnalysisLimits,
  resetPublicAnalysisGuards,
} from "@/app/api/repository/analyze/route";

function request(url: unknown, ip = "203.0.113.10") {
  return new Request("http://localhost/api/repository/analyze", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ url }),
  });
}

describe("POST /api/repository/analyze", () => {
  beforeEach(() => {
    resetPublicAnalysisGuards();
    analyzeMock.mockReset();
    analyzeMock.mockResolvedValue(sampleHealthReport);
  });

  it("rejects non-string URLs before analysis", async () => {
    const response = await POST(request(42));

    expect(response.status).toBe(400);
    expect(analyzeMock).not.toHaveBeenCalled();
  });

  it("caches normalized repository reports by URL and commit", async () => {
    const first = await POST(request("https://github.com/acme/garden.git"));
    const second = await POST(request("https://github.com/acme/garden.git"));

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    await expect(second.json()).resolves.toMatchObject({ cached: true });
    expect(analyzeMock).toHaveBeenCalledTimes(1);
  });

  it("returns 429 with Retry-After after five uncached requests from one IP", async () => {
    for (let index = 0; index < publicAnalysisLimits.maxRequests; index += 1) {
      const response = await POST(
        request(`https://github.com/acme/garden-${index}`),
      );
      expect(response.status).toBe(200);
    }

    const blocked = await POST(request("https://github.com/acme/garden-final"));

    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toMatch(/^[1-9]\d*$/);
    expect(analyzeMock).toHaveBeenCalledTimes(publicAnalysisLimits.maxRequests);
  });

  it("expires cached reports", async () => {
    vi.useFakeTimers();
    try {
      await POST(request("https://github.com/acme/garden"));
      await vi.advanceTimersByTimeAsync(publicAnalysisLimits.cacheTtlMs + 1);
      await POST(request("https://github.com/acme/garden"));
      expect(analyzeMock).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });
});
