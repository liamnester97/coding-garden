# Code Garden Teaching Repository Fixture

This fixture mirrors the shape of the planned public teaching repository. It is
kept inside the app so the lesson remains available offline and does not depend
on GitHub credentials or network access.

Each grade band contains a tiny, runnable example with a deliberate, explainable
code-health signal. The app's deterministic analyzer remains the source of
truth; these notes describe the intended learning objective only.

The future public repository should preserve this layout:

- `lessons/grades-1-5/` — notice and count a warning.
- `lessons/grades-6-8/` — connect imports, tests, and evidence.
- `lessons/grades-9-12/` — choose and explain a safe next step.

No lesson should contain credentials, student data, private repository content,
or code that the app needs to execute.
