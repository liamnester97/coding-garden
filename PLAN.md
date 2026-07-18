# Active Implementation Plan

## Stage

Stage 0 - Discovery, Scope Freeze, and Demo Repo Selection

## Goal

Freeze the MVP scope, select the demo target repo and the offline sample repo, and record the founding decisions so Stage 1 can bootstrap the repository without open questions.

## Acceptance Criteria

- [x] MVP scope frozen and recorded in `DECISIONS.md` (one repo, three tools, before/after payoff; Should/Nice tiers deferred).
- [x] Demo target repo selected: public, permissively licensed, famously messy, analyzable by the chosen toolchain. (`avrj/slack-clone`, fallback `Mastermindzh/react-express-fullstack` — see `DECISIONS.md`)
- [ ] Offline sample repo selected/created and committed as fixture data. (deferred to Stage 2/3 — to be authored as a fixture, not sourced externally; see `DECISIONS.md`)
- [x] Health-signal toolchain chosen per signal (dead code, coverage, complexity, vulnerabilities) and recorded in `DECISIONS.md`.
- [x] ADR-001 (MVP scope) and ADR-002 (deterministic garden truth) accepted.
- [x] Risk register reviewed and owners assigned (see `docs/RISK_REGISTER.md`).
- [x] Human owner approves the scope decision (Education track confirmed, toolchain approved, 2026-07-17).

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
- [ ] Project status audit run using `project-status-audit/SKILL.md`
- [ ] Audit findings resolved, documented, or explicitly carried forward as open gates

## Stage Gate Protocol

At the end of every stage, before promoting the project to the next stage:

1. Complete the stage's acceptance criteria and required quality checks.
2. Perform self-review and independent review; obtain human acceptance where required.
3. Update `PLAN.md`, `STATUS.md`, `DECISIONS.md`, and relevant project documentation with
   evidence and any remaining gates.
4. Run the project-local `project-status-audit` skill against the repository, durable notes,
   and Slack routing context.
5. Resolve documentation drift and record any plan change before starting the next stage.

The audit is also run at the end of each workday during active execution and once during final
submission closeout. It is a synchronization and decision checkpoint, not a replacement for
human acceptance, independent review, or the required technical checks.
