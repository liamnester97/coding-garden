# Revision Notes — Code Garden v1.0

## Provenance

- **Source concept:** `code_garden_brief.pdf` (human-authored, July 2026) — "Code Garden: a living, playable ecosystem for understanding and tending codebases."
- **Predecessor:** the V1 Build Week project ("AI Night at the Museum") established the documentation and execution system this package reuses: master execution plan + AGENTS.md hierarchy + PLAN/STATUS/DECISIONS discipline + staged roadmap with review gates. Code Garden is a new product on that proven operating model.
- **Competition:** OpenAI Build Week Challenge (Devpost). Deadline **Tuesday, July 21, 2026, 5:00 PM PT**. Built with Codex + GPT-5.6 (required). Primary track: **Education**, with deliberate crossover into Developer Tools, Work & Productivity, and Apps for Your Life.

## The concept in one paragraph

Code Garden turns any codebase into a living garden. Functions are plants, dependencies are roots, test coverage is sunlight, bugs are pests, dead code is decay, tech debt is erosion. The player is the gardener holding real tools: clipping a withered branch makes Codex actually remove the dead code; watering a drought zone makes Codex actually write the missing tests. The design rule is that you cannot act without understanding — every action is preceded by a plain-English explanation. Core promise: a non-coder can walk through a codebase and genuinely understand it without reading a line of code.

## Approved MVP interpretation (the scope freeze baked into this plan)

Per the brief's own "4-Day Reality Check," the MVP is frozen to the Must-Have tier:

1. **One analyzed repo at a time** — a deliberately chosen, famously messy open-source demo repo plus a cached offline sample.
2. **Repo analysis pipeline** producing a deterministic HealthReport: dead/unused code, test coverage, complexity, vulnerabilities.
3. **Garden rendering** — the HealthReport projected deterministically into a garden scene that instantly reads healthy vs. sick.
4. **Three tools end-to-end:** Magnifying Glass (plain-English explanation — the non-coder core), Clippers (dead-code removal via real Codex change), Watering Can (test generation via real Codex change).
5. **The before/after payoff moment** for the demo video, with the real diffs/PRs shown underneath.

**Should-Have (only after the MVP gates pass):** git-history season scrubbing (simplified 3–4 snapshots), plants talking back (text voice), Codex-generated garden artwork.

**Nice-to-Have (roadmap only, written up, not built):** overnight autonomous tending, org-level multi-plot landscape, invasive-species spread animation, custom team Skills, computer-use visual inspection, personal GitHub-profile gardens.

## Key decisions encoded in this plan

- **Deterministic garden truth (ADR-002):** health signals come from real static-analysis tooling, never from LLM opinion; garden state changes only when a verified code change lands; every tool action is a typed, confirmed, reversible command that goes through a branch/PR, never a destructive write to the default branch.
- **Non-coders first:** the Magnifying Glass explanation quality is a P0 product requirement, not polish.
- **Works without an API key:** the app must demo on a cached sample repo with pre-computed analysis and canned explanations if the API is unavailable.
- **Education track anchor:** framing, copy, and demo emphasize the teaching moment (healthy vs. sick codebase comparison).
- **Safety:** the analyzed repo is untrusted input; analysis runs sandboxed and never executes target-repo code outside controlled test runners.
