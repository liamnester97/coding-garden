# Code Garden Change Log and Design-Brief Gap Analysis

This file records material product realignment. It is not a roadmap, stage tracker,
or status snapshot. The canonical roadmap remains `docs/EXECUTION_PLAN.md`.

## 2026-07-19 — Design brief comparison

Source documents reviewed:

- `CODE_GARDEN_DESIGN_BRIEF_FINAL.md` from Downloads;
- `CGFeedback.txt` from Downloads;
- current `docs/EXECUTION_PLAN.md`;
- current implementation and tests.

| Requirement area | Current state before Bundle 13 | Planned disposition |
| --- | --- | --- |
| Python teaching fixture | Missing; demo content was JavaScript/TypeScript | Replace the dedicated demo with one authored Python fixture. |
| Authored question count | Five demo questions | Add 20 total: 10 Easy, 5 Medium, 5 Hard. |
| Session selection | Five fixed demo findings | Easy selects five from ten; Medium/Hard use all five. |
| Static map | Existing responsive garden with legacy world chrome | Refine to one fixed, single-screen, non-scrolling teaching map. |
| Reachability/collision | Partially implemented and tested | Require 2–3 tile paths, explicit collision grid, and every target reachable. |
| Target guidance | Unfinished halos and dialogue exist, but copy/layout need migration | Use contained two-sentence bubbles, gold unfinished guidance, and healthy-state swaps. |
| Question UI | Existing challenge UI includes legacy metadata and generic fallbacks | Reduce to code, question, four choices, Submit, Hint, Example, and post-correct Explanation. |
| Retry behavior | Covered for the current challenge contract | Preserve automatic wrong-answer reset and fresh re-evaluation. |
| Intro screen | Not the current default flow | Add title/story screen with Start Game and difficulty selection. |
| Completion output | Partial reviewable completion payoff | Add recap, before/after, fixes, evidence, copy, download, patch, PDF/print, replay, and reset. |
| Safety boundary | Public analysis read-only; sample rehearsals server-authoritative | Keep the fixture read-only, never execute it, and never silently overwrite code. |
| Persistence | Session-local behavior exists | Explicitly forbid localStorage, accounts, cloud persistence, and server progress. |
| Visual direction | Cozy pixel-garden implementation exists | Apply the pixel-garden palette, sizing, asset, motion, and validation contract. |
| Deployment | Vercel/Next deployment exists | Keep the demo self-contained and network-independent while preserving public API routes. |
| Future scope | Future intake and integration boundaries are documented | Preserve GitHub URL, ZIP/folder, individual-file, AI, audio, teacher, persistence, and multiplayer boundaries as future only. |

## Implementation order

Bundle 13 in `docs/EXECUTION_PLAN.md` is the approved execution sequence. Documentation
must be synchronized first, then fixture/content, map, dialogue, completion outputs,
visual/accessibility refinement, and final verification/audit.

## Next feedback loop

Stage 44 in `docs/EXECUTION_PLAN.md` is the next bounded human-playtest refinement pass. It is
not a second roadmap: Liam's local/deployed testing will supply concrete findings for map scale,
reachability, keyboard interaction, beginner comprehension, retry/help behavior, healing,
completion outputs, reset, mobile layout, and safe-output wording. Confirmed defects will receive
focused regression coverage before the next verification and push.
