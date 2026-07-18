import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/repository/route";

describe("POST /api/repository", () => {
  it("returns a normalized public repository descriptor", async () => {
    const response = await POST(
      new Request("http://localhost/api/repository", {
        method: "POST",
        body: JSON.stringify({
          url: "https://github.com/ColorlibHQ/gentelella",
        }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      mode: "public-read-only",
      repository: { id: "ColorlibHQ/gentelella" },
    });
  });

  it("rejects non-GitHub and malformed input", async () => {
    const response = await POST(
      new Request("http://localhost/api/repository", {
        method: "POST",
        body: JSON.stringify({ url: "https://gitlab.com/example/project" }),
      }),
    );

    expect(response.status).toBe(400);
  });
});
