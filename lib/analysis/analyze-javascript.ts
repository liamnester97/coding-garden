import { readFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import {
  repositoryDescriptorSchema,
  type RepositoryDescriptor,
} from "./repository";
import { healthReportSchema, type HealthReport } from "./schema";

const SOURCE_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
]);
const TEXT_EXTENSIONS = new Set([".html", ".json", ...SOURCE_EXTENSIONS]);
const IGNORED_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".next",
]);
const IMPORT_RE =
  /(?:import\s+(?:[^"']+\s+from\s+)?|export\s+[^"']+\s+from\s+|require\s*\(\s*|import\s*\(\s*)(["'])(.+?)\1/g;
const TEST_RE = /(^|[./_-])(test|spec)([./_-]|$)/i;

type FileRecord = { relativePath: string; source: string };

function isSourceFile(file: string): boolean {
  return SOURCE_EXTENSIONS.has(path.extname(file));
}

async function collectFiles(
  root: string,
  directory = root,
): Promise<FileRecord[]> {
  let entries;
  try {
    entries = await (
      await import("node:fs/promises")
    ).readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT")
      return [];
    throw error;
  }
  const records: FileRecord[] = [];
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory())
      records.push(...(await collectFiles(root, absolutePath)));
    if (entry.isFile() && TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      records.push({
        relativePath: path
          .relative(root, absolutePath)
          .split(path.sep)
          .join("/"),
        source: await readFile(absolutePath, "utf8"),
      });
    }
  }
  return records.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

function resolveImport(
  from: string,
  specifier: string,
  files: Set<string>,
): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  const base = path.posix.normalize(
    path.posix.join(path.posix.dirname(from), specifier),
  );
  for (const candidate of [
    base,
    ...Array.from(SOURCE_EXTENSIONS, (extension) => `${base}${extension}`),
    ...Array.from(
      SOURCE_EXTENSIONS,
      (extension) => `${base}/index${extension}`,
    ),
  ]) {
    if (files.has(candidate)) return candidate;
  }
  return undefined;
}

function stableId(type: string, file: string): string {
  return createHash("sha256")
    .update(`${type}:${file}`)
    .digest("hex")
    .slice(0, 12);
}

function isEntryPoint(file: string, records: FileRecord[]): boolean {
  const basename = path.posix.basename(file).toLowerCase();
  if (/^(index|main|app|server)\.[^.]+$/.test(basename)) return true;
  if (
    /(^|\/)(scripts|bin)\//.test(file) ||
    /(^|\/)(sw|service-worker|worker)\.[^.]+$/.test(file)
  )
    return true;
  if (
    /(^|\/)(eslint|next|nuxt|vite|webpack|rollup|vitest|jest|babel|postcss|tailwind|tsup)\.config\.[^.]+$/.test(
      basename,
    ) ||
    /(^|\/)(\.eslintrc|\.prettierrc|\.babelrc)(\.[^.]+)?$/.test(basename)
  )
    return true;

  const packageEntrypoints = records
    .filter(
      ({ relativePath }) =>
        path.posix.basename(relativePath) === "package.json",
    )
    .flatMap(({ source }) => {
      try {
        const packageJson = JSON.parse(source) as {
          main?: unknown;
          browser?: unknown;
          bin?: unknown;
          scripts?: unknown;
        };
        const values = [packageJson.main, packageJson.browser];
        if (typeof packageJson.bin === "string") values.push(packageJson.bin);
        if (packageJson.bin && typeof packageJson.bin === "object")
          values.push(...Object.values(packageJson.bin));
        return values.filter(
          (value): value is string => typeof value === "string",
        );
      } catch {
        return [];
      }
    });
  if (packageEntrypoints.some((entry) => path.posix.normalize(entry) === file))
    return true;

  return records.some(
    ({ relativePath, source }) =>
      relativePath.endsWith(".html") &&
      new RegExp(
        `(?:src|href)=["'][^"']*${file.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}["']`,
      ).test(source),
  );
}

export async function analyzeJavaScriptRepository(
  root: string,
  descriptor: RepositoryDescriptor,
): Promise<HealthReport> {
  const repository = repositoryDescriptorSchema.parse(descriptor);
  const records = await collectFiles(root);
  const files = new Set(records.map(({ relativePath }) => relativePath));
  const incoming = new Map(
    records.map(({ relativePath }) => [relativePath, 0]),
  );
  const edges: Array<{ from: string; to: string }> = [];

  for (const record of records) {
    for (const match of record.source.matchAll(IMPORT_RE)) {
      const resolved = resolveImport(record.relativePath, match[2], files);
      if (!resolved) continue;
      incoming.set(resolved, (incoming.get(resolved) ?? 0) + 1);
      edges.push({ from: record.relativePath, to: resolved });
    }
  }

  const sourceRecords = records.filter(
    ({ relativePath }) =>
      isSourceFile(relativePath) && !TEST_RE.test(relativePath),
  );
  const testPaths = new Set(
    records
      .filter(({ relativePath }) => TEST_RE.test(relativePath))
      .map(({ relativePath }) => relativePath),
  );
  const findings: HealthReport["findings"] = [];
  const nodes = sourceRecords.map(({ relativePath, source }) => {
    const dead =
      !isEntryPoint(relativePath, records) &&
      (incoming.get(relativePath) ?? 0) === 0;
    const hasMatchingTest = [...testPaths].some((testPath) =>
      path.posix
        .basename(testPath)
        .toLowerCase()
        .includes(
          path.posix
            .basename(relativePath, path.extname(relativePath))
            .toLowerCase(),
        ),
    );
    const complexity =
      (source.match(/\b(if|for|while|case|catch)\b|&&|\|\|/g) ?? []).length + 1;
    if (dead)
      findings.push({
        id: stableId("dead-code", relativePath),
        type: "dead-code",
        nodeId: relativePath,
        summary: "No incoming relative import was found for this file.",
        evidence: { tool: "import-graph", file: relativePath },
      });
    if (!hasMatchingTest)
      findings.push({
        id: stableId("coverage-gap", relativePath),
        type: "coverage-gap",
        nodeId: relativePath,
        summary: "No matching test file was found; coverage is estimated.",
        evidence: { tool: "test-file-mapping", file: relativePath },
      });
    if (complexity >= 8)
      findings.push({
        id: stableId("complexity", relativePath),
        type: "complexity",
        nodeId: relativePath,
        summary: "This file has a high branching-syntax count.",
        evidence: {
          tool: "branch-count",
          file: relativePath,
          metric: complexity,
        },
      });
    const health =
      dead || complexity >= 8
        ? "withered"
        : !hasMatchingTest
          ? "stressed"
          : "healthy";
    return { id: relativePath, path: relativePath, health } as const;
  });

  return healthReportSchema.parse({
    reportHash: createHash("sha256")
      .update(JSON.stringify({ repository, nodes, findings, edges }))
      .digest("hex")
      .slice(0, 16),
    repo: {
      name: repository.name,
      ref: repository.ref,
      commit: repository.ref,
    },
    method: {
      deadCode: "estimated",
      coverage: "estimated",
      complexity: "estimated",
      vulnerabilities: "unavailable",
    },
    nodes,
    edges,
    findings,
  });
}
