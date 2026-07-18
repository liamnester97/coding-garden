# Project Status

Updated: 2026-07-18, America/Denver

## Active Bundle and Goal

- Bundle: 6 — Hardening and Release
- Current goal: Complete abuse, expiry, failure, accessibility, and release-evidence checks.
- Canonical roadmap: [docs/EXECUTION_PLAN.md](docs/EXECUTION_PLAN.md)
- Detailed evidence: [STAGE_TRACKER.md](STAGE_TRACKER.md)
- Branch/PR: `agent/health-report-foundation`; draft PR #1
- Verified commit: `3fb549f` pushed to origin.
- Vercel preview: https://coding-garden-git-agent-health-report-foundation-code-garden.vercel.app
- Remote evidence: GitHub CI quality passed; Vercel deployment and preview comments passed.

## Bundle Status

- Bundle 1 — Foundation and Truth: implementation complete; bundle-level acceptance remains open.
- Bundle 2 — Understand and Learn: four implementation goals complete; non-coder/review acceptance open.
- Bundle 3 — Act Safely: sample-only implementation complete; real PR evidence open.
- Bundle 4 — Playable Garden World: local world/controls implementation complete; human playtest open.
- Bundle 5 — Progression and Classroom Value: seasons and voices implemented; final human review open.
- Bundle 6 — Hardening and Release: in progress; technical regression coverage is green.
- Bundle gate: open pending hardening audit and human acceptance.

## Current State

- Deterministic sample and bounded public GitHub analysis are implemented and validated.
- Public reports are read-only; sample demo rehearsals are server-authoritative and heal only after
  re-analysis.
- The SVG garden projection, roots, inspector, report-grounded explanations, seasons, plant voices,
  confirmation lifecycle, and classroom/payoff surfaces exist locally.
- The learning gate is now implemented: authored report-grounded questions, three difficulties,
  server validation, hints, retries, and confirmation gating.
- The garden now includes a 2D world layer with a keyboard-operable gardener avatar and named tool
  stations; the map remains a deterministic projection of the report.
- The app remains login-free and works without `OPENAI_API_KEY` through deterministic fallbacks.
- Hardening coverage now exercises expiry, proof replay, oversized challenge input, failed rehearsal,
  and health-preservation behavior.
- Local production-mode route smoke passed; this is not a substitute for a deployed public URL.

## Blockers and Open Gates

- Human non-coder read-through of five explanations remains open.
- Real demo-fork PR evidence remains an external credential/rehearsal gate.
- Two-person wide-shot legibility and final human acceptance remain open.
- Live GPT-5.6 narration cannot be exercised locally without `OPENAI_API_KEY`; the no-key fallback is
  the supported release path.
- Production promotion, final video, and submission evidence are not complete; the verified preview is
  available for human testing.

## Next Three Actions

1. Capture the five-explanation non-coder read-through and two-person map-legibility evidence.
2. Rehearse or record real demo-fork PR evidence where credentials permit; keep demo mode explicit
   until then.
3. Complete the Stage 9 security/accessibility audit, then gather Stage 10 deployment/video/submission
   evidence.

## Synchronization Rules

- `docs/EXECUTION_PLAN.md` is the only roadmap.
- `STAGE_TRACKER.md` is the active stage and bundle tracker.
- This file is the current snapshot only.
- `DECISION_LOG.md` contains durable project decisions and milestone evidence.
- No commit or push is implied by this status update.
