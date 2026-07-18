# Decision Log

Chronological record of binding decisions. Newest last. A decision here is frozen; changing it requires a new dated entry and human approval.

## 2026-07-17 — Concept adopted: Code Garden

The Build Week V2 submission is Code Garden per `code_garden_brief.pdf`: a living-garden interface over real codebase health, where gardening tools trigger real Codex code changes. Primary track: Education, with crossover into Developer Tools, Work & Productivity, and Apps for Your Life.

## 2026-07-17 — Operating model reused from V1

The project reuses the V1 execution system: master execution plan, AGENTS.md hierarchy, PLAN/STATUS/DECISIONS discipline, bounded vertical slices, stage gates with self-review + independent review + human acceptance.

## 2026-07-17 — Track confirmed: Education

Human owner (Liam) confirmed **Education** as the primary Build Week submission track, with Developer Tools, Work & Productivity, and Apps for Your Life as crossover narrative only. Apps for Your Life is no longer a fallback track option — Education is final.

## 2026-07-17 — Health-signal toolchain frozen

Human owner approved the plan's recommended toolchain (Section 2.1) as final, all TS/JS, all cacheable offline for sample mode:

- Dead/unused code: `knip`
- Test coverage: `c8`/istanbul JSON reports from sandboxed test runs, with a static heuristic fallback (test-file presence + export-level mapping) labeled "estimated coverage" per Section 2.2's honesty rule
- Complexity: ESLint `complexity` rule (per-function cyclomatic complexity)
- Vulnerabilities: `npm audit --json`

## 2026-07-17 — MVP scope freeze (draft, pending Stage 0 human approval)

Must-Have tier only for the demo path:

1. Analysis pipeline producing a deterministic HealthReport (dead code, coverage, complexity, vulnerabilities).
2. Garden rendering that instantly reads healthy vs. sick.
3. Three tools end-to-end: Magnifying Glass, Clippers, Watering Can.
4. Before/after payoff moment with real diffs/PRs shown.

Should-Have (post-gate only): season scrubbing (3-4 snapshots), text-based plant voices, generated garden artwork. Nice-to-Have (roadmap writeup only): overnight tending, org landscape, invasive-species animation, custom Skills, computer-use inspection, profile gardens.

## 2026-07-17 — Deterministic garden truth (ADR-002)

Health signals come only from real static-analysis tooling. Garden state changes only when a verified code change lands and analysis re-runs. All tool actions are typed, confirmed, reversible commands landing via branch/PR. The LLM explains and proposes; it never mutates garden state. Accepted as founding architecture.

## 2026-07-17 — Safety boundaries

The analyzed repo is untrusted input: no execution of target-repo code outside sandboxed test runners. No destructive writes to any default branch. The app must run without an API key on the cached sample repo.

## 2026-07-17 — Demo repo selection

Human owner approved the researched candidates:

- **Target:** [`avrj/slack-clone`](https://github.com/avrj/slack-clone) — MIT license, ~56 files (98.9% JS), 892KB, archived 2018. Full-stack Slack clone (React + Socket.io + Express + Mongoose). Heavily outdated deps (webpack 4.0.1, babel 6.x, mongoose 5.1.5, socket.io 2.0.4) reliably trip `npm audit`. Has a thin real test dir (`src/server/__tests__`, mocked Mongo via mockgoose) — a genuine, safely-runnable coverage gap requiring no live DB/network/secrets. Varied app shape (routes/models/components) gives visual diversity in the garden render.
- **Fallback:** [`Mastermindzh/react-express-fullstack`](https://github.com/Mastermindzh/react-express-fullstack) — MIT license, ~172 files, 547KB, archived 2018. Kitchen-sink React+Redux+Express starter with zero test script (literal 0% coverage) and multi-DB (MySQL/MSSQL/Sequelize) scaffolding likely to contain dead code paths.
- **Also evaluated, not selected:** `sentanos/roblox-js` (MIT, ~55 files) — explicitly unmaintained, test script is `exit 1`. Kept as a second-tier fallback if both above have a rendering/size surprise on demo day.
- **Offline sample fixture:** still TBD — per Execution Plan §3, this is a small fixture repo (not the target/fallback above) built under `fixtures/sample-repo/` with deliberately planted issues plus a pre-computed HealthReport, to be authored during Stage 2/3 rather than sourced externally.

Toolchain per health signal: frozen — see the 2026-07-17 "Health-signal toolchain frozen" entry above.
