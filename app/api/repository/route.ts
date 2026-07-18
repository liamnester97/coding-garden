import { NextResponse } from "next/server";
import {
  publicGitHubRepositoryFromUrl,
  publicRepositoryRequestSchema,
} from "@/lib/analysis/repository";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = publicRepositoryRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "A public GitHub URL is required" },
      { status: 400 },
    );
  }

  const repository = publicGitHubRepositoryFromUrl(parsed.data.url);
  if (!repository) {
    return NextResponse.json(
      {
        error:
          "Only a public https://github.com/owner/repository URL is supported",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ repository, mode: "public-read-only" });
}
