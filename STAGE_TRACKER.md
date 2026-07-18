# Active Implementation Plan

## Stage

Stage 4 - Magnifying Glass

## Stage Status

- **Stage 0 — Scope, target, and evidence:** Complete; target, tool policy, risk review, fixture
  evidence, and human scope approval are recorded.
- **Stage 1 — Bootstrap, analysis, and garden truth:** Complete; bootstrap, HealthReport,
  adapter rehearsal, calibration, fixture commit, projection, and inspector interaction slices
  are complete. The public standalone repository-input boundary is now defined and tested.
  CI, anonymous Vercel preview, automated PR checks, and human acceptance are complete.
- **Stage 2 — Deterministic analysis engine:** Complete; deterministic fixture validation, bounded
  public GitHub analysis, cached rehearsal evidence, hosted route smoke test, full checks, review,
  and audit are complete.
- **Stage 3 — Garden rendering:** Complete; real public reports now render as deterministic plants,
  analyzed import roots, health states, summaries, inspector evidence, and accessible selection.
- **Stage 4 — Magnifying Glass:** In progress; extend the deterministic explanation foundation toward
  the live GPT-5.6 path while preserving the no-key fallback.
- **Stages 5–10:** Queued.

## Goal

Establish a runnable sample-mode app, a generic read-only analysis path, a trustworthy HealthReport,
and the first deterministic garden projection before building explanation or change tools.

## Acceptance Criteria

- [x] MVP scope human-approved and recorded in `DECISION_LOG.md` (one repo, three tools, before/after payoff; Should/Nice tiers deferred).
- [x] Provisional demo target selected: ColorlibHQ/gentelella; fallback: dumberjs/dumber.
- [x] Offline sample repo curated from verified findings and committed as fixture data.
- [x] Initial JavaScript health-signal policy recorded in `DECISION_LOG.md`.
- [x] ADR-001 (MVP scope) accepted by human owner.
- [x] ADR-002 (deterministic garden truth) accepted.
- [x] Risk register reviewed and owners assigned.
- [x] Human owner approves the scope decision.

## Completed Stage 0 evidence

- `docs/EXECUTION_PLAN.md` is the single execution source of truth.
- Gentelella is the provisional target; dumber is the fallback.
- The JavaScript/TypeScript signal policy is recorded in `DECISION_LOG.md`.
- The curated fixture is committed in the pushed foundation branch; human scope approval was recorded
  on 2026-07-17.

## Risks

- Choosing a demo repo whose language/toolchain the analysis pipeline cannot cover in time (mitigate: pick a repo in the same language as the app's own toolchain).
- Scope creep into Should-Have features before the demo path exists.

## Out of Scope

- All application code. Seasons scrubbing, plant voices, pesticide, generated artwork, org view, overnight tending, computer use.

## Evidence

- Repository bootstrap and a generic target-repo adapter are complete under the human owner's
  direction. Stage 0 is complete; Stage 2 now owns the next bounded analysis slice.

## Completion

- [x] Self-review
- [x] Independent review evidence: GitHub CI/PR checks plus documented agent self-review
- [x] Human acceptance recorded from Liam on 2026-07-17
- [x] `PROJECT_STATUS.md` updated
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

- **Completed slices:** Plant selection/inspector detail, grounded Magnifying Glass explanation,
  and bounded public GitHub read-only analysis.
- **Evidence:** The GitHub adapter resolves the default branch, reads only supported text/source
  blobs into a temporary workspace, never installs or executes target code, enforces 120 files /
  256 KB per file / 2 MB total limits, and produces a schema-validated report. The new
  `/api/repository/analyze` Node route exposes that path for the standalone app.
- **Live rehearsal:** `ColorlibHQ/gentelella` completed with commit
  `c4515bd2682660d79d6d0e64160a57cd86482451`, 31 nodes, 63 findings, report hash
  `da302756ed12d03b`, and no target-code execution.
- **Quality gate:** `format:check`, `typecheck`, 18 tests, and `git diff --check` pass for this
  slice. Full Stage 2 checks and the boundary audit remain open until the snapshot/cache slice is
  complete.
- **Stage status:** Complete. Stage 2 acceptance, review evidence, human acceptance, documentation
  reconciliation, and the project-status audit are complete. At that time, Stage 3 became the next
  active stage; it is now complete and Stage 4 is active.

## Stage 3 active slice — real report rendering

- [x] Public repository form sends a normalized URL to the bounded read-only analysis route.
- [x] Returned `HealthReport` replaces the offline sample report in the garden without recalculating
      health in the render layer.
- [x] Inspector and Magnifying Glass explanation remain grounded in the selected report node.
- [x] Rendering regression coverage includes a Gentelella-shaped report with health, finding labels,
      evidence, and deterministic layout assertions.
- [x] SVG garden map renders stable plant positions and only analyzed import edges as roots.
- [x] Health colors and plant size distinguish healthy, stressed, and withered report states.
- [x] Reduced-motion CSS and keyboard-selectable plant cards are present; inspector text remains the
      accessible mirror of the visual state.
- [x] Hosted Gentelella UI smoke test passed at mobile and wide viewports with no page errors; 31
      plants and 41 roots rendered after public analysis.
- [x] Stage 3 visual acceptance and boundary audit completed on 2026-07-17.

## Stage 3 completion record — 2026-07-17

- [x] `HealthReport` now validates import edges and the analyzer preserves them in live and fixture
      reports.
- [x] `GardenScene` projects roots from validated edges and stable node positions; the renderer never
      invents relationships or health.
- [x] Public Gentelella UI path completed with 31 plants, 41 roots, 63 findings, report hash
      `da302756ed12d03b`, and commit `c4515bd2682660d79d6d0e64160a57cd86482451`.
- [x] Local and hosted browser checks passed: mobile rendering, wide-shot legibility, keyboard
      traversal, and zero page errors.
- [x] Full technical checks passed: format, lint, typecheck, 18 tests, fixture validation, build,
      and diff check.
- [x] Stage 3 implementation committed and pushed in `5c3661b`.
- [x] Project-status audit, documentation structure gate, durable-context check, Slack routing check,
      and sensitive-content scan completed; no P1 documentation or security findings remain.

## Stage 2 completion record — 2026-07-17

- [x] Deterministic sample report remains schema-validated and stable.
- [x] Bounded public GitHub adapter resolves a commit, reads supported blobs only, and never
      installs or executes target code.
- [x] Gentelella rehearsal evidence cached in `fixtures/gentelella-rehearsal.json`.
- [x] Hosted `/api/repository/analyze` route smoke-tested anonymously on the public preview.
- [x] Full technical checks passed; GitHub CI/PR verification is the independent evidence.
- [x] Human acceptance: Liam requested Stage 2 closeout on 2026-07-17.
- [x] Project-status audit and documentation structure gate passed; no duplicate execution plans
      or generic tracker files found.
- [x] Security scan found no tracked credential files or actual secret/key material.
- [x] GitHub CI quality, Vercel deployment, and Vercel Preview Comments passed on commit `56d2c9e`.

## Roadmap clarification

The canonical roadmap is the ordered Stage 0–10 roadmap in the outer
`docs/EXECUTION_PLAN.md`. This file is only the live tracker for the current stage and
its bounded implementation slices, not a replacement roadmap.

## 2026-07-17 final Stage 1 audit evidence snapshot

- Full repository checks passed locally: formatting, lint, typecheck, 14 tests, fixture validation,
  production build, and `git diff --check`; GitHub CI quality also passed.
- Git branch is clean and synchronized with `origin`; draft PR #1 is open with Vercel checks passing.
- Anonymous Vercel preview is live at `https://coding-garden-brlf2kkis-code-garden.vercel.app` and
  smoke checks passed for the homepage, health, explanation, and public-repository routes.
- Documentation structure gate passed: one canonical execution plan, one each of the named
  trackers, no generic duplicate tracker names, active root navigation, and historical archive
  separation.
- Sensitive-content scan found no credential files or actual key/token/private-key values. The
  only credential references are explanatory documentation in `docs/DEPLOYMENT.md`.
- Durable context and Slack routing were checked; no Code Garden-specific Slack item is open.
- Stage 1 promotion is complete. Stage 2 is now the active stage.

## Stage 0–1 promotion record — 2026-07-17

- Liam explicitly approved the Stage 0 scope freeze and Stage 1 promotion.
- ADR-001 is accepted; the public standalone release boundary is recorded in the decision log.
- GitHub CI/PR checks passed and the agent performed documented self-review. No separate human
  reviewer was available; this limitation is recorded rather than implied away.
- The project-status audit, duplicate-document check, durable-context check, Slack check, security
  scan, local suite, and public preview smoke tests all passed.
- Stage 2 is the sole active next stage; no alternate execution plan was created.
