# Decision Log

Chronological record of binding decisions. Newest last. A decision here is frozen; changing it requires a new dated entry and human approval.

## 2026-07-17 — Concept adopted: Code Garden

The Build Week V2 submission is Code Garden per `code_garden_brief.pdf`: a living-garden interface over real codebase health, where gardening tools trigger real Codex code changes. Primary track: Education, with crossover into Developer Tools, Work & Productivity, and Apps for Your Life.

## 2026-07-17 — Operating model reused from V1

The project reuses the V1 execution system: master execution plan, AGENTS.md hierarchy, explicit stage-tracker/status/decision-log discipline, bounded vertical slices, stage gates with self-review + independent review + human acceptance.

## 2026-07-17 — Project status audit at stage gates

- Run the project-local `project-status-audit` skill at the end of every stage,
  after technical checks, self-review, independent review, and human acceptance.
- Also run it during final submission closeout.
- Treat the audit as a synchronization checkpoint for implementation evidence,
  plans, status, durable notes, and Slack routing. It does not replace human
  acceptance, independent review, or technical quality gates.

## 2026-07-17 — MVP scope freeze (human-approved)

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

## 2026-07-17 — Provisional demo repository selection

Target repo for the first live adapter: **[ColorlibHQ/gentelella](https://github.com/ColorlibHQ/gentelella)**.
It is MIT-licensed, JavaScript/SCSS/Vite, has 221 tracked files and 58 production pages,
and has enough UI surface to make the garden visually legible. We will analyze it read-only
from a temporary checkout and make any Codex changes only on a fork/branch/PR.

Fallback: **[dumberjs/dumber](https://github.com/dumberjs/dumber)**, an MIT-licensed JavaScript
bundler with a smaller, safer graph if Gentelella proves too noisy or slow.

Offline fixture: the committed deterministic `sample-garden` report remains the no-network
path until the fixture is curated from the selected target. It is intentionally not presented
as a live analysis result.

Initial JavaScript signal policy:

- dead code: import-graph reachability plus ESLint unused-variable findings;
- coverage: estimated from test-file mapping until the target test runner is safely sandboxed;
- complexity: ESLint complexity output;
- vulnerabilities: `npm audit --json`, labeled unavailable when the target cannot be audited offline.

This choice was human-approved on 2026-07-17. Changing it requires a new decision entry and human
approval, not a hardcoded analyzer branch.

## 2026-07-17 — Read-only adapter rehearsal completed

The generic JavaScript/TypeScript adapter was run against a temporary Gentelella checkout without
executing target-repo code. It produced 31 nodes and 70 findings with report hash
`6cb7ad388ad7b14b`. This is sufficient evidence to continue Stage 1, but not to authorize change
actions: calibration is required because configuration, CLI, service-worker, and other tooling
entrypoints can currently be mistaken for dead code. Findings remain advisory until that gate
passes.

## 2026-07-17 — Entrypoint calibration completed

The generic adapter now recognizes HTML script references, package `main`/`browser`/`bin`
metadata, common config files, service workers, and `scripts/`/`bin/` tooling as entrypoints.
A regression fixture confirms that only the genuinely unreachable source file is reported as
dead code. This removes the known false-positive class from the Gentelella rehearsal; findings
remain advisory until the offline fixture is curated and the verified-change lifecycle exists.

## 2026-07-17 — Offline analyzer fixture curated

`fixtures/sample-report.json` is the schema-validated output of the generic adapter against
`fixtures/sample-repo`. It records three source nodes, one estimated dead-code finding for
`src/unused.js`, and two estimated coverage gaps. A regression test compares the analyzer output
to this snapshot. The snapshot was subsequently committed in `5403100` and pushed to the draft PR;
human scope approval remains a separate open gate.

## 2026-07-17 — Garden projection is a pure report view

The first garden renderer consumes a typed `GardenScene` produced solely by the validated
`HealthReport`. Node identity determines stable positions, the metaphor registry defines health
and finding labels, and accessibility text is generated from the same evidence. The renderer may
show pending interaction states later, but it cannot improve a plant until re-analysis confirms
the change.

## 2026-07-17 — Inspector selection is a report-grounded view state

Plant cards are accessible buttons. Selecting a plant changes only local view state and opens an
inspector with the projected health label, finding summary, and evidence source. The inspector
does not infer new findings or authorize changes; it is a read-only bridge into the later
explanation flow.

## 2026-07-17 — Stage-sized review cadence

Implementation should proceed through a complete stage before interrupting the human owner for a
full quality review. Focused checks may be used during individual slices, while the complete
technical suite, documentation reconciliation, independent review, human acceptance, and
project-status audit run together at the stage boundary. This keeps execution moving while
preserving a deliberate promotion gate.

## 2026-07-17 — Restore the canonical Stage 0–10 roadmap

The long-form Build Week blueprint defines eleven ordered execution stages, numbered 0 through 10. A six-stage condensation was introduced during documentation cleanup and was not the intended
roadmap. `docs/EXECUTION_PLAN.md` is the sole canonical roadmap with Stage 0–10;
`STAGE_TRACKER.md` remains only the live stage and slice tracker.

## 2026-07-17 — Documentation ownership boundary

The workspace has one canonical execution roadmap at `docs/EXECUTION_PLAN.md`. This repository
owns active supporting records (`STAGE_TRACKER.md`, `PROJECT_STATUS.md`, `DECISION_LOG.md`, ADRs, risks,
requirements, journey, and deployment notes). Outer duplicate copies are removed; the source
package's `FROZEN_BASELINE.md` is retained only for historical provenance. New documentation must
use an existing owner rather than creating a parallel copy.

## 2026-07-17 — Documentation structure is a stage gate

Every stage-boundary audit must verify navigation and ownership, not only implementation status:
the root README must be the front door, the long-form `docs/EXECUTION_PLAN.md` must be the sole
roadmap, the active repo must use explicitly named tracker files, generic duplicate tracker names
must be absent, and documented paths must resolve. A structure violation blocks stage promotion
until reconciled.

## 2026-07-17 — Standalone public-release boundary

The MVP will be a standalone public web app hosted on Vercel. The first repository intake accepts
only normalized public GitHub URLs for read-only analysis and requires no user login. Sample mode
remains the deterministic no-credential fallback. Private repositories, OAuth/App permissions,
long-running hosted analysis jobs, and per-user persistence are later capabilities behind the same
repository-adapter boundary. This avoids a demo-only architecture while keeping the first release
safe and achievable.

## 2026-07-17 — Stage 1 technical closeout evidence

The Stage 1 implementation and deployment evidence is complete: 14 local tests pass, GitHub CI is
green, the branch is clean and pushed, and the anonymous Vercel preview plus health, explanation,
and public-repository routes have been smoke-tested. Liam approved Stage 1 promotion on 2026-07-17.
Automated GitHub CI/PR verification plus agent self-review are the independent evidence available;
no separate human reviewer was available.

## 2026-07-18 — Golden path is an explicit map journey

Stage 14 uses a deterministic local journey model inside the map HUD: Enter → Explore → Inspect → Answer → Confirm
→ Tend → Re-analyze → Reflect. Milestones are advanced by actual movement, selection, challenge-proof, confirmation,
server lifecycle, and final report-update events. Public reports intentionally stop at read-only exploration and
inspection; only the bundled sample can rehearse tending. This makes the educational path visible without weakening
the server-authoritative command registry or claiming real repository mutation.

## 2026-07-18 — Grade-band learning and map-only game controls

Stages 14–15 use the map as the primary game surface. Enter/E nearby interaction opens a finding challenge, H or
Show hint reveals help, and wrong answers return a plain-language explanation before the player can retry. Sample
levels target Grades 1–5, 6–8, and 9–12 with Easy notice/count, Medium clue connection, and Hard safe-next-step
questions. The lower plant list and Inspector remain non-interactive evidence fallbacks; public reports remain
read-only and season presentation never changes HealthReport truth.

## 2026-07-17 — Stage 0–1 promotion approved

Liam approved the Stage 0 scope freeze and Stage 1 promotion. Stage 0 and Stage 1 are complete in
the tracker. Automated GitHub CI/PR verification plus agent self-review are the independent review
evidence available for this milestone; no separate human reviewer was available. Stage 2 is now
the sole active stage and must use the existing canonical Stage 0–10 execution plan.

## 2026-07-17 — Bounded public GitHub analysis adapter

Stage 2 uses GitHub's public metadata/tree/raw endpoints rather than cloning, installing, or
executing an untrusted repository. The adapter resolves the default branch, downloads only
JavaScript/TypeScript/HTML/JSON blobs into a temporary workspace, caps intake at 120 files, 256 KB
per file, and 2 MB total, then runs the deterministic analyzer and deletes the workspace. The
Gentelella rehearsal completed at commit `c4515bd2682660d79d6d0e64160a57cd86482451` with 31 nodes,
63 findings, and report hash `da302756ed12d03b`. A deliberate cached snapshot and hosted-route
smoke test remain before the Stage 2 boundary audit.

## 2026-07-17 — Stage 2 closeout

Stage 2 acceptance is complete. The bounded public GitHub adapter was rehearsed against
ColorlibHQ/gentelella at commit `c4515bd2682660d79d6d0e64160a57cd86482451`, producing 31 nodes,
63 advisory findings, and report hash `da302756ed12d03b`; the evidence manifest is committed at
`fixtures/gentelella-rehearsal.json`. The hosted Node route was smoke-tested anonymously, the full
quality suite passed, and the project-status audit plus documentation structure gate found no
duplicate roadmap or tracker files. Stage 3 is now the sole active stage.

## 2026-07-17 — Stage 3 closeout: truthful roots and public garden rendering

Stage 3 is complete. The validated HealthReport now carries analyzer import edges into the pure
`GardenScene` projection, and the public UI renders those edges as SVG roots alongside stable plant
positions. The hosted Gentelella path rendered 31 plants, 41 roots, and 63 findings at the pinned
commit `c4515bd2682660d79d6d0e64160a57cd86482451` with report hash `da302756ed12d03b`; target code
was not executed. Keyboard traversal, mobile rendering, wide-shot legibility, reduced-motion CSS,
local checks, hosted UI smoke, documentation structure, durable-context, Slack, and sensitive-content
checks passed. Stage 4 is now the active stage; the existing deterministic explanation fallback stays
the no-key path while live GPT-5.6 narration awaits `OPENAI_API_KEY` and prompt acceptance.

## 2026-07-17 — Public analysis safeguards and bounded-report disclosure

The standalone login-free release keeps the existing 120-file, 256 KB per-file, and 2 MB total
limits. Public analysis requests now use strict URL validation, a best-effort in-memory limit of five
uncached analyses per client IP per ten minutes, five-minute report caching keyed by normalized
repository URL plus resolved commit, and ten-second timeouts for GitHub requests. This avoids adding
an external service while limiting accidental and abusive load; Vercel instances may enforce the
best-effort limit independently.

The HealthReport contract now records whether analysis is complete or bounded and reports supported,
analyzed, and omitted file counts. GitHub candidates are sorted before capping so the bounded slice is
repeatable, and the UI explicitly discloses partial scope. Import relationships are unique by
`from -> to` before they reach the garden renderer. These safeguards preserve deterministic analysis
truth and make incompleteness visible rather than presenting a partial report as complete.

## 2026-07-18 — Key-optional Magnifying Glass adapter

Stage 4 keeps the public release login-free and key-optional. The explanation route receives the
validated HealthReport being viewed, sends only that report-grounded context to a server-side GPT-5.6
Responses API adapter when `OPENAI_API_KEY` is configured, validates the returned explanation shape,
and caches results by report hash plus node ID. An eight-second timeout, invalid-output handling, and
the deterministic explanation fallback ensure the garden remains usable without live AI. The pure
fallback lives in `lib/garden/`; server-only model orchestration remains in `lib/ai/`. Five versioned
prompt/evidence contract cases protect the grounding boundary. Live-key acceptance is optional for
the standalone release and remains a human stage-gate decision.

## 2026-07-18 — Demo-rehearsal change lifecycle through Stage 8

To keep the public release standalone and safe while real Codex/GitHub credentials are unavailable,
the first Clippers and Watering Can implementation uses an explicitly labeled `demo-rehearsal` mode.
It validates the same typed lifecycle as the live path, never emits a fake PR URL, and only changes
the displayed report after a deterministic re-analysis removes the finding. The implementation is
shared with the Pesticide stretch tool. Stage 7 records rehearsal outcomes and classroom comparison;
Stage 8 adds deterministic sample seasons and report-grounded plant voices. Real demo-fork PRs and
human playthrough/legibility evidence remain required before those stages can be called fully accepted.

## 2026-07-18 — Stage 7 golden path and Stage 8 stretch scope

The local golden path is now Magnifying Glass → Clippers → Watering Can → payoff/classroom comparison.
The first Stage 8 slices are seasons and deterministic plant voices because they are offline, cheap to
verify, and preserve the truth boundary. Pesticide is lifecycle-ready but dormant until a real
vulnerability finding exists. AI-painted backdrop is deferred so generated art cannot encode health.
A mobile production browser rehearsal passed; two-person wide-shot legibility, independent review,
and real demo-fork PR evidence remain explicit acceptance gates.

## 2026-07-18 — Review hardening: sample-only rehearsals and bounded anonymous AI

The public report path remains strictly read-only. Tending controls are available only for the
bundled offline sample and require an explicit confirmation card. The `/api/tend` route owns an
in-memory command registry with bounded lifetime and rejects forged, skipped, replayed, mismatched,
or expired transitions. The demo may lose an in-progress command after a server restart and must
show a recoverable restart/expiry message rather than claim success.

The public GitHub analysis cache is keyed by normalized repository URL plus the currently resolved
commit SHA, preventing a new default-branch commit from receiving a stale report. The anonymous
explanation route bounds report/request size and uses a best-effort 30-request-per-IP, ten-minute
limit for uncached requests while preserving deterministic no-key fallback behavior.

## 2026-07-18 — Execution bundle cadence

The canonical Stage 0–10 roadmap remains unchanged as the product hierarchy. To make execution
manageable in bounded Codex goals, work is now grouped into six execution bundles: Foundation and
Truth; Understand and Learn; Act Safely; Playable Garden World; Progression and Classroom Value; and
Hardening and Release. A bundle contains four implementation goals by default and closes with focused
review, the project-status audit, documentation reconciliation, and human acceptance. Bundles are a
delivery cadence inside `docs/EXECUTION_PLAN.md`, not a second roadmap or tracker. Bundle 1 has
implementation evidence from Stages 0–3, but bundle-level human acceptance remains open. The four-stage
implementation cycle has now completed its local slices; external acceptance gates remain explicit.

## 2026-07-18 — Learning gate and first playable garden world

The next four implementation stages now share a deterministic learning contract. Before a sample
Clippers, Watering Can, or Pesticide rehearsal can start, the player receives an authored,
report-grounded Easy/Medium/Hard question; the server validates the answer and issues a short-lived
proof, while `/api/tend` remains the authority for command state. Incorrect answers provide a hint
and never change the report. Public GitHub reports remain read-only. The garden also gained a
keyboard-operable 2D gardener avatar and named tool stations; movement is presentation state and
does not alter HealthReport truth. Real branch/PR execution, non-coder comprehension, and two-person
wide-shot evidence remain open gates rather than simulated claims.

## 2026-07-18 — Stage 9 hardening boundary

The release keeps all protection in bounded in-memory registries and schemas: challenge answers are
limited before grading, challenge proofs are single-use and expiring, command transitions expire and
reject replay/forgery, and failed rehearsals leave HealthReport findings unchanged. The release remains
login-free and public-report read-only. Stage 10 production deployment, video, and Devpost evidence are
not marked complete until independently observed and recorded.

## 2026-07-18 — Stage 10 preview evidence

The verified implementation was committed as `3fb549f` and pushed to
`agent/health-report-foundation`. Draft PR #1 reports passing GitHub CI quality, Vercel deployment,
and Vercel Preview Comments. The preview URL is
`https://coding-garden-git-agent-health-report-foundation-code-garden.vercel.app`. This proves preview
readiness only; production promotion, video, Devpost submission, real live PR evidence, and human
acceptance remain open.

## 2026-07-18 — Season progression maps to challenge difficulty

The offline sample seasons now provide a deterministic educational progression: Early spring is Level 1
with Easy recognition questions, Mid-summer is Level 2 with Medium evidence-connection questions, and
Late summer is Level 3 with Hard reasoning questions. Selecting a season resets stale challenge state;
it does not alter public reports or invent HealthReport findings. The classroom payoff explains the loop
and counts only completed sample rehearsals.

## 2026-07-18 — Stage 10 production evidence

The CI-verified commit `235be74` was promoted to the Vercel production project. The canonical public
URL is `https://coding-garden-iota.vercel.app`; deployment
`coding-garden-38w8yw6ne-code-garden.vercel.app` reported Ready. Live smoke checks returned HTTP 200
for `/` and `/api/health`, and HTTP 400 for malformed repository input. Video, Devpost submission,
human acceptance, and real PR evidence remain explicitly open.

## 2026-07-18 — Stage 9/10 browser acceptance evidence

Production browser smoke at `https://coding-garden-iota.vercel.app` verified the mobile surface, sample
mode/source labels, and zero page or console errors. The Clippers golden path made zero `/api/tend`
requests before confirmation; after the authored answer was accepted, the server-authoritative sample
rehearsal completed all transitions to `landed`. This is technical evidence only; second-person
legibility, human acceptance, real PR evidence, video, and Devpost submission remain open.

## 2026-07-18 — Public production analysis evidence

The production release completed an anonymous read-only analysis of `ColorlibHQ/gentelella` at commit
`c4515bd2682660d79d6d0e64160a57cd86482451`, producing 31 nodes and 63 findings from 96 supported files
with no bounded-analysis omissions. This confirms the public repository path without granting the app
write access to the target repository. Human acceptance, real PR evidence, video, and Devpost submission
remain open.

## 2026-07-18 — Submission documentation and license evidence

The public repository now carries an MIT license and a root README project narrative with fresh-clone
setup, production-style commands, sample-mode behavior, and links to the human-test guide. The
submission checklist marks the Education track, project description, repository link, and README as
evidenced. Video, human acceptance, and Devpost submission remain open.

The README now also contains the concise submission narrative: Education-track purpose, deterministic
report-to-garden architecture, Codex/GPT-5.6 roles, and the honest sample-only rehearsal boundary.

The canonical storyboard and human-test guide now use the same release boundary: the public recording
shows sample-only server-authoritative rehearsals and before/after HealthReport evidence, while any
credentialed real branch/PR work must be a separately labeled future integration segment.

## 2026-07-18 — Production promotion updated after audit reconciliation

The CI-green audit head `bd77258` was intentionally promoted to the Vercel production project after
the accessibility and documentation-audit slices passed. Deployment `dpl_FE5RHs7shenW2g9BAonNu7L7jrpa`
reported Ready at `https://coding-garden-iota.vercel.app`. Live checks confirmed the homepage, health
route, keyless explanation fallback, malformed-input responses, mobile sample mode, and zero browser
errors. This updates the earlier Stage 10 production evidence; it does not close human acceptance,
real PR, video, or Devpost gates.

## 2026-07-18 — Production browser matrix evidence

Production browser rehearsal covered both sample tools: Clippers and Watering Can each made zero
`/api/tend` requests before confirmation and reached `landed` only after a correct answer. The same
matrix covered mobile layout, Level 3/Hard season selection, keyboard focus, invalid-input alerts,
public read-only controls, reduced motion, and zero page/console errors.

The Inspector copy was tightened for the non-coder acceptance gate: raw analyzer tool identifiers are
translated into readable labels such as “import map” and “test-file check,” while the deterministic
evidence remains unchanged. The copy is protected by a regression test; human comprehension review is
still required.

The learning dialog now explicitly manages keyboard focus, exposes `aria-modal` and a description, and
supports Escape cancellation. Local production browser smoke verified the focus target and cancellation
behavior with zero errors; this is automated evidence, not a substitute for human accessibility review.

## 2026-07-18 — Authored pixel-garden visual direction

The current SVG garden is a functional prototype but is not the intended final game presentation. The
next implementation bundle adopts a cozy 16-bit-inspired pixel-garden visual language with one fixed,
authored top-down map. Original generated sprite atlases are stored as optimized RGBA WebP assets under
`public/assets/pixel-garden/` and are indexed by the typed `lib/garden/assets.ts` manifest. The renderer
uses the assets for authored decoration, tools, plants, and the gardener, while HealthReport remains the
only authority for plant health, findings, roots, and action availability.

This visual expansion intentionally adopts exploration, learning, and reward feedback from the game
reference while deferring combat, bosses, procedural worlds, accounts, leaderboards, multiplayer, and
server-persistent player profiles. The production build remains a fallback until the authored world and
human visual acceptance gates pass.

## 2026-07-18 — Overnight hibernation checkpoint

Paused execution after the Bundle 6 technical release gate and production promotion. This is an operating
pause, not a scope or roadmap change. Resume at the documented human/release gates: non-coder
explanation read-through, two-person legibility, real-PR boundary evidence, video, Devpost, and final
acceptance. Do not start a new bundle until those gates are reviewed and reconciled.

## 2026-07-18 — Stage 12 fixed authored map

Stage 12 uses one deterministic authored top-down map rather than a procedural or report-sized world.
The map registry defines the entrance, learning greenhouse, code beds, root crossing, tool shed, and
payoff/reflection area, plus authored walking paths. These are presentation and navigation surfaces;
they never create HealthReport nodes, findings, roots, or health changes. Report-derived plants and
import roots continue to be projected from the validated report and remain stable across repeated runs.
Stage 13 owns collision, camera, and proximity interaction behavior; Stage 12 only establishes the
truthful, legible world layout.

## 2026-07-18 — Map-first learning controls and broad age range

The authored garden is the primary game surface: movement, station controls, plant selection, and the learning
question belong inside the map. The lower Inspector and plant list remain as an accessible text/evidence fallback.
The gardener must face its last travel direction and stop at authored solid landmarks so the map reads as a real
place rather than a decorative background. Challenge copy is intentionally short and concrete for first-grade
through high-school learners; difficulty still controls the reasoning depth and is validated server-side.

## 2026-07-18 — Camera-follow and proximity interaction slice

Stage 13 keeps the authored garden as one playable field by shifting a camera-follow world layer around the gardener
while leaving the map HUD and challenge overlay accessible. Nearby interaction uses one shared target model for
plants, stations, the learning greenhouse, and the reflection bench. Enter and the in-map action button are equivalent
inputs; proximity selects or explains a target but never changes HealthReport health, starts a public-repository action,
or claims a real branch/PR mutation.

## 2026-07-18 — Map readability and navigation treatment

The authored map remains the primary game surface. Stage 16–18 visual work uses a large responsive playfield, subdued
zone borders, a compact in-map objective ribbon, a soft yellow halo for the next target, and visible guided walkways.
Questions remain inside the map but use a bounded overlay so the surrounding world stays visible. Stage 17 treats
walkways as navigation data and requires collision/reachability evidence for every required interaction target. Stage 18
verifies that blocked movement preserves position but immediately changes the gardener's facing direction. These changes
are presentation/navigation improvements only; HealthReport truth, public read-only behavior, and sample-only tending
boundaries remain unchanged.
