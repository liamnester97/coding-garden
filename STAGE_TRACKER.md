# Active Implementation Plan

## Stage

Stage 9 — Hardening / Bundle 6 — Hardening and Release

## Execution Bundle

- **Bundle:** 6 — Hardening and Release
- **Current goal:** Complete abuse, expiry, failure, accessibility, and release-evidence checks.
- **Bundle 1:** Implementation complete based on the Stages 0–3 evidence below; bundle-level human
  acceptance remains to be recorded.
- **Bundles 2–4 status:** Implementation slices complete; formal human/review gates remain open where
  the roadmap requires external evidence.
- **Bundle gate:** Open; technical hardening and release evidence are complete, while human gates remain
  open.
- **Audit status:** Stage 9/10 technical audit completed 2026-07-18; human/release gates remain open.
- **Human acceptance:** Bundle-level acceptance is not yet recorded.

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
- **Stage 4 — Magnifying Glass:** Implementation complete with deterministic learning objectives and
  Easy/Medium/Hard challenge gating; non-coder read-through and optional live-key evidence remain open.
- **Stage 5 — Clippers End-to-End:** Implementation complete in sample demo-rehearsal mode; real
  demo-fork PR remains an external credential/rehearsal gate.
- **Stage 6 — Watering Can End-to-End:** Implementation complete in the shared lifecycle; real
  generated-test PR remains an external credential/rehearsal gate.
- **Stage 7 — Demo Path Polish:** Local 2D world, gardener movement, tool stations, learning gate,
  payoff, seasons, and voices are implemented; browser/human wide-shot acceptance remains open.
- **Stage 8 — Stretch Features:** Seasons now provide Levels 1–3 with Easy/Medium/Hard recommended
  challenge progression, alongside deterministic plant voices; final stretch gate and demo stability
  audit remain open.
- **Stage 9 — Hardening:** Failure/expiry/replay/oversized-input regression coverage, security scan,
  production browser smoke, and final technical audit are complete; multi-person legibility and human
  acceptance remain open.
- **Stage 10 — Deploy, Video, Submission:** Production deployment and remote CI are verified at commit
  `235be74`; video, Devpost, and human acceptance remain open.

## Goal

Complete the hardening gate for the implemented garden: adversarial lifecycle checks, bounded inputs,
read-only public behavior, accessibility/runtime smoke, and release evidence.

## Bundle Goals

- [x] Goal 1 — Magnifying Glass quality gate and learning-objective boundary (implementation evidence).
- [x] Goal 2 — Deterministic question bank and authored learning content.
- [x] Goal 3 — Easy, Medium, and Hard challenge flow.
- [x] Goal 4 — Server-authoritative answer validation, hints, retries, and accessibility.

## Four-stage implementation cycle — 2026-07-18

- [x] Stage 4 slice: report-grounded explanations now lead into deterministic learning objectives;
  challenge answers are checked server-side and never graded by the model.
- [x] Stage 5 slice: Clippers requires a valid challenge proof before the server command registry can
  start the sample rehearsal.
- [x] Stage 6 slice: Watering Can uses the same proof/lifecycle/re-analysis contract; public reports
  remain read-only.
- [x] Stage 7 slice: the SVG garden now has a keyboard-operable gardener avatar and named tool stations;
  the golden path is visible from movement through payoff.
- [x] Browser smoke: sample movement controls moved the avatar from `cy=86` to `cy=82`; the full
  sample Clippers path locked confirmation before an answer, unlocked it after the correct answer,
  reached `landed`, and reported zero page errors. Mocked public-report mode showed the read-only notice,
  no tending buttons, and zero page errors.
- [x] Focused and full technical checks passed: 51 tests, lint, typecheck, analysis validation, build,
  format check, and diff check.
- [x] Stage 9 regression coverage added: 54 tests now cover challenge/command expiry, proof replay,
  oversized answers, failed rehearsals, and health preservation.
- [x] Stage 8 progression slice: seasons expose deterministic level/difficulty metadata, reset stale
  challenge state on selection, and the payoff includes a classroom learning recap.
- [ ] External gates: non-coder explanation read-through, real demo-fork PRs, two-person wide-shot
  legibility, human acceptance, public video, and Devpost submission.

### Four-stage audit evidence — 2026-07-18

- [x] One canonical `docs/EXECUTION_PLAN.md`; exactly one root `STAGE_TRACKER.md`,
  `PROJECT_STATUS.md`, and `DECISION_LOG.md`; no generic `PLAN.md`, `STATUS.md`, or `DECISIONS.md`.
- [x] Root navigation resolves to the current status, tracker, decisions, roadmap, and human-test guide.
- [x] Sensitive-content scan found no committed secret; `.env.example` is the only environment template.
- [x] `git diff --check`, format check, lint, typecheck, 55 tests, analysis validation, and production
  build passed.
- [x] Obsidian project note and session log reconciled; Slack connector was unavailable in this session,
  so no new Slack-backed claim was made.

### Stage 9 hardening evidence — 2026-07-18

- [x] 55 tests pass, including expiry, replay, oversized input, failed rehearsal, health-preservation,
  and non-coder explanation-copy cases.
- [x] Browser smoke covered sample golden path, touch movement, public read-only mode, and zero page
  errors.
- [x] Generated build artifacts contain no detected secret prefixes.
- [x] Stage 10 production deployment is verified at `https://coding-garden-iota.vercel.app` (deployment
  `coding-garden-38w8yw6ne-code-garden.vercel.app`); public video, Devpost submission, and external
  human review are not claimed complete.
- [x] Local production-mode smoke passed on `next start`: `/` 200, `/api/health` 200,
  `/api/explain` 200 without a key, invalid repository/challenge/tend payloads 400, and mobile map
  movement completed without page errors.
- [x] Implementation commit `235be74` and documentation sync commits `12029f1`/`e858a30`/`8462b1f`/`e9a25fb` are pushed;
  draft PR #1 reports passing GitHub CI quality, Vercel deployment, and Vercel Preview Comments.
  Preview URL is recorded in `PROJECT_STATUS.md`.
- [x] Production browser smoke on 2026-07-18 verified mobile rendering, sample-mode labels, zero page
  or console errors, and the Clippers golden path. Opening the tool produced zero `/api/tend` calls
  before confirmation; a correct answer enabled confirmation and the server lifecycle reached `landed`.
- [x] Anonymous production analysis of `ColorlibHQ/gentelella` completed read-only on 2026-07-18 at
  commit `c4515bd2682660d79d6d0e64160a57cd86482451`: 31 nodes, 63 findings, and a complete bounded
  scope of 96 supported/analyzed files with zero omissions.
- [x] Broader production browser matrix on 2026-07-18 passed: mobile sample mode showed three plants
  and four movement controls; Early/Mid/Late season selection reached Level 3/Hard; keyboard focus
  entered an input; invalid repository input produced an alert; public analysis showed read-only mode
  with zero tending buttons; reduced-motion Watering Can reached `landed` after confirmation. Zero page
  or console errors were observed.
- [x] Magnifying Glass clarity slice: deterministic Inspector copy now translates analyzer labels into
  plain-language issue, health, evidence-source, and next-step text; a regression test protects the
  copy boundary. Human non-coder read-through remains an explicit acceptance gate.
- [x] Accessibility focus slice: the learning dialog focuses the answer field, exposes modal labeling
  and description, and supports Escape cancellation. Local production browser smoke verified focus and
  cancellation with zero page/console errors.
- [x] Stage 10 documentation readiness: root README now contains the project description and fresh-clone
  setup flow and Build Week submission narrative; public-repository MIT license is committed as
  `LICENSE`; submission checklist reflects the completed track, description, repository, and README
  evidence.
- [x] Stage 10 recording handoff: the existing human-test guide now contains a current-release
  run-of-show that distinguishes sample rehearsals from any future credentialed live PR segment.

## Bundle Gate Protocol

At the end of every execution bundle:

1. Run focused tests and review the four goals together.
2. Run the project-local `project-status-audit` skill and documentation structure gate.
3. Reconcile `PROJECT_STATUS.md`, `STAGE_TRACKER.md`, `DECISION_LOG.md`, and relevant docs.
4. Record open human, credential, deployment, and review gates.
5. Wait for human acceptance before starting the next bundle.

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

## Historical Scope Boundary

- The original Stage 0 scope kept live PR execution, generated artwork, org view, overnight tending,
  and computer use outside the initial slice. Seasons and plant voices are now implemented as bounded
  offline stretch slices; live PR execution remains an external gate.

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

## Stage 4 review-fix slice — 2026-07-17

- [x] Public analysis requests use strict URL validation, five requests per client IP per ten-minute
      window, bounded limiter memory, five-minute in-memory report caching, and ten-second GitHub
      request timeouts.
- [x] GitHub candidates are sorted before the 120-file cap; `HealthReport.scope` records complete or
      bounded coverage with supported, analyzed, and omitted file counts.
- [x] The UI discloses bounded reports and correctly labels sample versus public-report mode.
- [x] Repeated relative imports are deduplicated in analysis and defensively in `GardenScene`.
- [x] Regression coverage expanded to 25 tests, including route guards/cache expiry, timeout handling,
      deterministic bounded selection, report scope, and duplicate-edge behavior.
- [x] Deployment, risk, status, tracker, and decision records document the new safeguards.

## Stage 4 Magnifying Glass slice — 2026-07-18

- [x] Moved the deterministic explanation projection out of the AI module so client components do
      not import server-side AI code.
- [x] `/api/explain` accepts a schema-validated `HealthReport` and node ID rather than silently
      explaining only the offline sample report.
- [x] Added a server-side GPT-5.6 Responses API adapter with a strict grounding prompt, bounded
      output schema, eight-second timeout, five-minute cache, and deterministic fallback on missing
      key, invalid output, API failure, or timeout.
- [x] The UI requests explanations for the currently selected report while rendering the local
      grounded explanation immediately; public mode and sample mode remain login-free.
- [x] Added a versioned prompt contract with five representative evidence expectations and route
      tests for malformed reports, no-key fallback, and a mocked live model response.
- [ ] Human non-coder read-through of five explanations remains the Stage 4 acceptance gate.

## Stage 5–8 implementation slice — 2026-07-18

- [x] Added the typed `ToolCommand` lifecycle for Clippers, Watering Can, and Pesticide, rejecting
      illegal transitions and requiring the explanation/confirmation sequence.
- [x] Added `/api/tend` with strict report/command validation, explicit confirmation, a
      server-authoritative sample-only lifecycle, failure handling, and heal-only-after-reanalysis.
- [x] Public reports remain read-only; forged, replayed, mismatched, skipped, and expired tending
      commands are rejected by the bounded in-memory registry.
- [x] Repository metadata input is strict, analysis cache identity includes the resolved commit,
      and anonymous explanation requests have bounded payloads and best-effort rate limits.
- [x] Clippers and Watering Can regression tests cover full lifecycle, failed commands, missing
      findings, and finding removal after re-analysis.
- [x] Added UI tool actions, lifecycle status, and an explicit rehearsal note; no fake PR URL is
      emitted and no optimistic health update occurs.
- [x] Added Stage 7 payoff history and classroom comparison surface.
- [x] Added Stage 8 seasons snapshots and deterministic plant voices, both grounded in report data.
- [ ] Real demo-fork PRs, golden playthrough, two-person legibility test, and final human acceptance
      remain open gates.

## Stage 7 golden playthrough evidence — 2026-07-18

- [x] Mobile production browser rehearsal loaded sample mode and report-grounded Magnifying Glass copy.
- [x] Clippers reached `landed`, removed the dead-code finding only after re-analysis, and recorded
      the rehearsal in the payoff panel.
- [x] Watering Can reached `landed`, removed the estimated coverage finding only after re-analysis,
      and reduced the comparison from two signals to zero.
- [x] Payoff panel, classroom comparison, mobile layout, and zero browser page/console errors passed.
- [x] Season selector switched to the late-summer snapshot during the same rehearsal.
- [ ] Two-person five-second wide-shot legibility test and human acceptance are not yet recorded.

## Stage 8 stretch evidence — 2026-07-18

- [x] Seasons: three deterministic sample snapshots are selectable without network access.
- [x] Plant voices: deterministic first-person copy is derived only from the selected report node and
      findings; no health or finding state is invented.
- [x] Pesticide shares the typed lifecycle and remains dormant until a vulnerability finding exists.
- [ ] AI-painted backdrop is intentionally deferred; generated art must not encode garden health.
- [ ] Independent stretch review and final human acceptance remain open.

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
