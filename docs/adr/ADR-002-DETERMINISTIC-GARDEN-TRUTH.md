# ADR-002: Deterministic Garden Truth

Status: Accepted

## Context

The product's credibility rests on the garden being _true_: "the state of the garden is determined by the actual state of the code — not a dashboard, not a chart" (brief). An LLM hallucinating health signals, or a visual layer inventing state, would destroy both the developer-tool value and the education value. The V1 project proved the pattern: deterministic domain owns truth; AI interprets and narrates.

## Decision

1. **Health signals come only from real analysis tooling.** Dead code, coverage, complexity, and vulnerabilities are computed by static-analysis/coverage/audit tools into a typed, schema-validated **HealthReport**. The LLM never contributes a health signal.
2. **Garden state is a pure projection.** `HealthReport → GardenScene` is a deterministic, tested function. Same report, same garden, every time. The render layer only draws the GardenScene.
3. **Garden health changes only when verified code changes land.** A tool action dispatches a Codex task on a branch; the change is verified (tests/checks pass, PR opened); analysis re-runs; the new HealthReport re-projects. No optimistic health updates.
4. **Every tool action is a typed command** with the lifecycle: see → understand (explanation shown) → confirm → act → verify → re-analyze. Commands are validated, idempotent where retried, and reversible (branch/PR; revert path documented).
5. **The LLM's roles are bounded:** explain (Magnifying Glass, grounded strictly in the HealthReport + source), narrate (voices/personality, stretch), and propose changes (via Codex). Explanations that assert findings not present in the HealthReport are defects.
6. **Safety boundary:** the analyzed repo is untrusted. Static analysis by default; any execution (e.g., running its tests) happens in a sandbox without secrets. No writes to any default branch, ever.

## Consequences

- The offline demo mode falls out for free: cache a HealthReport + canned explanations and the whole garden works without the API.
- Testing is tractable: golden HealthReport snapshots and projection unit tests pin the garden's truthfulness.
- Latency after a tool action is honest (re-analysis takes time); the UI shows the change as "landing" until verification completes rather than faking instant health.
