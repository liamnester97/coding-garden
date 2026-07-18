# Code Garden Workspace Instructions

This outer directory is the workspace/control layer for Code Garden. The active application
repository is nested at:

`_source/Code_Garden_Source_Package_v1/repo/`

Use the nested repo's `AGENTS.md`, `PLAN.md`, `STATUS.md`, and `DECISIONS.md` for current
implementation tracking. Use the outer `docs/EXECUTION_PLAN.md` as the one and only execution
roadmap. Supporting ADRs, requirements, risk, journey, and deployment records live in the nested
repo's `docs/`; the outer workspace must not create duplicate copies.

## Mission

Build a reliable, delightful, non-coder-first garden interface over real codebase health. The gardener sees the truth of the code as a living garden, understands before acting, and every tool action produces a real, verified, reviewable code change. Deterministic analysis owns all garden truth; AI explains, narrates, and proposes changes.

## Read First

1. `_source/Code_Garden_Source_Package_v1/repo/AGENTS.md`
2. `_source/Code_Garden_Source_Package_v1/repo/PLAN.md`
3. `_source/Code_Garden_Source_Package_v1/repo/STATUS.md`
4. `_source/Code_Garden_Source_Package_v1/repo/DECISIONS.md`
5. `docs/EXECUTION_PLAN.md` (the single canonical roadmap)
6. Relevant records in the nested repo's `docs/adr/` and nearest nested `AGENTS.md`

For a project-wide execution/status check, use `project-status-audit/SKILL.md`.

## Documentation Ownership

- `docs/EXECUTION_PLAN.md` — sole canonical execution roadmap.
- Nested `repo/PLAN.md` — current stage and bounded slice tracker only.
- Nested `repo/STATUS.md` — current snapshot, blockers, and next actions only.
- Nested `repo/DECISIONS.md` and `repo/docs/` — active decisions and supporting project records.
- `_source/.../Code_Garden_Codex_Package_v1/` — frozen historical source material only.

Before creating a Markdown file, search for an existing authoritative owner. Do not create a
second plan, status snapshot, decision log, ADR, requirements list, risk register, journey, or
deployment document at another layer.

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

- Work against the active goal in the nested repo's `STATUS.md`; keep the slice bounded by its `PLAN.md`.
- Keep diffs focused and add tests with behavior changes.
- Update the nested repo's `STATUS.md`, `PLAN.md` evidence, and relevant documentation before declaring a stage complete.
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
