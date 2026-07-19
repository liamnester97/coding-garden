# Code Garden Teaching Repository Fixture

This fixture mirrors the shape of the planned public teaching repository. It is
kept inside the app so the lesson remains available offline and does not depend
on GitHub credentials or network access.

The proof-of-concept fixture contains five tiny JavaScript examples
with deliberate, explainable code-health signals. The five lessons should cover a
mix of Find it, Plan it, and Execute it activities across the three age bands:

- a missing or improperly formed function/syntax pattern;
- an unused or unreachable helper;
- a missing test or visible coverage gap;
- a simple logic/condition problem;
- a safe next-step lesson grounded in a real report finding.

Each lesson includes a stable teaching ID, bounded excerpt, four answer choices,
the accepted answer, hint, related example, misconception explanation, and a
deterministic proposed fix. The app's deterministic analyzer remains the source of
truth; these authored fields define how a validated finding is taught, not what the
analyzer found.

The future public repository should preserve this layout:

- `lessons/grades-1-5/` — notice and count a warning.
- `lessons/grades-6-8/` — connect imports, tests, and evidence.
- `lessons/grades-9-12/` — choose and explain a safe next step.

All five lessons are visible in the garden from the beginning and are independent;
learners may solve them in any order. A solved lesson blooms for the local session
until Reset Garden is selected. Findings without an authored lesson remain visible
as “More to explore” and are not playable.

No lesson should contain credentials, student data, private repository content,
or code that the app needs to execute.
