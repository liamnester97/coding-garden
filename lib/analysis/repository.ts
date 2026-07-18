import { z } from "zod";

export const repositoryDescriptorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  source: z.enum(["github", "local", "sample"]),
  location: z.string().min(1),
  language: z.enum(["javascript", "typescript", "unknown"]),
  ref: z.string().min(1),
});

export type RepositoryDescriptor = z.infer<typeof repositoryDescriptorSchema>;

export const publicRepositoryRequestSchema = z.object({
  url: z.string().url(),
});

/** Accept only public GitHub repository URLs; fetching and analysis happen elsewhere. */
export function publicGitHubRepositoryFromUrl(
  input: string,
): RepositoryDescriptor | null {
  const parsed = publicRepositoryRequestSchema.safeParse({ url: input.trim() });
  if (!parsed.success) return null;

  let url: URL;
  try {
    url = new URL(parsed.data.url);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" || url.hostname !== "github.com") return null;

  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length !== 2) return null;

  const [owner, rawRepo] = segments;
  const repo = rawRepo.replace(/\.git$/, "");
  if (!owner || !repo || url.search || url.hash) return null;

  return repositoryDescriptorSchema.parse({
    id: `${owner}/${repo}`,
    name: repo,
    source: "github",
    location: `https://github.com/${owner}/${repo}`,
    language: "unknown",
    ref: "default",
  });
}

/** The first live target; the analyzer accepts any descriptor matching this shape. */
export const provisionalTargetRepository = repositoryDescriptorSchema.parse({
  id: "colorlibhq/gentelella",
  name: "Gentelella",
  source: "github",
  location: "https://github.com/ColorlibHQ/gentelella",
  language: "javascript",
  ref: "master",
});

export const fallbackRepository = repositoryDescriptorSchema.parse({
  id: "dumberjs/dumber",
  name: "dumber",
  source: "github",
  location: "https://github.com/dumberjs/dumber",
  language: "javascript",
  ref: "master",
});
