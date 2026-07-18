# Deployment

Target: **Vercel** (matches the Next.js stack; free tier is sufficient for judging).

## Setup (Stage 1)

1. Create/log in to a Vercel Hobby account and import the GitHub repository. The hosted app is the
   standalone public release; it must not depend on Liam's local machine.
2. Framework preset: Next.js; defaults for build (`npm run build`) and output.
3. Environment variables (Project Settings → Environment Variables):
   - `OPENAI_API_KEY` — optional; without it the app serves the cached sample garden.
   - Any Codex task-dispatch credentials required by the change pipeline (see Execution Plan §6.8) — server-side only, never exposed to the client.
4. Public analysis is best-effort protected without a new service: five uncached analyses per
   client IP per ten minutes, five-minute in-memory report caching, and ten-second GitHub request
   timeouts. Vercel instances may enforce these limits independently.
5. Bounded reports disclose analyzed versus omitted supported files in the UI. The existing limits
   remain 120 files, 256 KB per file, and 2 MB total.
6. Keep the first public release login-free for public GitHub repositories. Private repository
   access is not enabled by a pasted URL; it requires a later least-privilege GitHub OAuth/App flow.
7. Enable preview deployments on every PR; record the preview URL in `PROJECT_STATUS.md`.

## Verification after each deploy

- [x] `/` renders the garden (sample repo if no key configured).
- [x] `/api/health` returns OK and reports whether live-AI mode is enabled.
- [x] Magnifying Glass returns an explanation (canned in offline mode).
- [x] `/api/repository` accepts a normalized public GitHub URL without requiring login.
- [ ] No secrets appear in client bundles (`grep` the build output for key prefixes).

## Production cut for submission

- Promote a verified preview to production before the final video is recorded, so the video shows the URL the judges will visit.
- Freeze deploys after final verification (Execution Plan §15) except for critical fixes.
