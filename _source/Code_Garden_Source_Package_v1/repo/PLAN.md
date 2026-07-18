# Active Implementation Plan

## Stage

Stage 0 - Discovery, Scope Freeze, and Demo Repo Selection

## Goal

Freeze the MVP scope, select the demo target repo and the offline sample repo, and record the founding decisions so Stage 1 can bootstrap the repository without open questions.

## Acceptance Criteria

- [ ] MVP scope frozen and recorded in `DECISIONS.md` (one repo, three tools, before/after payoff; Should/Nice tiers deferred).
- [ ] Demo target repo selected: public, permissively licensed, famously messy, analyzable by the chosen toolchain.
- [ ] Offline sample repo selected/created and committed as fixture data.
- [ ] Health-signal toolchain chosen per signal (dead code, coverage, complexity, vulnerabilities) and recorded in `DECISIONS.md`.
- [ ] ADR-001 (MVP scope) and ADR-002 (deterministic garden truth) accepted.
- [ ] Risk register reviewed and owners assigned.
- [ ] Human owner approves the scope decision.

## Proposed Steps

1. Review `docs/EXECUTION_PLAN.md` Sections 1-4 and confirm the Must-Have tier is buildable in the remaining days.
2. Evaluate 2-3 candidate demo repos against the criteria in Section 3; pick one and a fallback.
3. Choose the analysis toolchain for the target language and record trade-offs.
4. Record all decisions; obtain human approval.

## Risks

- Choosing a demo repo whose language/toolchain the analysis pipeline cannot cover in time (mitigate: pick a repo in the same language as the app's own toolchain).
- Scope creep into Should-Have features before the demo path exists.

## Out of Scope

- All application code. Seasons scrubbing, plant voices, pesticide, generated artwork, org view, overnight tending, computer use.

## Evidence

- (record decision links, candidate evaluations, and approvals here)

## Completion

- [ ] Self-review
- [ ] Independent review
- [ ] Human acceptance
- [ ] `STATUS.md` updated
