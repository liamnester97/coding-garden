# Decision Log

Chronological record of binding decisions. Newest last. A decision here is frozen; changing it requires a new dated entry and human approval.

## 2026-07-17 — Concept adopted: Code Garden

The Build Week V2 submission is Code Garden per `code_garden_brief.pdf`: a living-garden interface over real codebase health, where gardening tools trigger real Codex code changes. Primary track: Education, with crossover into Developer Tools, Work & Productivity, and Apps for Your Life.

## 2026-07-17 — Operating model reused from V1

The project reuses the V1 execution system: master execution plan, AGENTS.md hierarchy, PLAN/STATUS/DECISIONS discipline, bounded vertical slices, stage gates with self-review + independent review + human acceptance.

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

## (pending Stage 0) — Demo repo selection

Target repo: TBD. Fallback: TBD. Offline sample fixture: TBD. Toolchain per health signal: TBD.
