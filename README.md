# Code Garden — Start Here

This README is the navigation page for the entire `coding-garden/` folder. It is not a second plan
or status document.

The active runnable application and implementation source are in this folder.

## What Code Garden is

Code Garden turns a public JavaScript or TypeScript repository into a playable 2D garden. Modules
become plants, imports become roots, coverage gaps become drought, and dead-code findings become
withered branches. A deterministic `HealthReport` owns the garden truth; the interface explains each
finding in plain language and uses authored learning challenges before any demo action is unlocked.

The public release is anonymous and read-only for analyzed GitHub repositories. The bundled sample
garden supports honest, server-authoritative demo rehearsals for Clippers and Watering Can; it does
not create branches or PRs. The app works without `OPENAI_API_KEY`, using deterministic explanations
as the release fallback. With a key, the optional server-side explanation route can provide grounded
GPT-5.6 narration.

## Build Week submission narrative

Code Garden is an Education-track project for people who need to understand a codebase without first
learning to read every file. The analyzer validates a bounded repository report, the garden projects
that report into plants and roots, and the Magnifying Glass explains the evidence in plain English.
Authored questions make understanding a prerequisite for the sample Clippers and Watering Can
rehearsals; the report changes only after server-authoritative re-analysis.

Codex was used to build and verify the analysis pipeline, learning gate, garden world, and release
workflow. GPT-5.6 is an optional server-side narrator grounded in the current report; deterministic
explanations keep the public release useful without a key. Public GitHub analysis is read-only, and
the current anonymous demo deliberately labels tool actions as rehearsals rather than claiming real
branches or pull requests. The production release is available at
<https://coding-garden-iota.vercel.app>.

## If you want to know where we are

Open [PROJECT_STATUS.md](PROJECT_STATUS.md) first. It is
the current snapshot: what is complete, what is blocked, what decisions are needed, and the next
three actions. Then use [STAGE_TRACKER.md](STAGE_TRACKER.md)
for the active stage’s evidence and gates.

## Source of truth map

| Need                                         | Active file                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| Live stage tracker                           | [`STAGE_TRACKER.md`](STAGE_TRACKER.md)                                         |
| What is done now, blockers, and next actions | [`PROJECT_STATUS.md`](PROJECT_STATUS.md)                                       |
| Binding decisions                            | [`DECISION_LOG.md`](DECISION_LOG.md)                                           |
| Canonical execution plan                     | [`docs/EXECUTION_PLAN.md`](docs/EXECUTION_PLAN.md)                             |
| Deploy and human-test guide                  | [`docs/HOW_TO_DEPLOY_AND_HUMAN_TEST.md`](docs/HOW_TO_DEPLOY_AND_HUMAN_TEST.md) |
| Project status audit skill                   | [`project-status-audit/SKILL.md`](project-status-audit/SKILL.md)               |

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
npm install
npm run dev
```

Open the local URL printed by Next.js. For a production-style local run:

```bash
npm run build
npm run start
```

Run the full verification suite with `npm run format:check`, `npm run lint`, `npm run typecheck`,
`npm run test`, `npm run analysis:validate`, and `npm run build`. See
[docs/HOW_TO_DEPLOY_AND_HUMAN_TEST.md](docs/HOW_TO_DEPLOY_AND_HUMAN_TEST.md) for anonymous Vercel
deployment and the complete human-test checklist.

This README is the active repository entry point; the application code and quality checks are
available directly in this root folder.
