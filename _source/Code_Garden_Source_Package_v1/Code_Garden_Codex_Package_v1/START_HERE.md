# Start Here — Code Garden Execution Baseline v1.0

This package contains the controlled version 1.0 execution baseline for **Code Garden**, the OpenAI Build Week 2026 submission.

## Codex startup sequence

1. Create the project repository (empty; the human owner creates it manually).
2. Copy the contents of the sibling `repo/` folder into the repository root (README, AGENTS.md, PLAN.md, STATUS.md, DECISIONS.md, `docs/`, `.github/`).
3. The original package baseline is preserved as `docs/FROZEN_BASELINE.md`; the workspace's
   canonical execution plan is `docs/EXECUTION_PLAN.md`.
4. Ask Codex to read the active repository's `AGENTS.md` and the workspace's `docs/EXECUTION_PLAN.md` in full before
   changing any code.
5. Begin at **Stage 0 — Discovery, Scope Freeze, and Demo Repo Selection**.
6. Copy that stage's goal block from Section 9 of the execution plan into Codex.
7. Use `/plan` only for the next bounded vertical slice — never plan more than one stage ahead in code.
8. Do not begin a stretch feature (seasons, voices, pesticide, generated art) until the Must-Have demo path (analysis → garden → Magnifying Glass → Clippers → Watering Can → before/after) passes its full acceptance and review gates.
9. Keep deterministic garden truth in the analysis engine; neither GPT-5.6 nor the render layer may change garden health directly. Garden health changes only when a verified code change lands.

## Package contents

- `START_HERE.md` — this file.
- `REVISION_NOTES.md` — concept provenance and the approved MVP interpretation.
- `docs/FROZEN_BASELINE.md` — the original tip-to-tail source baseline, retained for provenance only.
- `../repo/` — ready-to-copy repository scaffold (root docs, ADRs, risk register, PR template, scoped AGENTS.md files).
- `../code_garden_brief.pdf` — the original human-authored concept brief.

The brief PDF is the human-readable concept baseline. The workspace Markdown execution plan is the
implementation source of truth; where they differ, the execution plan wins because it encodes the
approved scope freeze.
