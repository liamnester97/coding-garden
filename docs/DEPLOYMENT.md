# Deployment

Target: **Vercel** (matches the Next.js stack; free tier is sufficient for judging).

## Setup (Stage 1)

1. Create/log in to a Vercel account and import the GitHub repository.
2. Framework preset: Next.js; defaults for build (`npm run build`) and output.
3. Environment variables (Project Settings → Environment Variables):
   - `OPENAI_API_KEY` — optional; without it the app serves the cached sample garden.
   - Any Codex task-dispatch credentials required by the change pipeline (see Execution Plan §6.8) — server-side only, never exposed to the client.
4. Enable preview deployments on every PR; record the preview URL in `STATUS.md`.

## Verification after each deploy

- [ ] `/` renders the garden (sample repo if no key configured).
- [ ] `/api/health` returns OK and reports whether live-AI mode is enabled.
- [ ] Magnifying Glass returns an explanation (canned in offline mode).
- [ ] No secrets appear in client bundles (`grep` the build output for key prefixes).

## Production cut for submission

- Promote a verified preview to production before the final video is recorded, so the video shows the URL the judges will visit.
- Freeze deploys after final verification (Execution Plan §15) except for critical fixes.
