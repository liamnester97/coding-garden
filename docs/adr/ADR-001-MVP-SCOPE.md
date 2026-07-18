# ADR-001: MVP Scope — One Repo, Three Tools, One Payoff

Status: Accepted

## Context

The brief lists five tools and nine signature features. The submission deadline is July 21, 2026 — roughly four build days. The demo video is what judges primarily experience. The brief itself provides a Must/Should/Nice triage ("4-Day Reality Check").

## Decision

Build exactly the Must-Have tier as the MVP:

1. **Analysis pipeline** → deterministic HealthReport (dead code, coverage, complexity, vulnerabilities) for one target repo at a time, plus a bundled offline sample.
2. **Garden rendering** that instantly reads healthy vs. sick.
3. **Three tools end-to-end:** Magnifying Glass (read-only explanation), Clippers (dead-code removal), Watering Can (test generation) — each producing a real Codex change via branch/PR.
4. **The before/after payoff moment** with real diffs shown.

The MVP is released as a standalone public web app. Public GitHub repositories are the first
external input path and require no user login; the bundled sample remains the deterministic
fallback. Private-repository support is deferred to a separately reviewed GitHub OAuth/App flow.

Should-Have (started only after all MVP stage gates pass): simplified season scrubbing (3–4 git snapshots), text-based plant voices, Codex-generated garden artwork. Nice-to-Have items are written up as roadmap only.

## Consequences

- Pesticide Spray and Fertilizer are stretch, despite being in the core tool table — Clippers + Watering Can already prove the "action → real change" loop twice.
- The org landscape, overnight tending, custom Skills, computer use, and profile gardens do not gate anything; they appear in the submission writeup as roadmap.
- Every stage in the roadmap (Execution Plan §9) is scoped so that stopping after it still leaves a demoable product.
