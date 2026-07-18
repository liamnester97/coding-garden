# Code Garden — Execution Plan

This is the implementation source of truth. Work proceeds in bounded vertical
slices, tracked in `PLAN.md`, with durable decisions in `DECISIONS.md` and the
current snapshot in `STATUS.md`.

## Product contract

Code Garden turns a real repository into a deterministic garden. The MVP is:

1. A typed `HealthReport` covering dead code, coverage, complexity, and
   vulnerabilities, with evidence and honest method labels.
2. A garden projection that makes healthy versus unhealthy code legible.
3. Magnifying Glass, Clippers, and Watering Can tool flows.
4. A before/after payoff showing verified diffs or PRs.

The target repo is JavaScript/TypeScript for Build Week. The first live target
is Gentelella, with dumber as the fallback. The bundled sample remains the
offline, no-key path.

## Non-negotiable invariants

- Health signals come from real analysis output, not LLM judgment or visual
  state.
- The renderer is a pure projection of the validated report.
- Target repositories are untrusted; analysis is read-only by default and
  never executes target code outside an explicitly sandboxed runner.
- Changes require typed confirmation, a branch/PR, verification, and
  re-analysis before the garden can change state.
- Sample mode works without an API key.

## Stage roadmap

### Stage 0 — Scope, target, and evidence

Exit criteria: human approval of the MVP scope and target; ADR-001 accepted;
risk owners reviewed; target and fallback recorded; offline fixture curated
from verified findings and committed.

Current state: target, fallback, tool policy, ADR-002, and risk register are
recorded. Human scope approval and fixture curation/commit remain open.

### Stage 1 — Bootstrap and analysis

Exit criteria: local sample app runs; HealthReport validates; CI checks pass;
generic read-only adapter rehearses against the target; entrypoint and finding
confidence are calibrated; fixture snapshot is stable.

Current state: scaffold, sample route, schema, CI, adapter, fixture scaffold,
and Gentelella rehearsal are complete. Calibration and fixture curation are
the active work.

### Stage 2 — Garden projection and renderer

Build the deterministic `HealthReport -> GardenScene` projection, metaphor map,
accessible inspector, stable layout, and healthy/sick visual states. Add golden
projection tests before visual polish.

### Stage 3 — Explanation loop

Add grounded Magnifying Glass explanations, sample canned explanations, and
the see/understand/confirm interaction. The explanation may only use report
evidence and the bounded source excerpt.

### Stage 4 — Verified change loop

Implement typed command lifecycle and the Clippers and Watering Can flows.
Changes land on branches/PRs, checks run, and re-analysis is required before
health changes.

### Stage 5 — Rehearsal, preview, and submission

Connect the preview deployment, rehearse the target flow, perform a non-coder
legibility check, verify a clean clone, record the sub-three-minute demo, and
complete the submission checklist.

Stretch features begin only after the MVP gates above pass: seasons, plant
voices, and generated artwork. Everything else remains roadmap material.

## Quality gate

Every implementation slice must pass:

```text
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run analysis:validate
npm run build
```

Stage completion additionally requires self-review, independent review, and
human acceptance. A failing gate or an unrecorded decision stops promotion to
the next stage.

At every stage boundary, after the technical checks, reviews, and human
acceptance, run the project-local `project-status-audit` skill. Resolve or
explicitly carry forward its findings before starting the next stage. Run the
same audit at the end of each active workday and during final submission
closeout. This audit is a synchronization and decision checkpoint, not a
replacement for human acceptance, independent review, or the required
technical checks.

## Current next slice

Commit the curated offline fixture after human review, then build the deterministic
`HealthReport -> GardenScene` projection and renderer. The fixture captures one
estimated dead-code finding and two estimated coverage gaps from the bundled sample.
Entrypoint calibration is complete for HTML/script references, package metadata,
service workers, config files, and CLI tooling; no finding can authorize a code
change until the verified-change lifecycle is in place.
