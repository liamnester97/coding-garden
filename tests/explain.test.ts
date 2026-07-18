import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/explain/route";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { resetExplanationCache } from "@/lib/ai/explain";

afterEach(() => {
  resetExplanationCache();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function request(body: unknown) {
  return new Request("http://localhost/api/explain", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

describe("POST /api/explain", () => {
  it("returns a report-grounded sample explanation", async () => {
    const response = await POST(
      request({ nodeId: "src/unused.ts", report: sampleHealthReport }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      nodeId: "src/unused.ts",
      mode: "sample",
    });
  });

  it("fails safely for malformed or unknown requests", async () => {
    const malformed = await POST(
      new Request("http://localhost/api/explain", {
        method: "POST",
        body: "not-json",
      }),
    );
    const unknown = await POST(
      request({ nodeId: "src/missing.ts", report: sampleHealthReport }),
    );

    expect(malformed.status).toBe(400);
    expect(unknown.status).toBe(404);
  });

  it("uses the deterministic sample explanation when no API key is configured", async () => {
    resetExplanationCache();
    const response = await POST(
      request({ nodeId: "src/health.ts", report: sampleHealthReport }),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ mode: "sample" });
  });

  it("uses the live adapter when a server-side key is configured", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-only-key");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            output_text: JSON.stringify({
              summary: "The module is healthy and has no recorded warnings.",
              health: "Healthy means no warning signal was recorded here.",
              needs: "Keep protecting it with tests as the code changes.",
            }),
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        ),
      ),
    );
    const response = await POST(
      request({ nodeId: "src/health.ts", report: sampleHealthReport }),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      mode: "report",
      summary: "The module is healthy and has no recorded warnings.",
    });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/responses",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("rejects reports that are not schema-valid", async () => {
    const response = await POST(
      request({ nodeId: "src/health.ts", report: { nope: true } }),
    );
    expect(response.status).toBe(400);
  });
});
