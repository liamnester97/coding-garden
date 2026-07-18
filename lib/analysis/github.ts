import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { analyzeJavaScriptRepository } from "./analyze-javascript";
import {
  publicGitHubRepositoryFromUrl,
  type RepositoryDescriptor,
} from "./repository";
import type { HealthReport } from "./schema";

const API_ROOT = "https://api.github.com";
const RAW_ROOT = "https://raw.githubusercontent.com";
const MAX_FILES = 120;
const MAX_FILE_BYTES = 256_000;
const MAX_TOTAL_BYTES = 2_000_000;
const FETCH_TIMEOUT_MS = 10_000;
const TEXT_EXTENSIONS = new Set([
  ".cjs",
  ".html",
  ".json",
  ".js",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
]);

type GitHubResponse = {
  ok: boolean;
  status: number;
  headers: Headers;
  json(): Promise<unknown>;
  text(): Promise<string>;
};

type GitHubFetcher = (
  input: string,
  init?: RequestInit,
) => Promise<GitHubResponse>;

type RepositoryInfo = { default_branch?: unknown };
type TreeEntry = { path?: unknown; type?: unknown; size?: unknown };
type RepositoryTree = { sha?: unknown; truncated?: unknown; tree?: unknown };

export type ResolvedGitHubRepository = {
  descriptor: RepositoryDescriptor;
  owner: string;
  repo: string;
  sha: string;
  entries: TreeEntry[];
};

function headers(): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "code-garden-read-only-analyzer",
  };
}

async function readJson<T>(
  response: GitHubResponse,
  label: string,
): Promise<T> {
  if (!response.ok)
    throw new Error(`${label} failed with HTTP ${response.status}`);
  return (await response.json()) as T;
}

async function fetchWithTimeout(
  fetcher: GitHubFetcher,
  input: string,
  init: RequestInit,
): Promise<GitHubResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetcher(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (controller.signal.aborted)
      throw new Error("GitHub request timed out", { cause: error });
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function supportedPath(filePath: string): boolean {
  return TEXT_EXTENSIONS.has(path.posix.extname(filePath).toLowerCase());
}

function safeRelativePath(filePath: string): string | null {
  const normalized = path.posix.normalize(filePath);
  if (!filePath || normalized.startsWith("../") || normalized.includes("/../"))
    return null;
  return normalized.replace(/^\.\//, "");
}

/**
 * Fetch and analyze a public GitHub repository without cloning, installing, or executing it.
 * The bounded file set is intentionally conservative for hosted/serverless use.
 */
export async function analyzePublicGitHubRepository(
  input: string,
  fetcher: GitHubFetcher = fetch as unknown as GitHubFetcher,
  resolved?: ResolvedGitHubRepository,
): Promise<HealthReport> {
  const resolution =
    resolved ?? (await resolvePublicGitHubRepository(input, fetcher));
  const { descriptor, owner, repo, sha, entries } = resolution;
  if (descriptor.location !== input)
    throw new Error("Resolved repository does not match the requested URL");

  const candidateFiles = entries
    .filter((entry) => entry.type === "blob")
    .map((entry) => ({
      path:
        typeof entry.path === "string" ? safeRelativePath(entry.path) : null,
      size: entry.size,
    }))
    .filter(
      (entry): entry is { path: string; size: unknown } =>
        typeof entry.path === "string",
    )
    .filter((entry) => supportedPath(entry.path));
  const supportedFiles = candidateFiles
    .filter(
      (entry) => typeof entry.size !== "number" || entry.size <= MAX_FILE_BYTES,
    )
    .sort((a, b) => a.path.localeCompare(b.path));
  const files = supportedFiles.slice(0, MAX_FILES);
  const omittedFiles = candidateFiles.length - files.length;
  if (files.length === 0)
    throw new Error("No supported JavaScript or text files were found");

  const root = await mkdtemp(path.join(os.tmpdir(), "code-garden-github-"));
  let totalBytes = 0;
  try {
    for (const entry of entries) {
      if (entry.type !== "tree" || typeof entry.path !== "string") continue;
      const directory = safeRelativePath(entry.path);
      if (directory)
        await mkdir(path.join(root, directory), { recursive: true });
    }
    for (const file of files) {
      const response = await fetchWithTimeout(
        fetcher,
        `${RAW_ROOT}/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(sha)}/${file.path.split("/").map(encodeURIComponent).join("/")}`,
        { headers: { "User-Agent": "code-garden-read-only-analyzer" } },
      );
      if (!response.ok)
        throw new Error(
          `GitHub file fetch failed with HTTP ${response.status}`,
        );
      const source = await response.text();
      const bytes = Buffer.byteLength(source, "utf8");
      if (bytes > MAX_FILE_BYTES || totalBytes + bytes > MAX_TOTAL_BYTES)
        throw new Error("GitHub repository exceeds the bounded analysis size");
      totalBytes += bytes;
      const destination = path.join(root, file.path);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, source, "utf8");
    }

    const repository: RepositoryDescriptor = {
      ...descriptor,
      ref: sha,
      language: "javascript",
    };
    const report = await analyzeJavaScriptRepository(root, repository, {
      kind: omittedFiles > 0 ? "bounded" : "complete",
      supportedFiles: candidateFiles.length,
      omittedFiles,
    });
    return report;
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

export async function resolvePublicGitHubRepository(
  input: string,
  fetcher: GitHubFetcher = fetch as unknown as GitHubFetcher,
): Promise<ResolvedGitHubRepository> {
  const descriptor = publicGitHubRepositoryFromUrl(input);
  if (!descriptor) throw new Error("Only a public GitHub URL can be analyzed");

  const [owner, repo] = descriptor.id.split("/");
  const info = await readJson<RepositoryInfo>(
    await fetchWithTimeout(
      fetcher,
      `${API_ROOT}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
      { headers: headers() },
    ),
    "GitHub repository metadata",
  );
  const branch =
    typeof info.default_branch === "string" ? info.default_branch : null;
  if (!branch) throw new Error("GitHub did not provide a default branch");

  const tree = await readJson<RepositoryTree>(
    await fetchWithTimeout(
      fetcher,
      `${API_ROOT}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(branch)}?recursive=1`,
      { headers: headers() },
    ),
    "GitHub repository tree",
  );
  const sha = typeof tree.sha === "string" ? tree.sha : null;
  const entries = Array.isArray(tree.tree) ? (tree.tree as TreeEntry[]) : [];
  if (!sha || tree.truncated === true)
    throw new Error("GitHub repository is too large for the bounded analysis");

  return { descriptor, owner, repo, sha, entries };
}

export const githubAnalysisLimits = {
  maxFiles: MAX_FILES,
  maxFileBytes: MAX_FILE_BYTES,
  maxTotalBytes: MAX_TOTAL_BYTES,
  fetchTimeoutMs: FETCH_TIMEOUT_MS,
};
