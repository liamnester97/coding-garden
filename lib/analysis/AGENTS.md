# Analysis Engine Instructions (`lib/analysis/`)

## What this module owns

The single source of garden truth: parsing the target repo and producing the typed, schema-validated **HealthReport** (dead/unused code, test coverage, complexity, vulnerabilities), plus re-analysis after a change lands.

## Rules

- Pure with respect to inputs: same repo state → same HealthReport. No timestamps, randomness, or environment-dependent output inside the report body.
- No imports from React, the render layer, or any OpenAI/LLM client. No network calls except the analysis tooling itself requires them (e.g., advisory databases) — and those results must be cached into fixtures for the sample repo.
- Every signal in the report names its tool and evidence (file, line range, metric value). "The model thinks so" is never evidence.
- Conservative labels: prefer "possibly unused" over "dead" when static analysis cannot prove it.
- The analyzed repo is untrusted input. Never execute its code here. Test execution belongs to the sandboxed change-verification pipeline, not analysis.
- Schema changes to HealthReport require updating the Zod schema, the golden snapshots, and the projection in `lib/garden/` in the same PR.
- Every behavior change ships with unit tests; golden snapshots for the bundled sample repo are updated deliberately, never regenerated blindly.
