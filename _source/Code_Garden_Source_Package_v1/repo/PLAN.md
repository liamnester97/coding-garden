# Active Implementation Plan

## Stage

Stage 1 - Repository Bootstrap, Analysis, and Garden Truth

## Goal

Establish a runnable sample-mode app, a generic read-only analysis path, and a trustworthy HealthReport before building the garden projection or change tools.

## Acceptance Criteria

- [ ] MVP scope human-approved and recorded in `DECISIONS.md` (one repo, three tools, before/after payoff; Should/Nice tiers deferred).
- [x] Provisional demo target selected: ColorlibHQ/gentelella; fallback: dumberjs/dumber.
- [ ] Offline sample repo curated from verified findings and committed as fixture data.
- [x] Initial JavaScript health-signal policy recorded in `DECISIONS.md`.
- [ ] ADR-001 (MVP scope) accepted by human owner.
- [x] ADR-002 (deterministic garden truth) accepted.
- [x] Risk register reviewed and owners assigned.
- [ ] Human owner approves the scope decision.

## Completed Stage 0 evidence

- `docs/EXECUTION_PLAN.md` is present and is the active execution source of truth.
- Gentelella is the provisional target; dumber is the fallback.
- The JavaScript/TypeScript signal policy is recorded in `DECISIONS.md`.
- A sample fixture scaffold exists in the working tree; final curation and Git commit remain open.

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
- [ ] `STATUS.md` updated
- [ ] Project status audit run using `../../../project-status-audit/SKILL.md`
- [ ] Audit findings resolved, documented, or explicitly carried forward as open gates

## Stage 1 kickoff evidence

- [x] Next.js App Router + TypeScript strict scaffold
- [x] Sample-mode `/api/health` route
- [x] Zod-validated deterministic sample `HealthReport`
- [x] Vitest test and `analysis:validate` check
- [x] GitHub Actions workflow running the six required checks
- [ ] Vercel preview connection
- [x] Generic read-only JavaScript/TypeScript target-repo analysis adapter
- [x] Rehearse the target adapter against a temporary Gentelella checkout
- [x] Curate the offline fixture from verified findings; commit remains open
- [x] Calibrate entrypoint detection and finding confidence before any change action

## Stage Gate Protocol

At the end of every stage, before promoting the project to the next stage:

1. Complete the stage's acceptance criteria and required quality checks.
2. Perform self-review and independent review; obtain human acceptance where required.
3. Update `PLAN.md`, `STATUS.md`, `DECISIONS.md`, and relevant project documentation with
   evidence and any remaining gates.
4. Run the project-local `project-status-audit` skill against the repository, durable notes,
   and Slack routing context.
5. Resolve documentation drift and record any plan change before starting the next stage.

The audit is also run at the end of each workday during active execution and once during final
submission closeout. It is a synchronization and decision checkpoint, not a replacement for
human acceptance, independent review, or the required technical checks.

## Calibration evidence

- [x] HTML script references, package `main`/`browser`/`bin` metadata, config files, service
  workers, and `scripts/`/`bin/` tooling are treated as entrypoints.
- [x] Unreachable source files remain the only dead-code candidates in the calibration fixture.
- [x] Quality gate passed: format, lint, typecheck, test (5 passing tests), analysis fixture
  validation, and production build.
- [x] `fixtures/sample-report.json` captures the analyzer output for `fixtures/sample-repo`: one
  dead-code finding and two estimated coverage gaps; the schema-backed regression test matches it.
- [ ] Commit the curated fixture snapshot.

## Garden projection evidence

- [x] Pure `HealthReport -> GardenScene` projection added with stable node-id layout hashing.
- [x] Health states and finding types use a single metaphor/accessibility registry.
- [x] Renderer consumes projected plants and exposes report-grounded labels in sample mode.
- [x] Projection regression tests cover deterministic output, health preservation, and finding labels.
- [ ] Add inspector detail and interaction states before entering the explanation stage.
