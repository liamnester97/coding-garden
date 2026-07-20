# Active Implementation Plan

## Stage

Stage 43 — Full Verification and Audit / Bundle 13 — Complete Python Teaching Demo Realignment

## Execution Bundle

- **Bundle:** 13 — Complete Python Teaching Demo Realignment
- **Current goal:** Stage 43 — commit/push the verified Bundle 13 implementation; Stage 44 is queued for the next human-playtest refinement pass.
- **Completed implementation slices:** Stages 38–42 are implemented locally and covered by the automated suite.
- **Bundle 1:** Implementation complete based on the Stages 0–3 evidence below; bundle-level human
  acceptance remains to be recorded.
- **Bundles 2–4 status:** Implementation slices complete; formal human/review gates remain open where
  the roadmap requires external evidence.
- **Bundle gate:** Bundle 13 implementation and automated verification are complete locally; human acceptance remains open, with Stage 44 queued for confirmed findings.
- **Audit status:** Stage 37 documentation preflight passed. Stage 43 full-folder audit and automated verification passed;
  human acceptance remains open.
- **Human acceptance:** Not applicable to the documentation preflight; later stages require desktop/mobile,
  keyboard, beginner-comprehension, map, healing, and safe-output acceptance.

## Bundle 13 bounded goals

- [x] Stage 37 — Reconcile every authoritative document and complete the source-brief gap analysis.
- [x] Stage 38 — Implement the 20-issue Python fixture, authored question contract, and intro screen.
- [x] Stage 39 — Implement the fixed map, three target categories, paths, collision, facing, and 3×3 interaction.
- [x] Stage 40 — Implement the minimal four-choice dialogue, hints/examples, retries, explanation, and healing.
- [x] Stage 41 — Implement completion recap, before/after, fixes, evidence, copy/download, patch/PDF, replay, reset.
- [x] Stage 42 — Complete pixel-garden visual, accessibility, reduced-motion, and deployment refinement.
- [x] Stage 43 — Commit/push after full checks, browser evidence, entire-folder audit, and documentation reconciliation; human gates remain open.

### Bundle 13 implementation evidence — 2026-07-19

- [x] `lesson_garden.py` and `lesson_garden_fixed.py` are present locally as a read-only Python teaching fixture and explicit corrected copy.
- [x] The authored bank contains exactly 20 questions: 10 Easy, 5 Medium, and 5 Hard; every question has four choices,
      code, hint, example, explanation, recap, proposed fix, and re-analysis evidence.
- [x] Easy sessions choose one question per target from the ten-question pool; Medium and Hard expose their five-question
      pools. Active questions are independently playable and target guidance is unfinished-only.
- [x] The fixed SVG map uses authored reachable walkways, deterministic collision/facing, three target categories, and
      a two-step E/Enter interaction. Public report analysis remains read-only.
- [x] The question surface is Python-first and retryable; completion offers explicit review/copy/download/patch/print
      actions without modifying the fixture.
- [x] Automated evidence: 89 Vitest tests, 28 desktop/mobile Playwright tests, formatting, lint, typecheck, analysis
      validation, build, and diff checks pass locally.
- [x] Stage 43 automated checks, browser evidence, full coding-garden structure/security audit, and documentation reconciliation pass.
- [ ] Stage 43 human acceptance remains open; Stage 44 is queued to capture and fix confirmed playtest findings with regression coverage.

### Stage 43 verification snapshot — 2026-07-19

- [x] Sequential project checks pass: format, lint, typecheck, 89 Vitest tests, analysis validation, build,
      28 desktop/mobile Playwright tests, and `git diff --check`.
- [x] Full repository structure/security pass: exactly one `docs/EXECUTION_PLAN.md`, zero generic duplicate plan/status/
      tracker filenames, required navigation files present, no sensitive-looking files or detected secret literals, and
      no tracked generated build/report directories.
- [ ] Human acceptance: Easy-first comprehension, Medium/Hard availability, arbitrary open order, mobile/fullscreen
      map scale, keyboard-only movement/facing/collision, wrong-answer recovery, Hint/Example/Y explanation, five blooms,
      completion outputs, reset, and no-overwrite wording.

### Stage 37 documentation gate

- [x] Approved source documents and existing implementation reviewed.
- [x] Gap analysis created in `CHANGELOG.md`.
- [x] Structure/stale-reference/sensitive-information audit passes after documentation synchronization.
- [x] Human owner accepts the synchronized documentation before application implementation begins.

## Bundle 11 Goals — Open-ended learning demo and verified fix payoff

- [x] Stage 27 — Curate five deterministic intentional findings, matching fixes, excerpts, answer choices, hints,
      examples, explanations, and level/objective metadata in the dedicated teaching fixture.
- [x] Stage 28 — Show all five targets on the map, allow any order, simplify copy, remove remaining map clutter, and
      keep completion/reset session-local.
- [x] Stage 29 — Add Sprout/Easy Grades 1–5, Growing/Medium Grades 6–8, and Master Gardener/Hard Grades 9–12 with a
      mixed Find it / Plan it / Execute it multiple-choice learning dialogue.
- [x] Stage 30 — Record proposed fixes and add the dismissible all-five completion modal with before/after code and
      verified re-analysis results.
- [x] Stage 31 — Define safe corrected-copy/diff output and future ZIP/folder/branch/PR choices; label unsupported
      inputs and findings as future or More to explore.
- [x] Stage 32 — Run focused and full checks, configuration/documentation reconciliation, full project audit, and
      human desktop/mobile/keyboard/age-band acceptance before commit/push.

### Bundle 11 implementation evidence — 2026-07-19

- [x] Five default demo plants use stable `demo-*` findings with bounded excerpts, four choices, examples,
      explanations, and deterministic before/after proposals.
- [x] All five are visible immediately; selecting any plant is independent, and the sample session can reset locally.
- [x] Mixed notice/evidence/safe-next-step question types and clearly named Sprout, Growing, and Master Gardener
      levels are implemented.
- [x] The map is larger, zone borders are restrained, and active dialogue/examples/completion recap stay in the
      game surface. Public reports remain read-only and unsupported signals are labeled More to explore.
- [x] Focused Vitest coverage is 87 tests; Playwright production-style smoke is 28/28 on desktop/mobile with zero
      page or console errors after the overlay/accessibility fix.
- [ ] Full project-status audit and human acceptance remain to be recorded before the commit/push gate.
- [x] Audit preparation: one roadmap, one root tracker/status/decision set, no generic duplicate docs, no sensitive
      files, five fixture source files, and no detected secret literals.
- [ ] Human acceptance: desktop/mobile wide shot, keyboard-only movement, all three level labels, open-order solving,
      hints/examples/wrong answers, completion recap, reset, and safe-output wording.

### Bundle 11 execution gate

1. Plan/configuration checkpoint complete.
2. Implementation complete for the bounded stage.
3. Focused tests and full validation pass in documented order.
4. Configuration management and all authoritative documentation reconciled.
5. Full coding-garden project-status audit passes.
6. Human tests pass for desktop, mobile, keyboard flow, all three levels, open ordering, reset, and completion payoff.
7. Commit and push only after the preceding evidence is recorded.

## Active bundle — Bundle 12: Easy-first interaction repair and demo clarity

Bundle 12 is the active refinement cycle from the latest human feedback and interviews. Its implementation slice is
complete locally; its full audit and human acceptance gate remain open. The canonical details live in
`docs/EXECUTION_PLAN.md`.

- [x] Stage 33 — Repair map scale, walkways, halos, collision agreement, duplicate controls, and reliable E/Enter
      dialogue activation.
- [x] Stage 34 — Redesign the Easy Grades 1–5 dialogue and answer flow with simple intentional fixture errors,
      four clear answer boxes where applicable, hints, examples, retries, and optional `Y` explanation review.
- [x] Stage 35 — Verify immediate plant healing, five-question completion, replay/reset, safe output choices, and
      future-input boundaries.
- [x] Stage 36 — Run focused/full checks, the entire coding-garden audit, documentation reconciliation, and human
      evidence preparation.

### Bundle 12 implementation evidence — 2026-07-19

- [x] The map uses a larger responsive surface, restrained paths, one level control, unfinished-only target guidance,
      solid collision geometry, and two-step E/Enter dialogue activation.
- [x] Easy-first copy, four answer choices, hint/retry behavior, level labels, public read-only messaging, and the
      five-question open-order demo remain intact.
- [x] Automated checks pass: 87 Vitest tests and 28 Playwright desktop/mobile tests with zero page/console errors.
- [x] Full required command sequence passes through build and browser verification; `git diff --check` passes.
- [x] Full coding-garden audit passed: one canonical roadmap, one active root tracker/status/decision set, no active
      generic duplicate docs, resolved navigation references, no sensitive-looking files or secret literals, and no
      generated files tracked.
- [ ] Human acceptance remains open before commit/push.

### Bundle 12 acceptance target

An independent Grades 1–5 learner can navigate the whole garden with the keyboard, understand the dialogue, solve all
five intentional demo findings in any order, see each plant bloom, and review or safely export the proposed result.
Growing and Master Gardener remain available but are secondary to the Easy-first proof of concept.

## Bundle 10 Goals — Evidence-first teaching and interaction clarity

- [x] Replace abstract prompts with five bounded code-reading activities, choices, explanations, and typed-answer
      fallback.
- [x] Remove persistent map tool stations and decorative labels; keep tool context and dialogue inside the map.
- [x] Add a review-only proposed-fixes surface that does not claim or perform repository writes.
- [x] Run the final full verification, project-status audit, documentation reconciliation, and commit/push.
- [ ] Human age-band, device, accessibility, and live-NLP acceptance remain open.

### Bundle 10 Verification Evidence — 2026-07-18

- [x] Typecheck, lint, and 85 Vitest tests pass after the implementation slice.
- [x] Playwright production-style desktop/mobile suite passes: 24 checks with zero page/console errors after removing
      the duplicate reset message introduced by the persistent dialogue card.
- [x] Format, analysis validation, build, diff check, and structure/security audit pass.
- [ ] Human testing and any future authenticated write integration remain separate gates.

## Wave 3 Goals — Loop Clarity and Learning Reflection

- [x] Add an in-map action-status card for learning, confirmation, rehearsal, re-analysis, and verified health change.
- [x] Add an optional local reflection prompt after a completed sample rehearsal.
- [x] Keep the Garden Journal and objective status aligned with the current session only.
- [x] Add browser regression coverage for the in-map status surface.
- [x] Run the full project-status audit and reconcile the completed feature records.
- [ ] Human acceptance for wording, map legibility, and keyboard/touch flow remains open.

## Bundle 9 Goals — Teaching content and gameplay clarity

- [x] Add the local grade-band teaching lesson registry and offline fixture structure.
- [x] Add question-type and grade-band metadata to deterministic challenge questions.
- [x] Add the top control toolbar, fullscreen action, reduced map zoom, intentional E/Enter interaction, and optional
      detailed evidence.
- [ ] Publish and pin the separate public teaching repository.
- [x] Run focused/full tests and the end-of-stage project-status audit.
- [ ] Human age-band/device acceptance and release-boundary review remain open.

### Bundle 9 Verification Evidence — 2026-07-18

- [x] TypeScript, ESLint, 83 Vitest tests, analysis validation, production build, format check, and `git diff --check`
      pass when run in the documented sequential order.
- [x] Playwright production-style desktop/mobile browser suite passes: 24 checks covering lesson selection, toolbar
      placement, plant selection without auto-opening, reset, age-band copy, keyboard facing, mobile overflow, reduced
      motion, public read-only mode, and zero page/console errors.
- [x] Read-only analysis of `fixtures/teaching-repo/` produces 9 source nodes and 6 findings: one coverage gap and
      one dead-code signal for each grade band.
- [x] Structure/security audit finds one execution plan, no active generic duplicate trackers, required navigation
      records, and no detected secret literals.
- [ ] The separate public teaching repository, pinned commit, human grade-band review, fullscreen device review, and
      final release acceptance remain open.
- [x] The pre-existing local `next-env.d.ts` state is unchanged; the documented sequential check order passes without
      a generated-file diff.

## Wave 1 Goals — Trust, Onboarding, and Accessible Recovery

- [x] Add a dismissible first-visit guide inside the map.
- [x] Show a persistent Sample Rehearsal/Public Read-only mode banner.
- [x] Add in-map Help/Pause guidance with a re-openable first-visit guide.
- [x] Add a local sample-lesson reset for recoverable demo state.
- [x] Add focused desktop/mobile browser coverage for the new surfaces.
- [x] Run the full project-status audit and reconcile the completed feature records.
- [ ] Human acceptance for desktop, mobile, keyboard-only, and reduced-motion play remains open.

## Wave 2 Goals — Learning Progression and Scaffolding

- [x] Add no-account learner age-band selection for Grades 1–5, 6–8, and 9–12.
- [x] Explain and locally override recommended challenge depth.
- [x] Add a progressive three-step clue ladder without exposing answers or proof.
- [x] Add misconception-aware wrong-answer feedback.
- [x] Add unit and browser regression coverage for the learning surfaces.
- [x] Run the full project-status audit and reconcile the completed feature records.
- [ ] Human acceptance for age appropriateness and accessibility remains open.

### Wave 2 Verification Evidence — 2026-07-18

- [x] Format, lint, typecheck, and 78-test Vitest suite pass.
- [x] Browser matrix rerun after the corrected native-select assertion: 18 desktop/mobile checks pass.
- [x] Full project-status audit: one roadmap, no generic duplicate trackers, no detected secrets, and navigation
      records reconciled.
- [x] End-of-wave structure/security audit rerun: one roadmap, no active duplicate trackers, no detected secrets, and
      required navigation records are present.
- [ ] Human acceptance for age appropriateness and accessibility remains open.

### Wave 3 Verification Evidence — 2026-07-18

- [x] Format, lint, typecheck, 78-test Vitest suite, analysis validation, production build, and `git diff --check` pass.
- [x] Playwright desktop/mobile browser matrix passes: 20 checks, including the in-map action-status transition,
      public read-only mode, reduced motion, keyboard movement, and zero page/console errors.
- [x] Full project-status audit: one canonical execution plan, no active generic duplicate trackers, no detected
      secrets, and required documentation paths present.
- [ ] Human acceptance for age appropriateness, map legibility, reflection wording, and keyboard/touch flow remains
      open.

### Wave 1 Verification Evidence — 2026-07-18

- [x] Format, lint, typecheck, and 77-test Vitest suite pass.
- [x] Playwright desktop/mobile browser suite passes: 16 tests, including onboarding, mode truth, help, reset,
      public read-only behavior, reduced motion, keyboard facing, and zero page/console errors.
- [x] Full project-status audit and documentation structure/security reconciliation pass.
- [ ] Human acceptance remains open.

## Stage 11 Goals

- [x] Generate original cozy pixel-garden terrain/landmark and character/tool/state atlases.
- [x] Convert generated assets to optimized RGBA WebP files under `public/assets/pixel-garden/`.
- [x] Add the typed `lib/garden/assets.ts` manifest with stable atlas coordinates and purposes.
- [x] Project HealthReport health into deterministic healthy, stressed, and withered sprite IDs.
- [x] Integrate authored decorations, tool sprites, plant sprites, and gardener sprite into the map foundation.
- [x] Add focused projection and manifest regression coverage.
- [x] Add final Stage 11 implementation evidence; full visual/human acceptance remains open.

## Stage 12 Goals

- [x] Define a fixed authored map registry with entrance, learning, code-bed, root-crossing, tool, and payoff zones.
- [x] Add deterministic authored walking paths that are visually distinct from analyzed import roots.
- [x] Render map zones and labels over the pixel-art foundation without inventing report content.
- [x] Add regression coverage for fixed map structure, deterministic placement, and truthful plant/root counts.
- [x] Complete full checks, browser wide-shot/mobile verification, documentation reconciliation, and technical
      structure/security verification. Formal human wide-shot acceptance remains open.

### Stage 12 Verification Evidence — 2026-07-18

- [x] Full checks passed: format, lint, typecheck, 58 tests, analysis validation, production build, and diff check.
- [x] Desktop browser smoke rendered six authored zones, two authored paths, 21 pixel sprites, HTTP 200, and zero
      page/console errors.
- [x] Mobile browser smoke rendered six zones with no horizontal overflow and zero page/console errors.
- [x] Structure audit found one canonical `docs/EXECUTION_PLAN.md`, one root tracker/status/decision set, no generic
      duplicate plan/status/decision files, and no detected secret material.
- [ ] Human wide-shot legibility and formal stage acceptance remain open.

### Stage 13 Goals

- [x] Add authored solid areas that block the gardener at buildings, ponds, trees, beds, and landmarks.
- [x] Track the gardener’s facing direction and render the matching sprite after keyboard or button movement.
- [x] Move movement, station, plant-selection, and challenge interactions into the map surface.
- [x] Simplify challenge wording for a broad first-grade-through-high-school audience without weakening server checks.
- [x] Add camera-follow/proximity behavior with Enter and in-map interaction equivalents for nearby plants, stations,
      learning, and payoff areas.
- [x] Complete focused/full checks, desktop/mobile browser verification, and documentation reconciliation.
- [x] Run the end-of-stage project-status audit and reconcile the documentation structure.
- [ ] Obtain human acceptance for map legibility, movement, proximity, and accessibility.

### Stage 13 Verification Evidence — 2026-07-18

- [x] Focused world/projection tests pass; the full suite is 61 tests across 13 files.
- [x] Format, lint, typecheck, analysis validation, production build, and `git diff --check` pass.
- [x] Desktop browser smoke returned HTTP 200, verified the camera CSS variables changed after movement, exposed
      one in-map interaction control, and observed zero page errors.
- [x] Mobile browser smoke verified the map HUD and proximity status with no horizontal overflow or page errors.
- [x] End-of-stage project-status audit completed: one roadmap, one root tracker/status/decision set, valid links,
      no generic duplicates, no detected secrets, and no Code Garden-specific Slack item.
- [ ] Human acceptance remains open.

### Stage 14 Goals

- [x] Add a deterministic in-map journey model for entering, exploring, inspecting, answering, confirming,
      rehearsing, re-analysis, and reflection.
- [x] Advance journey milestones from real map and lifecycle events rather than from a free-form client status.
- [x] Keep public reports visibly read-only and stop their journey at exploration/inspection.
- [x] Keep sample-only rehearsals explicit, preserve health until the server returns final re-analysis, and expose
      failure/error messages without claiming a real branch or PR.
- [x] Keep the journey status, controls, challenge, and payoff inside the map surface with keyboard and reduced-motion
      support.
- [x] Add focused golden-path regression coverage and complete the full technical verification.
- [x] Run the end-of-stage project-status audit and reconcile the documentation structure.
- [ ] Obtain human acceptance for the uninterrupted golden path on desktop and mobile.

### Stage 14 Verification Evidence — 2026-07-18

- [x] Added `lib/garden/golden-path.ts` with ordered, monotonic journey milestones and descriptions.
- [x] Added two focused regression tests; the full suite is now 63 tests across 14 files.
- [x] Map HUD renders 8/8 journey steps and explains the next action; public mode explicitly says read-only.
- [x] Full checks passed: format, lint, typecheck, test, analysis validation, production build, and diff check.
- [x] Desktop production browser smoke returned HTTP 200, rendered the journey HUD, and observed zero page/console
      errors.
- [x] Human test guide and canonical roadmap now describe the Stage 14 journey and its truth boundaries.
- [ ] Mobile human acceptance and formal human stage acceptance remain open.

## Stage 16 Goals — Map readability and interaction guidance

- [x] Increase the map to a large responsive playfield and remove distracting zone borders.
- [x] Add a compact in-map objective ribbon and keep the challenge overlay inside the map.
- [x] Add a yellow target halo and visible guided walkway treatment.
- [x] Keep public reports read-only and the golden path unchanged.
- [ ] Verify desktop/mobile map legibility and no overlay obstruction in human testing.

### Stage 16 Verification Evidence — 2026-07-18

- [x] Focused world/projection tests pass; the suite is now 73 tests across 14 files.
- [x] Format, lint, typecheck, full test suite, analysis validation, production build, and `git diff --check` pass.
- [x] Production HTTP smoke returned 200 for `/` and `/api/health`, 400 for malformed repository input, and rendered
      the journal, map halo, learning journey, and gardener surfaces.
- [x] Final structure/security audit found one roadmap, one root tracker/status/decision set, no generic duplicates,
      and no detected secret literals.
- [ ] Human visual/release acceptance remains open.

## Stage 17–18 Goals — Walkability and release polish

- [x] Add deterministic reachability coverage from the entrance to every required interaction target.
- [x] Verify authored route points agree with collision geometry and route guidance avoids solids.
- [x] Verify all four facing sprites, including blocked-input facing changes, in regression tests.
- [x] Add the local Garden Journal and classroom comparison recap without accounts or server persistence.
- [ ] Complete responsive/mobile/reduced-motion/performance checks and final visual human acceptance.

### Stage 17–18 Verification Evidence — 2026-07-18

- [x] `gardenNavigationTargets` defines walkable approach points for the entrance, learning greenhouse, all tools,
      and reflection bench; BFS reachability tests pass from the gardener start.
- [x] Authored route vertices are tested against solid geometry; collision padding and blocked-input facing are
      covered by focused regression tests.
- [x] Garden Journal and classroom comparison are visible in the app and explicitly local/session-only.
- [x] Full automated checks and final repository structure/security audit pass.
- [ ] Human desktop/mobile/reduced-motion acceptance, performance observation, video, and submission remain open.

### Full verification findings — 2026-07-18

- [x] Sequential format, lint, typecheck, test (77 tests across 14 files), analysis validation, production build,
      and `git diff --check` pass.
- [x] Production HTTP smoke passes for `/` and `/api/health`; malformed repository and explanation payloads return
      readable 400 responses; homepage markers for the journal, target halo, learning journey, and gardener render.
- [x] Structure/security gate passes: one execution plan, one root tracker/status/decision set, no generic duplicate
      tracker files, and no detected secret literals.
- [x] Playwright Chromium desktop/mobile smoke coverage passes for pointer inspection, challenge placement,
      keyboard facing, no overflow, reduced motion, public read-only mode, and browser/page errors.
- [x] `npm audit --omit=dev --audit-level=high` passes after the compatible PostCSS override; no forced framework
      downgrade was accepted.
- [ ] Running typecheck and build concurrently can race on generated `.next/types` files; sequential execution passes.
      Keep the documented verification order.

## Resume Checkpoint — 2026-07-18

- **State:** active after the overnight pause.
- **State update:** Stages 16–18 implementation and technical verification are complete; Stage 18 human/release
  evidence is active.
- **Resume at:** Bundle 8 / Stage 18 final visual and release hardening; implementation is complete and its human/
  release gate is open.
- **Release to test:** `https://coding-garden-iota.vercel.app` at verified production commit `bd77258`; development
  branch head is `1706cd2` and is not yet promoted.
- **Resume order:** Stage 18 browser/release evidence → final audit → human acceptance, video, and submission.

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
- **Stage 10 — Deploy, Video, Submission:** Production is now verified at commit `bd77258` (deployment
  `dpl_FE5RHs7shenW2g9BAonNu7L7jrpa`); video, Devpost, and human acceptance remain open.
- **Stage 11 — Pixel Garden Foundation:** Implementation slice is complete locally: original WebP
  atlases, typed manifest, HealthReport-driven plant sprites, authored decorations, and sprite layers
  are integrated. Final documentation, full audit, and human visual acceptance remain open.
- **Stage 12 — Authored Garden Map:** Implementation slice is complete: fixed map zones, authored paths,
  visible labels, and regression coverage are integrated. Human wide-shot acceptance remains open.
- **Stage 13 — Map-First Movement and Learning:** Implementation slice and formal technical audit are complete:
  direction-aware movement, authored solid areas, in-map controls, clickable plants, camera-follow, nearby
  interactions, and in-map challenge overlay are integrated; human acceptance remains open.
- **Stage 14 — Exploration-to-Learning Golden Path:** Implementation slice and formal technical audit are complete:
  the map visibly tracks the ordered journey through inspection, learning proof, confirmation, sample rehearsal,
  final re-analysis, and reflection; public reports remain read-only; human acceptance remains open.
- **Stage 15 — Seasons as Learning Levels:** Implementation slice is complete: grade-band learning metadata,
  age-appropriate Easy/Medium/Hard prompts, in-map level selection, distinct season palettes, hint reveal, and
  wrong-answer explanations are integrated; human acceptance remains open.

## Historical Foundation Goal

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

### Stage 14–15 closeout slice — 2026-07-18

- [x] Stage 14 keyboard-first map path supports Enter/E nearby interaction; selecting a finding inside the map opens
      its learning question without requiring the lower Inspector.
- [x] Stage 15 questions are authored for Grades 1–12: Easy Grades 1–5, Medium Grades 6–8, Hard Grades 9–12.
- [x] Wrong answers return a hint and a plain-language explanation; the map challenge has a Show hint button and H
      keyboard shortcut.
- [x] Season levels and grade-band guidance live inside the map HUD; season ground palettes are visually distinct.
- [x] Lower plant cards are now a non-interactive text fallback; game actions remain in the map surface.
- [ ] Human desktop/mobile acceptance remains open for sprite facing, map legibility, keyboard-only play, and the
      complete Stage 14–15 loop.

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
- [x] Release implementation commit `235be74`, documentation sync commits `12029f1`/`e858a30`/`8462b1f`/`e9a25fb`,
      and latest accessibility commit `9a2d9c2` are pushed; draft PR #1 reports passing GitHub CI quality,
      Vercel deployment, and Vercel Preview Comments for the latest branch head.
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
- [x] Production promotion: commit `bd77258` is Ready at `https://coding-garden-iota.vercel.app`;
      live smoke returned `/` 200, `/api/health` 200, keyless `POST /api/explain` 200, malformed repository
      and tending payloads 400, mobile sample-mode rendering, and zero page/console errors.

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

## Code review remediation — 2026-07-18

- [x] Restored pointer/touch events for map plant buttons and verified that plant actions open the in-map challenge.
- [x] Replaced client-supplied explanation cache identity with canonical report-content hashing and unknown-node
      validation.
- [x] Replaced predictable demo command IDs with server-issued opaque command tokens; replay, expiry, forged-state,
      and wrong-token tests pass.
- [x] Added deterministic collision resolution for report-derived plant positions and regression coverage for known
      colliding node IDs.
- [x] Added Playwright desktop/mobile smoke coverage: 12 tests pass for pointer inspection, challenge overlay,
      keyboard facing, no overflow, reduced motion, public read-only mode, and browser errors.
- [x] `npm audit --omit=dev --audit-level=high` passes after a compatible PostCSS override; no forced breaking
      dependency update was applied.
- [ ] Human non-coder read-through, two-person wide-shot legibility, real demo-fork PR evidence, video, Devpost,
      and final release acceptance remain open.

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
