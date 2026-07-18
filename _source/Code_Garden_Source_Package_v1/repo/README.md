# Code Garden

_A living, playable ecosystem for understanding and tending codebases._

Code Garden turns a codebase into a living garden you can walk through, understand, and tend. Functions are plants, dependencies are roots, test coverage is sunlight, bugs are pests, dead code is decay. You hold real tools: clip a withered branch and Codex actually removes the dead code; water a drought zone and Codex actually writes the missing tests. You cannot act without understanding — every action is preceded by a plain-English explanation, which is what makes it a teaching tool as much as a developer tool.

Built for the **OpenAI Build Week Challenge 2026** with **Codex + GPT-5.6**. Primary track: **Education**. Submission deadline: **July 21, 2026, 5:00 PM PT**.

## Status

Stage 1 (analysis foundation) — see `STATUS.md` for the live snapshot, `PLAN.md` for the active slice, and `docs/EXECUTION_PLAN.md` for the roadmap.

## Run

```bash
npm install
cp .env.example .env.local   # OPENAI_API_KEY optional — app runs on the cached sample garden without it
npm run dev                  # http://localhost:3000
```

- `/` — the garden.
- `/api/health` — service health check.
- Without an `OPENAI_API_KEY`, the app serves the bundled sample repo with pre-computed analysis and canned explanations (deterministic demo path).

## Quality checks

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run analysis:validate   # golden HealthReport snapshots for the sample repo
npm run build
```

All six must pass before a stage is declared complete. CI runs them on every PR.

## Documentation

- `docs/EXECUTION_PLAN.md` — the tip-to-tail master plan (source of truth).
- `AGENTS.md` — repository instructions for Codex (read first).
- `docs/adr/` — architecture decision records.
- `docs/GARDENER_JOURNEY.md` — the demo path, minute by minute.
- `docs/BUILD_WEEK_REQUIREMENTS.md` — verified submission checklist.

## Architecture in one paragraph

A deterministic analysis engine (`lib/analysis/`) parses the target repo and produces a typed, validated **HealthReport** (dead code, coverage, complexity, vulnerabilities). A pure projection (`lib/garden/`) maps the HealthReport to a **GardenScene** — same report, same garden, every time. GPT-5.6 explains and narrates; Codex proposes and lands code changes on branches via PRs. Garden health changes **only** when a verified code change lands and the analysis is re-run. Neither the LLM nor the render layer can alter garden truth. See `docs/adr/ADR-002-DETERMINISTIC-GARDEN-TRUTH.md`.
