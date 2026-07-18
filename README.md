# Code Garden Workspace

This outer folder is the project workspace and documentation control layer. The active runnable
application and implementation source are here:

[`_source/Code_Garden_Source_Package_v1/repo/`](_source/Code_Garden_Source_Package_v1/repo/)

## Where to look

| Need | Active file |
| --- | --- |
| Live stage tracker | [`repo/PLAN.md`](_source/Code_Garden_Source_Package_v1/repo/PLAN.md) |
| What is done now, blockers, and next actions | [`repo/STATUS.md`](_source/Code_Garden_Source_Package_v1/repo/STATUS.md) |
| Binding decisions | [`repo/DECISIONS.md`](_source/Code_Garden_Source_Package_v1/repo/DECISIONS.md) |
| Canonical execution plan | [`docs/EXECUTION_PLAN.md`](docs/EXECUTION_PLAN.md) |
| Project status audit skill | [`project-status-audit/SKILL.md`](project-status-audit/SKILL.md) |

`docs/EXECUTION_PLAN.md` is the original long-form product and submission blueprint and the only
execution plan. The nested `PLAN.md` is only the live stage tracker.

## Application commands

Run commands from the active nested repository, not this outer workspace:

```bash
cd _source/Code_Garden_Source_Package_v1/repo
npm run dev
```

The active repository README contains the application architecture and quality checks.
