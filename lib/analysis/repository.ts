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
