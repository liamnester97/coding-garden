import { describe, expect, it, vi } from "vitest";
import {
  analyzePublicGitHubRepository,
  githubAnalysisLimits,
} from "@/lib/analysis/github";

function response(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("bounded public GitHub analysis", () => {
  it("resolves a branch, fetches only supported files, and analyzes without execution", async () => {
    const fetcher = vi.fn(async (input: string) => {
      if (input.includes("/git/trees/"))
        return response({
          sha: "abc123",
          truncated: false,
          tree: [
            { path: "package.json", type: "blob", size: 30 },
            { path: "src/main.js", type: "blob", size: 40 },
            { path: "README.md", type: "blob", size: 20 },
          ],
        });
      if (input.endsWith("/repos/acme/garden"))
        return response({ default_branch: "main" });
      if (input.endsWith("/package.json"))
        return response('{"main":"src/main.js"}');
      return response("export const main = true;");
    });

    const report = await analyzePublicGitHubRepository(
      "https://github.com/acme/garden",
      fetcher,
    );
    expect(report.repo).toEqual({
      name: "garden",
      ref: "abc123",
      commit: "abc123",
    });
    expect(report.nodes).toEqual([
      { id: "src/main.js", path: "src/main.js", health: "stressed" },
    ]);
    expect(fetcher).toHaveBeenCalledTimes(4);
  });

  it("rejects a truncated tree before downloading files", async () => {
    const fetcher = vi.fn(async (input: string) =>
      input.includes("/git/trees/")
        ? response({ sha: "abc123", truncated: true, tree: [] })
        : response({ default_branch: "main" }),
    );
    await expect(
      analyzePublicGitHubRepository("https://github.com/acme/garden", fetcher),
    ).rejects.toThrow("too large");
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("keeps hosted intake bounded", () => {
    expect(githubAnalysisLimits).toEqual({
      maxFiles: 120,
      maxFileBytes: 256_000,
      maxTotalBytes: 2_000_000,
    });
  });
});
