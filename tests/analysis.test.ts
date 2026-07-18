import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { provisionalTargetRepository } from "@/lib/analysis/repository";
import { analyzeJavaScriptRepository } from "@/lib/analysis/analyze-javascript";
import path from "node:path";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { healthReportSchema } from "@/lib/analysis/schema";

describe("sample HealthReport", () => {
  it("is deterministic and contains the first teaching findings", () => {
    expect(sampleHealthReport.reportHash).toBe("sample-v1");
    expect(sampleHealthReport.findings.map((finding) => finding.type)).toEqual([
      "dead-code",
      "coverage-gap",
    ]);
  });

  it("keeps the live target as a generic repository descriptor", () => {
    expect(provisionalTargetRepository.source).toBe("github");
    expect(provisionalTargetRepository.language).toBe("javascript");
  });

  it("finds deterministic dead-code and estimated-coverage findings without executing the repo", async () => {
    const report = await analyzeJavaScriptRepository(
      path.resolve("fixtures/sample-repo"),
      {
        id: "fixture",
        name: "fixture",
        source: "sample",
        location: "fixtures/sample-repo",
        language: "javascript",
        ref: "fixture",
      },
    );
    expect(
      report.findings.some(
        (finding) =>
          finding.type === "dead-code" && finding.nodeId.endsWith("unused.js"),
      ),
    ).toBe(true);
    expect(report.method.coverage).toBe("estimated");
  });

  it("matches the committed offline evidence fixture", async () => {
    const expected = healthReportSchema.parse(
      JSON.parse(
        await readFile(path.resolve("fixtures/sample-report.json"), "utf8"),
      ),
    );
    const report = await analyzeJavaScriptRepository(
      path.resolve("fixtures/sample-repo"),
      {
        id: "repository",
        name: "repository",
        source: "local",
        location: "fixtures/sample-repo",
        language: "javascript",
        ref: "working-tree",
      },
    );
    expect(report).toEqual(expected);
  });

  it("treats non-import entrypoints as reachable and keeps findings conservative", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "code-garden-analysis-"));
    try {
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify({
          main: "src/main.js",
          bin: { garden: "scripts/cli.js" },
        }),
      );
      await writeFile(
        path.join(root, "index.html"),
        '<script src="src/browser.js"></script>',
      );
      await writeFile(path.join(root, "src-main-placeholder"), "");
      await import("node:fs/promises").then(({ mkdir }) =>
        mkdir(path.join(root, "src"), { recursive: true }),
      );
      await import("node:fs/promises").then(({ mkdir }) =>
        mkdir(path.join(root, "scripts"), { recursive: true }),
      );
      await writeFile(
        path.join(root, "src/main.js"),
        "export const main = true;",
      );
      await writeFile(
        path.join(root, "src/browser.js"),
        "export const browser = true;",
      );
      await writeFile(
        path.join(root, "src/orphan.js"),
        "export const orphan = true;",
      );
      await writeFile(path.join(root, "scripts/cli.js"), "console.log('cli');");
      await writeFile(path.join(root, "vite.config.js"), "export default {};");

      const report = await analyzeJavaScriptRepository(root, {
        id: "calibration",
        name: "calibration",
        source: "local",
        location: root,
        language: "javascript",
        ref: "fixture",
      });
      const dead = report.findings
        .filter((finding) => finding.type === "dead-code")
        .map((finding) => finding.nodeId);
      expect(dead).toEqual(["src/orphan.js"]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
