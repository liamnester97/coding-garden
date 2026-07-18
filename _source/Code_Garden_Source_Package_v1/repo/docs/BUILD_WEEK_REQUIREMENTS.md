# Build Week Submission Requirements (Verified Against the Brief)

Source: `code_garden_brief.pdf` (OpenAI Build Week Challenge, Devpost).

## Key dates

| Item | Date |
|---|---|
| Submission deadline | **Tuesday, July 21, 2026, 5:00 PM PT** |
| Judging period | July 22 – August 5, 2026 |
| Winners announced | ~August 12, 2026 |

## Hard requirements checklist

- [ ] A **working project built with Codex using GPT-5.6** (both are required and must be demonstrably used).
- [ ] A **chosen category/track**. Ours: **Education** (crossover narrative into Developer Tools, Work & Productivity, Apps for Your Life).
- [ ] A **project description**: what it is and how it works.
- [ ] A **public YouTube demo video under 3 minutes**, with **audio explicitly covering how Codex and GPT-5.6 were used**, highlighting where Codex accelerated the workflow and where key decisions were made.
- [ ] A **code repository link**:
  - If **private**: shared with `testing@devpost.com` and `build-week-event@openai.com`.
  - If **public**: must carry an open source license.
- [ ] A **README** with setup instructions, sample data if needed, and clear steps to run the project.
- [ ] **Documentation of architecture and key decisions** (satisfied by `docs/EXECUTION_PLAN.md`, `docs/adr/`, and `DECISIONS.md`).

## Judging criteria (weight the demo accordingly)

Technical implementation · Design & UX · Potential impact · Quality of idea.

## Prize context

$100,000 cash across tracks, plus OpenAI credits, DevDay passes, spotlight opportunities.

## Strategy notes from the brief

- Education is likely the least crowded track and one Build Week judge is OpenAI's VP of Education — anchor there.
- The demo video is the product for judging purposes: messy repo → 90 seconds of tending → lush garden → reveal the real PRs/tests/diffs underneath.
- Keep the app runnable without an API key (sample data requirement doubles as the offline demo path).

## Final verification (run the week of submission)

1. Watch the video start-to-finish: under 3:00, public, audio names Codex and GPT-5.6 usage explicitly.
2. Clone the repo fresh on a clean machine and follow the README verbatim to a running app.
3. Confirm repo visibility/sharing matches the checklist above.
4. Confirm every Devpost form field is filled and the submission is in a submitted (not draft) state well before 5:00 PM PT.
