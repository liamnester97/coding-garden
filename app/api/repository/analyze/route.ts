import { NextResponse } from "next/server";
import { analyzePublicGitHubRepository } from "@/lib/analysis/github";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("url" in body))
    return NextResponse.json(
      { error: "A public GitHub URL is required" },
      { status: 400 },
    );

  try {
    const report = await analyzePublicGitHubRepository(String(body.url));
    return NextResponse.json({ mode: "public-read-only", report });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Repository analysis failed";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
