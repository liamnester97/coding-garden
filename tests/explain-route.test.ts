import { beforeEach, describe, expect, it } from "vitest";
import { POST, resetExplanationGuards } from "@/app/api/explain/route";
import { resetExplanationCache } from "@/lib/ai/explain";
import { sampleHealthReport } from "@/lib/analysis/sample-report";

function request(body: unknown, ip = "198.51.100.20") {
  return new Request("http://localhost/api/explain", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/explain", () => {
  beforeEach(() => {
    resetExplanationGuards();
    resetExplanationCache();
  });

  it("rejects reports outside the explanation budget", async () => {
    const oversizedReport = {
      ...sampleHealthReport,
      nodes: Array.from({ length: 201 }, (_, index) => ({
        id: `node-${index}`,
        path: `src/node-${index}.js`,
        health: "healthy" as const,
      })),
    };

    const response = await POST(
      request({ nodeId: "node-0", report: oversizedReport }),
    );

    expect(response.status).toBe(400);
  });

  it("rate-limits uncached explanation requests", async () => {
    for (let index = 0; index < 30; index += 1) {
      const response = await POST(
        request({
          nodeId: "src/unused.ts",
          report: {
            ...sampleHealthReport,
            reportHash: `hash-${index}`,
            repo: { ...sampleHealthReport.repo, name: `sample-${index}` },
          },
        }),
      );
      expect(response.status).toBe(200);
    }

    const blocked = await POST(
      request({
        nodeId: "src/unused.ts",
        report: { ...sampleHealthReport, reportHash: "hash-blocked" },
      }),
    );

    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toMatch(/^[1-9]\d*$/);
  });

  it("serves a cached explanation without consuming the limit", async () => {
    const body = {
      nodeId: "src/unused.ts",
      report: sampleHealthReport,
    };
    expect((await POST(request(body))).status).toBe(200);
    for (let index = 0; index < 30; index += 1) {
      await POST(
        request({
          nodeId: "src/unused.ts",
          report: {
            ...sampleHealthReport,
            reportHash: `other-${index}`,
            repo: { ...sampleHealthReport.repo, name: `other-${index}` },
          },
        }),
      );
    }
    expect((await POST(request(body))).status).toBe(200);
  });

  it("does not reuse an explanation for a different report with the same hash", async () => {
    const first = await POST(
      request({ nodeId: "src/unused.ts", report: sampleHealthReport }),
    );
    expect(first.status).toBe(200);

    const differentReport = {
      ...sampleHealthReport,
      repo: { ...sampleHealthReport.repo, name: "different-report" },
    };
    const second = await POST(
      request({ nodeId: "src/unused.ts", report: differentReport }),
    );
    expect(second.status).toBe(200);
  });

  it("rejects a valid report when the requested node is absent", async () => {
    const response = await POST(
      request({ nodeId: "src/missing.ts", report: sampleHealthReport }),
    );
    expect(response.status).toBe(404);
  });
});
