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
