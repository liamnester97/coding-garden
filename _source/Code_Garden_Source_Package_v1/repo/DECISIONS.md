# Decision Log

Chronological record of binding decisions. Newest last. A decision here is frozen; changing it requires a new dated entry and human approval.

## 2026-07-17 — Concept adopted: Code Garden

The Build Week V2 submission is Code Garden per `code_garden_brief.pdf`: a living-garden interface over real codebase health, where gardening tools trigger real Codex code changes. Primary track: Education, with crossover into Developer Tools, Work & Productivity, and Apps for Your Life.

## 2026-07-17 — Operating model reused from V1

The project reuses the V1 execution system: master execution plan, AGENTS.md hierarchy, PLAN/STATUS/DECISIONS discipline, bounded vertical slices, stage gates with self-review + independent review + human acceptance.

## 2026-07-17 — Project status audit at stage gates

- Run the project-local `project-status-audit` skill at the end of every stage,
  after technical checks, self-review, independent review, and human acceptance.
- Also run it at the end of each active workday and during final submission
  closeout.
- Treat the audit as a synchronization checkpoint for implementation evidence,
  plans, status, durable notes, and Slack routing. It does not replace human
  acceptance, independent review, or technical quality gates.

## 2026-07-17 — MVP scope freeze (draft, pending Stage 0 human approval)

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

This is a provisional Stage 0 choice pending a rehearsed analysis run; changing it requires a
new decision entry, not a hardcoded analyzer branch.

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

The long-form Build Week blueprint defines eleven ordered execution stages, numbered 0 through
10. A six-stage condensation was introduced during documentation cleanup and was not the intended
roadmap. The outer `docs/EXECUTION_PLAN.md` is the sole canonical roadmap with Stage 0–10;
`PLAN.md` remains only the live stage and slice tracker.

## 2026-07-17 — Documentation ownership boundary

The workspace has one canonical execution roadmap at `docs/EXECUTION_PLAN.md`. The nested
repository owns active supporting records (`PLAN.md`, `STATUS.md`, `DECISIONS.md`, ADRs, risks,
requirements, journey, and deployment notes). Outer duplicate copies are removed; the source
package's `FROZEN_BASELINE.md` is retained only for historical provenance. New documentation must
use an existing owner rather than creating a parallel copy.
