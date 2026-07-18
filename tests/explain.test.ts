import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/explain/route";

describe("POST /api/explain", () => {
  it("returns a report-grounded sample explanation", async () => {
    const response = await POST(
      new Request("http://localhost/api/explain", {
        method: "POST",
        body: JSON.stringify({ nodeId: "src/unused.ts" }),
        headers: { "content-type": "application/json" },
      }),
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
      new Request("http://localhost/api/explain", {
        method: "POST",
        body: JSON.stringify({ nodeId: "src/missing.ts" }),
      }),
    );

    expect(malformed.status).toBe(400);
    expect(unknown.status).toBe(404);
  });
});
