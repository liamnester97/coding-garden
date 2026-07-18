# Code Garden - Repository Instructions

## Mission

Build a reliable, delightful, non-coder-first garden interface over real codebase health. The gardener sees the truth of the code as a living garden, understands before acting, and every tool action produces a real, verified, reviewable code change. Deterministic analysis owns all garden truth; AI explains, narrates, and proposes changes.

## Read First

1. `PLAN.md`
2. `STATUS.md`
3. `DECISIONS.md`
4. Relevant records in `docs/adr/` and the nearest nested `AGENTS.md`
5. `docs/EXECUTION_PLAN.md`

For a project-wide execution/status check, use `project-status-audit/SKILL.md`.

## Non-Negotiable Invariants

- The language model never mutates garden state directly. Garden health changes only when a verified code change lands and analysis is re-run.
- The render layer never computes or grants health; it presents the GardenScene projection of the HealthReport.
- Every health signal traces to a real static-analysis result (dead code, coverage, complexity, vulnerability), never to LLM opinion.
- Every tool action is a typed, validated, confirmed command: see → understand (explanation shown) → confirm → act → verify → re-analyze.
- Code changes land on branches via pull requests. Never write destructively to the default branch of the analyzed repo.
- The analyzed repo is untrusted input. Never execute its code outside sandboxed, controlled test runners.
- The demo path works without an `OPENAI_API_KEY` via the cached sample repo, pre-computed analysis, and canned explanations.
- The Magnifying Glass explanation is written for non-coders: plain English, no unexplained jargon.
- Validate all inputs: analysis outputs, tool commands, model tool calls, API payloads, and persisted state.
- Do not commit secrets or unlicensed third-party assets.

## Work Process

- Work against the active goal in `STATUS.md`; keep the slice bounded by `PLAN.md`.
- Keep diffs focused and add tests with behavior changes.
- Update `STATUS.md`, `PLAN.md` evidence, and relevant documentation before declaring a stage complete.
- Do not begin Stage 1 until the human owner approves the Stage 0 scope decision.
- Do not begin any Should-Have feature until the Must-Have demo path passes all gates.

## Required Checks Once the Application Exists

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run analysis:validate`
- `npm run build`

## Stop Conditions

Stop and report when a change would alter a frozen invariant or the MVP scope, when a tool action could be destructive or irreversible, when a license or repo-permission question is unclear, when a P0/P1 issue cannot be resolved inside the active goal, or when a required human decision, account, or secret is missing.
