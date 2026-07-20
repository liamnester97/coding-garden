# Code Garden Teaching Repository Fixture

This fixture mirrors the shape of the planned public teaching repository. It is
kept inside the app so the lesson remains available offline and does not depend
on GitHub credentials or network access.

The approved next fixture is one Python teaching file with 20 intentional,
explainable issues:

- 10 Easy questions for Grades 1–5;
- 5 Medium questions for Grades 6–8;
- 5 Hard questions for Grades 9–12.

Easy content focuses on beginner syntax and structure: colons, indentation,
variables, functions, arguments, returns, imports, conditionals, and loops.
Every question is authored in advance with one code excerpt, one direct question,
four fixed-order answer choices, a hint, a small related example, an explanation,
a recap entry, and a deterministic proposed fix. The fixture is never executed or
modified during gameplay.

The future public repository should preserve this layout:

- `lessons/grades-1-5/` — notice and count a warning.
- `lessons/grades-6-8/` — connect imports, tests, and evidence.
- `lessons/grades-9-12/` — choose and explain a safe next step.

Five questions are selected for each session. Easy selects five from its ten-question
pool; Medium and Hard use all five authored questions. The five active targets are
visible immediately and independent; learners may solve them in any order. A solved
target blooms for the local session until Reset Garden is selected. Findings without
an authored lesson remain visible as “More to explore” and are not playable.

The public-repository analyzer remains a separate read-only JavaScript/TypeScript
path. It must never be confused with this self-contained teaching fixture.

No lesson should contain credentials, student data, private repository content,
or code that the app needs to execute.
