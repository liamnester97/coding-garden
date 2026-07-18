# Project Status

Updated: 2026-07-18, America/Denver

## Active Bundle and Goal

- Bundle: 6 — Hardening and Release
- Current goal: Complete abuse, expiry, failure, accessibility, and release-evidence checks.
- Canonical roadmap: [docs/EXECUTION_PLAN.md](docs/EXECUTION_PLAN.md)
- Detailed evidence: [STAGE_TRACKER.md](STAGE_TRACKER.md)
- Branch/PR: `agent/health-report-foundation`; draft PR #1
- Verified implementation commit: `235be74`; release documentation sync commits `12029f1`, `e858a30`,
  `8462b1f`, and `e9a25fb` are also pushed to origin.
- Vercel preview: https://coding-garden-git-agent-health-report-foundation-code-garden.vercel.app
- Production: https://coding-garden-iota.vercel.app
- Remote evidence: GitHub CI quality passed; Vercel deployment and preview comments passed. Production
  deployment `coding-garden-38w8yw6ne-code-garden.vercel.app` is Ready.

## Bundle Status

- Bundle 1 — Foundation and Truth: implementation complete; bundle-level acceptance remains open.
- Bundle 2 — Understand and Learn: four implementation goals complete; non-coder/review acceptance open.
- Bundle 3 — Act Safely: sample-only implementation complete; real PR evidence open.
- Bundle 4 — Playable Garden World: local world/controls implementation complete; human playtest open.
- Bundle 5 — Progression and Classroom Value: seasons and voices implemented; final human review open.
- Bundle 6 — Hardening and Release: technical slice complete; human/release acceptance remains open.
- Bundle gate: open pending human acceptance and final submission artifacts; technical hardening and
  production evidence are complete.

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
- Seasons now act as Levels 1–3 and recommend Easy, Medium, and Hard challenge reasoning respectively;
  the classroom payoff explains the learning loop and current rehearsal progress.
- The app remains login-free and works without `OPENAI_API_KEY` through deterministic fallbacks.
- The public repository now includes an MIT license and a README project/setup/submission narrative;
  the remaining submission artifacts are the video, human evidence, and Devpost form.
- Hardening coverage now exercises expiry, proof replay, oversized challenge input, failed rehearsal,
  and health-preservation behavior.
- The Magnifying Glass Inspector now uses non-coder-first copy for issues, health, evidence sources, and
  next steps; the human read-through is still required before calling that acceptance gate complete.
- The learning dialog now moves focus to the answer field, exposes modal semantics, and supports Escape
  cancellation; automated accessibility smoke is green while human keyboard review remains open.
- Local and deployed production-mode route smoke passed: `/` 200, `/api/health` 200, and malformed
  repository input 400 on the production deployment. Production browser smoke also verified mobile
  rendering, zero page/console errors, confirmation-gated Clippers reaching `landed`, and anonymous
  read-only analysis of the selected demo repository (31 nodes, 63 findings, 96 files, zero omissions).
  A broader matrix also verified seasons, keyboard focus, invalid-input alerts, public read-only controls,
  and reduced-motion Watering Can reaching `landed` with zero browser errors.

## Blockers and Open Gates

- Human non-coder read-through of five explanations remains open.
- Real demo-fork PR evidence remains an external credential/rehearsal gate.
- Two-person wide-shot legibility and final human acceptance remain open.
- Live GPT-5.6 narration cannot be exercised locally without `OPENAI_API_KEY`; the no-key fallback is
  the supported release path.
- Final video, Devpost submission, and human acceptance evidence remain open; the production release is
  available for human testing.

## Next Three Actions

1. Capture the five-explanation non-coder read-through and two-person map-legibility evidence.
2. Rehearse or record real demo-fork PR evidence where credentials permit; keep demo mode explicit
   until then.
3. Have a second person run the human-test guide against production, then gather video/submission
   evidence using the documented current-release run-of-show, then record the remaining release gates.

## Synchronization Rules

- `docs/EXECUTION_PLAN.md` is the only roadmap.
- `STAGE_TRACKER.md` is the active stage and bundle tracker.
- This file is the current snapshot only.
- `DECISION_LOG.md` contains durable project decisions and milestone evidence.
- No commit or push is implied by this status update.
