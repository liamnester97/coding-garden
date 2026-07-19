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

The authored visual world is tracked in the canonical roadmap as Bundles 7–8: a cozy pixel garden
with original sprite atlases, report-driven plants and roots, and the same accessible learning loop.
Its implementation slices are complete on the current development branch; human visual/release
acceptance remains open, and the currently deployed production build remains the fallback until that
acceptance is recorded.

Bundle 9 adds a curated teaching-repository shape for Grades 1–5, 6–8, and 9–12. The local lesson
registry, deterministic reports, selector, and offline fixtures live under `content/`, `lib/garden/`,
and `fixtures/teaching-repo/`; Bundle 11 now provides a five-finding, open-order proof of concept with direct action
wording, four-choice learning, hints, examples, and a dismissible completion payoff.
The dedicated demo remains the default while future intake supports public GitHub URLs, ZIP/folder uploads, and
individual files. A separate public repository is planned for the published classroom lessons. The app remains
generic for any public repository, and public analysis remains read-only.

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
| Candidate feature ideas                      | [`docs/FEATURE_BACKLOG.md`](docs/FEATURE_BACKLOG.md)                           |
| Project status audit skill                   | [`project-status-audit/SKILL.md`](project-status-audit/SKILL.md)               |
| Teaching lesson registry and offline fixture | [`content/teaching-lessons.ts`](content/teaching-lessons.ts)                   |

`docs/EXECUTION_PLAN.md` is the original long-form product and submission blueprint and the only
execution plan. `docs/FEATURE_BACKLOG.md` is only a running candidate list and does not add a second
roadmap. There is no separate status, tracker, or decision log at another layer.

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

Run the full verification suite sequentially with `npm run format:check`, `npm run lint`,
`npm run typecheck`, `npm run test`, `npm run analysis:validate`, `npm run build`, and
`npm run test:browser`; run `npx playwright install chromium` once before the browser suite. The browser suite builds
and owns an isolated production-style server on port 3100, so it does not reuse a stale development server. `next build`
regenerates `.next/types`, so running typecheck and build concurrently can produce transient missing-file
errors. See
[docs/HOW_TO_DEPLOY_AND_HUMAN_TEST.md](docs/HOW_TO_DEPLOY_AND_HUMAN_TEST.md) for anonymous Vercel
deployment and the complete human-test checklist.

This README is the active repository entry point; the application code and quality checks are
available directly in this root folder.
