# Deployment

For the complete step-by-step deployment and human-testing flow, see
[HOW_TO_DEPLOY_AND_HUMAN_TEST.md](HOW_TO_DEPLOY_AND_HUMAN_TEST.md).

Target: **Vercel** (matches the Next.js stack; free tier is sufficient for judging).

## Setup (Stage 1)

1. Create/log in to a Vercel Hobby account and import the GitHub repository. The hosted app is the
   standalone public release; it must not depend on Liam's local machine.
2. Framework preset: Next.js; defaults for build (`npm run build`) and output.
3. Environment variables (Project Settings → Environment Variables):
   - `OPENAI_API_KEY` — optional; without it the app still supports public read-only analysis and
     serves deterministic explanations, with the cached sample garden as the no-network fallback.
   - Any Codex task-dispatch credentials required by the change pipeline (see Execution Plan §6.8) — server-side only, never exposed to the client.
4. Public analysis is best-effort protected without a new service: five requests per client IP per
   ten minutes, five-minute in-memory report caching keyed by normalized URL plus resolved commit,
   and ten-second GitHub request timeouts. Vercel instances may enforce these limits independently.
5. Bounded reports disclose analyzed versus omitted supported files in the UI. The existing limits
   remain 120 files, 256 KB per file, and 2 MB total.
6. Keep the first public release login-free for public GitHub repositories. Private repository
   access is not enabled by a pasted URL; it requires a later least-privilege GitHub OAuth/App flow.
7. Enable preview deployments on every PR; the verified preview for commit `3fb549f` is recorded in
   `PROJECT_STATUS.md`.
8. The Magnifying Glass explanation route accepts the validated report currently being viewed. With
   `OPENAI_API_KEY`, GPT-5.6 is called server-side with an eight-second timeout and a five-minute
   report/node cache. Requests are bounded and uncached calls are best-effort limited to 30 per IP
   per ten minutes. Without the key, or if the model fails validation, the deterministic grounded
   explanation remains the release fallback.
9. Public GitHub reports are strictly read-only. Clippers, Watering Can, and Pesticide are demo
   rehearsals against the bundled sample only, with an explicit confirmation card and an
   in-memory server-authoritative lifecycle. A restart may expire an in-progress rehearsal.

## Verification after each deploy

- [x] `/` renders the garden (sample repo if no key configured).
- [x] `/api/health` returns OK and reports whether live-AI mode is enabled.
- [x] Magnifying Glass returns an explanation (canned in offline mode).
- [x] `/api/repository` accepts a normalized public GitHub URL without requiring login.
- [x] Production deployment is Ready at https://coding-garden-iota.vercel.app; live smoke checks returned
  `/` 200, `/api/health` 200, and malformed repository input 400 on 2026-07-18.
- [x] No secrets appear in client bundles; the generated `.next/static` and `.next/server` artifacts
  were scanned for key prefixes on 2026-07-18.

## Production cut for submission

- [x] Promote a verified preview to production before the final video is recorded, so the video shows the
  URL the judges will visit: https://coding-garden-iota.vercel.app (commit `bd77258`, deployment
  `dpl_FE5RHs7shenW2g9BAonNu7L7jrpa`, verified 2026-07-18).
- Freeze deploys after final verification (Execution Plan §15) except for critical fixes.
