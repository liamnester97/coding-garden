import { writeFile } from "node:fs/promises";
import path from "node:path";
import { analyzeJavaScriptRepository } from "@/lib/analysis/analyze-javascript";

const [rootArg, name = "repository", location = rootArg] =
  process.argv.slice(2);
if (!rootArg)
  throw new Error(
    "Usage: npm run analyze:repo -- /path/to/repository [name] [location]",
  );

async function main() {
  const report = await analyzeJavaScriptRepository(path.resolve(rootArg), {
    id: name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-"),
    name,
    source: "local",
    location,
    language: "javascript",
    ref: "working-tree",
  });

  const outputPath = process.env.HEALTH_REPORT_OUT;
  if (outputPath)
    await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(
    JSON.stringify(
      {
        repository: report.repo,
        nodes: report.nodes.length,
        findings: report.findings.length,
        byType: Object.groupBy(report.findings, (finding) => finding.type),
        reportHash: report.reportHash,
      },
      null,
      2,
    ),
  );
}

void main();
