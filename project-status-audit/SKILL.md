---
name: project-status-audit
description: Audit the Code Garden project against its execution plan and repository evidence. Use when Liam asks how the project is executing, what is missing, whether the plan should change, what needs documenting, whether the project is up to date, or for a project closeout/status check.
---

# Project Status Audit

Run a repeatable, evidence-based health check for Code Garden. The audit answers:

- How execution compares with the active plan.
- Which plan gates are complete, open, blocked, stale, or incorrectly marked.
- Whether the implementation, tests, docs, durable notes, and Slack routing are synchronized.
- What should change in the plan, what needs documenting, and the next bounded slice.

Default behavior is read-only inspection plus a report. If Liam asks to reconcile or update the
project, make only small, evidence-backed documentation changes. Never commit, push, deploy, react
in Slack, or post messages without explicit authorization.

## 1. Establish project context

Work from the Code Garden workspace root. The single canonical execution plan is
`docs/EXECUTION_PLAN.md`; `STAGE_TRACKER.md` and `PROJECT_STATUS.md` are trackers, not alternative roadmaps.
Before auditing content, verify that exactly one file named `EXECUTION_PLAN.md` exists under the
workspace and flag any duplicate or missing copy as a P1 documentation issue. Never silently treat
a source package, copied artifact, or similarly named file as the active plan.

Read, in order:

1. `AGENTS.md`
2. `STAGE_TRACKER.md`
3. `PROJECT_STATUS.md`
4. `DECISION_LOG.md`
5. `docs/EXECUTION_PLAN.md`
6. Relevant `docs/adr/`, `docs/RISK_REGISTER.md`, `docs/BUILD_WEEK_REQUIREMENTS.md`, and nested
   `AGENTS.md` files.

If `docs/EXECUTION_PLAN.md` is missing, flag it as a P1 documentation gap.

Also perform the required durable-context check:

- Read the Obsidian vault's `100 Command Center/110 Home/Home.md` and
  `100 Command Center/120 Indexes/Master Index.md`.
- Read the vault's own `AGENTS.md` if accessible.
- Search the vault for `Code Garden`, `coding-garden`, and `Build Week V2`.
- Check the vault session and decision logs before adding entries.

If the primary vault path is unavailable, say so explicitly and use the configured alternate path
only when it is clearly the same vault. Never invent vault-backed context.

## 2. Check Slack routing context

Use the available Slack status-check workflow or equivalent read-only Slack tools. Discover the
workspace channels rather than assuming a fixed list, then inspect at minimum `#inbox`, `#plan`,
`#build`, and `#announcements`.

Report separately:

- Code Garden-specific items that are unrouted, unresolved, or blocked.
- Unrelated Slack work that is outstanding but does not affect this project.
- No project-specific Slack item found.

Do not add reactions, reply, route, or post an announcement during an audit. If an audit discovers
a project blocker that Liam needs to see outside the conversation, recommend an announcement but
wait for confirmation before posting it.

## 3. Compare plan to implementation

Build an evidence table from the repository, not from prose alone. Check:

- Stage label and goal agree across `STAGE_TRACKER.md`, `PROJECT_STATUS.md`, README, and the master plan.
- Every checked acceptance criterion has a corresponding file, test, command result, or external
  confirmation.
- Every open criterion is still genuinely open; identify criteria that were completed but not
  checked.
- `PROJECT_STATUS.md` blockers, risks, decisions needed, and next actions match current evidence.
- `DECISION_LOG.md` records target repo, scope, toolchain, safety boundaries, and any changed
  decisions with dates.
- ADR statuses match actual human approval; never mark a pending human decision accepted based on
  implementation progress.
- Risk owners and mitigations exist, with newly discovered risks recorded.
- Submission requirements do not claim completion for unfinished video, deployment, repository,
  or Devpost work.

Use `rg` to find stale references such as old stages, missing files, `TODO`, `pending`,
`not started`, and references to files that do not exist.

### Documentation structure gate

At every stage-boundary audit, verify that the workspace remains navigable and has one source of
truth:

1. Root `README.md` is the front door and links directly to `PROJECT_STATUS.md`,
   `STAGE_TRACKER.md`, `DECISION_LOG.md`, and `docs/EXECUTION_PLAN.md`.
2. Exactly one `EXECUTION_PLAN.md` exists under the workspace.
3. The active repository contains exactly one each of `STAGE_TRACKER.md`, `PROJECT_STATUS.md`, and
   `DECISION_LOG.md`.
4. No active workspace layer contains generic `PLAN.md`, `STATUS.md`, or `DECISIONS.md` copies.
5. The source package is clearly marked historical and is not treated as live project state.
6. Every navigation link and documented path resolves to an existing file or directory.

Use file inventory plus `rg` to check these invariants. Classify any violation as **P1
documentation drift** when it could cause an agent or human to follow the wrong source, and
reconcile it before the stage can be promoted.

For Stages 16–18, also check the map-specific navigation contract: the play surface has a usable responsive size,
the map is the dominant interaction surface, gameplay controls are not duplicated below it, the next target guidance
is visible and reduced-motion safe, authored walkways connect the entrance to every required interaction target,
collision geometry agrees with visible paths, and all four facing directions are covered by tests or browser evidence.

### Stage completion tracking

Always produce an explicit stage snapshot from the plan. Distinguish:

- **Slice complete** — the bounded implementation work has evidence and passing checks.
- **Stage gate open** — one or more acceptance, review, human-approval, deployment, or audit gates
  remain.
- **Stage complete** — every stage-specific acceptance criterion and required review/gate is
  complete and the audit has been run and reconciled.

Read the `## Stage Status` section in `STAGE_TRACKER.md` when present and compare it with the stage roadmap,
checkboxes, `PROJECT_STATUS.md`, and repository evidence. Flag stale stage labels or percentages. Never
mark a stage complete merely because its implementation slice is complete. When Liam asks to
reconcile the project, update the authoritative stage status in `STAGE_TRACKER.md` with a dated evidence
note and keep any human or external gates explicitly open.

## 4. Verify repository evidence

Inspect repository cleanliness and run the project checks in a safe order. Prefer separate command
calls so type generation and production builds do not race:

```text
git status --short
git diff --check
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run analysis:validate
npm run build
```

Run only checks supported by the current `package.json`; report omitted checks rather than
pretending they passed. Record warnings separately from failures. A passing build does not erase a
warning about workspace roots, missing credentials, unsafe target execution, or uncommitted work.

For an analysis project, also verify:

- Target-repo analysis is read-only and does not execute target code unexpectedly.
- Findings contain evidence and honest method labels.
- The analyzer does not authorize code changes before calibration/confidence gates pass.
- The offline fixture is present, deterministic, validated, and actually committed when the plan
  says committed.
- Report hashes, node/finding counts, and rehearsal artifacts are recorded when they are used as
  acceptance evidence.

## 5. Assess and classify findings

Classify every discrepancy as one of:

- **Complete** — evidence exists and the documentation should say so.
- **In progress** — work exists but its acceptance gate is not complete.
- **Blocked** — an external human, account, credential, or permission is required.
- **Stale documentation** — implementation/evidence moved ahead of the docs.
- **Plan change needed** — the original sequence, scope, or acceptance criterion no longer fits.
- **Risk** — the plan may still work, but evidence shows a new failure mode or uncertainty.

Do not turn analyzer findings into code-change recommendations if the analyzer itself is known to
over-report or is still being calibrated. Mark those findings advisory and recommend calibration.

## 6. Reconcile documentation when requested

When Liam asks to update the project as part of the audit:

1. Patch the smallest authoritative files: usually `STAGE_TRACKER.md`, `PROJECT_STATUS.md`, `DECISION_LOG.md`,
   `README.md`, an ADR, the risk register, or submission requirements.
2. Add a dated decision entry only for a durable scope/tooling/architecture decision or a material
   evidence milestone.
3. Add a concise Obsidian session-log entry for the working session. Add a vault decision-log entry
   only when the change is durable across projects; project-specific decisions belong in the repo.
4. Keep pending human approvals pending. Do not check a box just because implementation started.
5. Re-run `git diff --check` and the relevant quality gates after edits.
6. Report all remaining uncommitted changes. Do not commit or push unless explicitly asked.

Use `apply_patch` for local edits. Preserve unrelated working-tree changes.

## 7. Required final report

Return a compact report with these sections:

### Execution status

State the active stage, overall assessment, and the strongest evidence.

### Stage completion snapshot

State which stages are complete, which are in progress, and which are queued. For the active stage,
include completed slice criteria, remaining gates, and whether the stage is ready for a formal gate
review. If percentages are used, calculate them from explicit stage criteria and label them as
implementation progress rather than stage completion.

### Plan changes

Say whether the plan should stay, be corrected for documentation drift, or materially change.
List the specific proposed changes and why.

### Documentation and synchronization

List files updated or missing, including the documentation structure gate result. State whether the repo, durable notes, Slack context, and submission
tracking are synchronized. Distinguish “updated locally” from “committed/pushed.”

### Verification

List checks that passed, failed, were skipped, and notable warnings.

### Open gates and risks

Include human decisions, credentials, preview/deployment needs, calibration uncertainty, fixture
status, and any external blockers.

### Next three actions

Recommend the next bounded, dependency-aware actions. End with the exact decision or approval Liam
needs to provide, if any.
