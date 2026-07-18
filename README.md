# Code Garden — Start Here

This README is the navigation page for the entire `coding-garden/` folder. It is not a second plan
or status document.

The active runnable application and implementation source are in this folder.

## If you want to know where we are

Open [PROJECT_STATUS.md](PROJECT_STATUS.md) first. It is
the current snapshot: what is complete, what is blocked, what decisions are needed, and the next
three actions. Then use [STAGE_TRACKER.md](STAGE_TRACKER.md)
for the active stage’s evidence and gates.

## Source of truth map

| Need | Active file |
| --- | --- |
| Live stage tracker | [`STAGE_TRACKER.md`](STAGE_TRACKER.md) |
| What is done now, blockers, and next actions | [`PROJECT_STATUS.md`](PROJECT_STATUS.md) |
| Binding decisions | [`DECISION_LOG.md`](DECISION_LOG.md) |
| Canonical execution plan | [`docs/EXECUTION_PLAN.md`](docs/EXECUTION_PLAN.md) |
| Project status audit skill | [`project-status-audit/SKILL.md`](project-status-audit/SKILL.md) |

`docs/EXECUTION_PLAN.md` is the original long-form product and submission blueprint and the only
execution plan. There is no separate status, tracker, or decision log at another layer.

## Folder map

- `docs/` — the canonical execution plan and documentation map.
- `app/`, `lib/`, `scripts/`, `tests/`, and `fixtures/` — the active application and evidence.
- `_archive/` — frozen historical source material only; do not use it as the live project.
- `project-status-audit/` — the project-local audit skill, not project execution documentation.

If a new document seems necessary, check this map and the ownership rules in `AGENTS.md` first.
Do not create another plan, status snapshot, or decision log.

## Application commands

Run commands from this folder:

```bash
npm run dev
```

This README is the active repository entry point; the application code and quality checks are
available directly in this root folder.
