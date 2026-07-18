# Active Implementation Plan

## Stage

Stage 1 - Repository Bootstrap, Analysis, and Garden Truth

## Stage Status

- **Stage 0 — Scope, target, and evidence:** In progress; target, tool policy, risk review, and
  fixture evidence are recorded, but human scope approval and ADR-001 acceptance remain open.
- **Stage 1 — Bootstrap, analysis, and garden truth:** In progress; bootstrap, HealthReport,
  adapter rehearsal, calibration, fixture commit, projection, and inspector interaction slices
  are complete. The public standalone repository-input boundary is now defined and tested.
  Vercel preview, independent review, human acceptance, and the project status audit remain open.
- **Stage 2 — Deterministic analysis engine:** Implementation evidence is complete; formal stage
  promotion remains tied to the Stage 1 gate and the stage-boundary review cadence.
- **Stage 3 — Garden rendering:** Projection and inspector implementation slices are complete;
  visual review, keyboard verification, and formal stage gates remain open.
- **Stage 4 — Magnifying Glass:** Grounded sample-mode explanation foundation is implemented;
  live model integration, prompt evals, non-coder read-through, and formal stage gates remain open.
- **Stages 5–10:** Queued.

## Goal

Establish a runnable sample-mode app, a generic read-only analysis path, a trustworthy HealthReport,
and the first deterministic garden projection before building explanation or change tools.

## Acceptance Criteria

- [ ] MVP scope human-approved and recorded in `DECISION_LOG.md` (one repo, three tools, before/after payoff; Should/Nice tiers deferred).
- [x] Provisional demo target selected: ColorlibHQ/gentelella; fallback: dumberjs/dumber.
- [x] Offline sample repo curated from verified findings and committed as fixture data.
- [x] Initial JavaScript health-signal policy recorded in `DECISION_LOG.md`.
- [ ] ADR-001 (MVP scope) accepted by human owner.
- [x] ADR-002 (deterministic garden truth) accepted.
- [x] Risk register reviewed and owners assigned.
- [ ] Human owner approves the scope decision.

## Completed Stage 0 evidence

- `docs/EXECUTION_PLAN.md` is the single execution source of truth.
- Gentelella is the provisional target; dumber is the fallback.
- The JavaScript/TypeScript signal policy is recorded in `DECISION_LOG.md`.
- The curated fixture is committed in the pushed foundation branch; human scope approval remains open.

## Risks

- Choosing a demo repo whose language/toolchain the analysis pipeline cannot cover in time (mitigate: pick a repo in the same language as the app's own toolchain).
- Scope creep into Should-Have features before the demo path exists.

## Out of Scope

- All application code. Seasons scrubbing, plant voices, pesticide, generated artwork, org view, overnight tending, computer use.

## Evidence

- Repository bootstrap and a generic target-repo adapter are underway under the human owner's
  direction. Stage 0 is not declared complete because human approval and fixture curation/commit
  remain explicit gates.

## Completion

- [ ] Self-review
- [ ] Independent review
- [ ] Human acceptance
- [ ] `PROJECT_STATUS.md` updated
- [x] Project status audit run using `project-status-audit/SKILL.md`
- [x] Audit findings resolved, documented, or explicitly carried forward as open gates

## Stage 1 kickoff evidence

- [x] Next.js App Router + TypeScript strict scaffold
- [x] Sample-mode `/api/health` route
- [x] Zod-validated deterministic sample `HealthReport`
- [x] Vitest test and `analysis:validate` check
- [x] GitHub Actions workflow running the six required checks
- [x] Vercel preview connection
- [x] Generic read-only JavaScript/TypeScript target-repo analysis adapter
- [x] Rehearse the target adapter against a temporary Gentelella checkout
- [x] Curate and commit the offline fixture from verified findings
- [x] Calibrate entrypoint detection and finding confidence before any change action

## Stage Gate Protocol

At the end of every stage, before promoting the project to the next stage:

1. Complete the stage's acceptance criteria and required quality checks.
2. Perform self-review and independent review; obtain human acceptance where required.
3. Update `STAGE_TRACKER.md`, `PROJECT_STATUS.md`, `DECISION_LOG.md`, and relevant project documentation with
   evidence and any remaining gates.
4. Run the project-local `project-status-audit` skill against the repository, durable notes,
   and Slack routing context.
5. Run the documentation structure gate: root `README.md` navigates to the live status, stage
   tracker, decision log, and sole execution plan; no generic duplicate tracker files exist.
6. Resolve documentation drift and record any roadmap change before starting the next stage.

The audit is also run during final submission closeout. It is a synchronization and decision
checkpoint, not a replacement for human acceptance, independent review, or the required technical
checks.

## Calibration evidence

- [x] HTML script references, package `main`/`browser`/`bin` metadata, config files, service
      workers, and `scripts/`/`bin/` tooling are treated as entrypoints.
- [x] Unreachable source files remain the only dead-code candidates in the calibration fixture.
- [x] Quality gate passed: format, lint, typecheck, test (5 passing tests), analysis fixture
      validation, and production build.
- [x] `fixtures/sample-report.json` captures the analyzer output for `fixtures/sample-repo`: one
      dead-code finding and two estimated coverage gaps; the schema-backed regression test matches it.
- [x] Commit the curated fixture snapshot in `5403100`.

## Garden projection evidence

- [x] Pure `HealthReport -> GardenScene` projection added with stable node-id layout hashing.
- [x] Health states and finding types use a single metaphor/accessibility registry.
- [x] Renderer consumes projected plants and exposes report-grounded labels in sample mode.
- [x] Projection regression tests cover deterministic output, health preservation, and finding labels.
- [x] Add accessible inspector detail and selection interaction states.

## Current slice completion snapshot

- **Completed slices:** Plant selection/inspector detail and grounded Magnifying Glass explanation
  foundation for sample mode.
- **Evidence:** Cards are keyboard-focusable buttons; selection is exposed with `aria-pressed`;
  the inspector announces updates with `aria-live`; `/api/explain` returns typed, report-grounded
  explanations; no explanation invents findings outside the validated report.
- **Quality gate:** `format:check`, `lint`, `typecheck`, 9 tests, `analysis:validate`, `build`, and
  `git diff --check` all pass.
- **Stage status:** Implementation slice complete; promotion remains open for independent review,
  human acceptance, preview deployment, live-model integration, prompt evaluation, and the project
  status audit.

## Roadmap clarification

The canonical roadmap is the ordered Stage 0–10 roadmap in the outer
`docs/EXECUTION_PLAN.md`. This file is only the live tracker for the current stage and
its bounded implementation slices, not a replacement roadmap.

## 2026-07-17 stage-boundary evidence snapshot

- Full repository checks passed: formatting, lint, typecheck, 11 tests, fixture validation,
  production build, and `git diff --check`.
- Documentation structure gate passed: one canonical execution plan, one each of the named
  trackers, no generic duplicate tracker names, active root navigation, and historical archive
  separation.
- Sensitive-content scan found no credential files or actual key/token/private-key values. The
  only credential references are explanatory documentation in `docs/DEPLOYMENT.md`.
- Durable context and Slack routing were checked; no Code Garden-specific Slack item is open.
- This is an implementation and synchronization checkpoint, not Stage 1 promotion: Vercel preview,
  independent review, human acceptance, and the formal audit reconciliation remain open gates.
