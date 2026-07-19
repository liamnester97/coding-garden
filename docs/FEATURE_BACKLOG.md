# Code Garden Feature Backlog

> A running list of candidate features, experiments, and refinements. This is **not** an execution plan,
> stage tracker, status report, or commitment to build. `docs/EXECUTION_PLAN.md` remains the only roadmap.

## How to use this list

Add ideas here as they occur during playtesting. Before implementation, promote an item into a bounded goal in
the canonical execution plan and record any durable scope or architecture decision in `DECISION_LOG.md`.

Priority is deliberately simple:

- **P0 — learning or safety gap:** consider before release if the current experience is confusing, inaccessible,
  misleading, or blocks the core loop.
- **P1 — high-value improvement:** strong candidate for the next refinement cycle.
- **P2 — stretch:** useful when the golden path is stable and human-tested.
- **P3 — someday:** interesting, but not part of the current release path.

Status values: `candidate`, `needs playtest`, `designed`, `implemented`, `deferred`, or `rejected`.

## Current product guardrails

- The game teaches people to understand an existing codebase; it is not a generic coding game.
- HealthReport analysis remains the source of garden truth. Visuals, AI narration, rewards, and questions cannot
  invent findings or heal plants.
- Public repository analysis remains anonymous and read-only. Sample tending is a rehearsal unless a future,
  separately approved live branch/PR integration is implemented.
- The core loop stays: `explore → inspect → answer → confirm → tend → re-analyze → reflect`.
- The experience should work for learners from Grade 1 through Grade 12, while still being useful to adult
  non-coders. Plain language, hints, retries, and no shame-based failure are requirements.
- Features should preserve keyboard access, touch support, reduced motion, mobile readability, and the accessible
  text/evidence fallback.

## P0 — learning, clarity, and safety gaps

| Feature | Why it matters | Status |
| --- | --- | --- |
| First-minute guided onboarding | Teach movement, inspection, target halo, interaction key, and the first question without a wall of instructions. | implemented |
| Explicit “what did you learn?” recap | Ask the learner to identify the finding, evidence, and safe next step after an action; distinguish completion from guessing. | implemented |
| Accessible equivalent for every map interaction | Ensure keyboard, screen-reader, low-vision, and touch users can reach plants, stations, questions, hints, and payoff surfaces without relying on proximity alone. | needs playtest |
| Clear mode banner | Make Sample Rehearsal, Public Read-only, and any future Live Integration unmistakable at all times. | needs playtest |
| Recoverable interruption states | Explain what to do after refresh, timeout, server restart, expired command, or lost analysis without making the learner think they broke the garden. | implemented |
| Question quality review rubric | Check every question for one learning objective, age-appropriate wording, one defensible answer, useful distractors, and a helpful explanation. | designed |
| Content safety and privacy pass | Keep repository snippets bounded, avoid exposing secrets, avoid student-identifying data, and make anonymous/session-only behavior explicit. | candidate |

## P1 — educator and learning-system improvements

| Feature | Why it matters | Status |
| --- | --- | --- |
| Learner profile or grade-band setup without an account | Let a player choose reading level, challenge tone, and accessibility preferences without requiring identity or persistence. | implemented |
| Adaptive difficulty with a visible reason | Move between Easy, Medium, and Hard based on demonstrated understanding, while letting the learner override it. | implemented |
| Scaffold ladder | Offer progressive support: vocabulary definition → visual clue → worked example → answer explanation. | implemented |
| Mastery map | Track concepts such as functions, imports, testing, coupling, and vulnerabilities separately from garden health. | candidate |
| Practice mode separate from tending | Let learners answer several low-stakes questions without changing commands or report state. | candidate |
| Teacher/classroom mode | Provide a short facilitation view, discussion prompts, projected-map mode, and a resettable shared session without accounts. | candidate |
| Teacher-facing learning evidence export | Export a privacy-safe local summary of concepts attempted, hints used, and explanations viewed; never export repository secrets or student names by default. | candidate |
| Standards/objective tags | Tag questions to age band and learning objectives so future content can be reviewed or filtered intentionally. | candidate |
| Misconception-aware feedback | Explain common wrong ideas, such as “more imports is always bad” or “a test file means the code is fully covered.” | implemented |
| Content authoring fixture | Define questions in a validated, reviewable data format so educators can add content without changing gameplay code. | candidate |
| Localization-ready copy | Keep question text, hints, labels, and explanations externalized so translation is possible later. | P2 — someday |
| Learner reflection prompts | Invite a short “I noticed / I think / I would check next” response after the payoff; keep it local and optional. | candidate |

## P1 — game feel and world interaction

| Feature | Why it matters | Status |
| --- | --- | --- |
| Strong interaction affordances | Make nearby targets visibly pulse, show the interaction key, and explain why a destination matters before the learner presses it. | implemented |
| Tool-specific animations and sound cues | Give inspect, clip, water, answer-correct, answer-wrong, and re-analysis distinct feedback without implying a real code change when none occurred. | candidate |
| Non-blocking feedback for wrong answers | Keep the player in flow with a gentle shake, clue, explanation, retry, and optional skip—not a dead end or punitive health loss. | needs playtest |
| Clear action staging | Visually separate “question answered,” “command confirmed,” “rehearsal running,” “re-analysis complete,” and “health changed.” | implemented |
| Route and objective memory | Show visited places and completed learning steps in the Garden Journal so learners do not get lost. | implemented |
| Landmark-based map orientation | Add entrance, greenhouse, shed, beds, and payoff cues that communicate where the player is without a minimap dependency. | needs playtest |
| Pause/help overlay | Offer controls, objective, current concept, reduced-motion setting, and restart/replay options inside the map. | implemented |
| Safe reset and replay | Restart the sample lesson or current season without browser refresh or stale command state. | candidate |
| Responsive camera tuning | Keep the player, target, and question card readable on small screens while preserving the wide-shot map on desktop. | needs playtest |
| Sprite readability pass | Verify silhouette, facing, walk cycle, selected target, blocked movement, and interaction states at actual play size. | needs playtest |
| Audio preference controls | Provide mute, volume, captions/text equivalents, and reduced-sensory options before adding a soundtrack. | P2 — someday |

## P2 — progression and replay value

| Feature | Why it matters | Status |
| --- | --- | --- |
| Short lesson chapters | Turn the garden into repeatable 5–10 minute lessons with a beginning, concept focus, and reflection. | candidate |
| Concept-themed seasons | Make seasons represent ideas—not only difficulty—such as Roots/Imports, Sunlight/Tests, and Pruning/Dead Code. | candidate |
| Unlockable garden areas | Reveal new beds or landmarks after learning milestones, without hiding required accessibility paths. | candidate |
| Optional challenge quests | Offer “find two modules with the same problem” or “predict which plant needs sunlight” as safe analysis-reading exercises. | candidate |
| Personal bests without a leaderboard | Track local completion time, hints, and concepts practiced without competitive pressure or an account. | candidate |
| Replayable healthy-vs-sick comparison | Let learners switch between states and explain what changed, with the evidence still visible. | candidate |
| Gardener customization | Add cosmetic choices that do not encode health, rank, or ability and do not distract from the code garden. | P2 — someday |
| Generated decorative art pass | Add atmosphere only after the deterministic map, sprites, performance, and licensing checks remain stable. | deferred |

## P2 — technical and release improvements

| Feature | Why it matters | Status |
| --- | --- | --- |
| Performance budget dashboard | Measure initial load, map interaction latency, analysis time, memory, and mobile frame behavior with explicit budgets. | candidate |
| Broader browser/device matrix | Verify Safari, Chromium, Firefox, iOS-sized touch, desktop keyboard, screen reader, and reduced-motion behavior. | needs playtest |
| Deterministic replay fixtures | Save a sanitized report plus interaction sequence so bugs can be reproduced without network access or private repos. | candidate |
| Error telemetry without personal data | Provide opt-in, anonymous diagnostics only if needed; default to actionable local error messages and no third-party tracker. | P3 — someday |
| Live branch/PR integration gate | Add real branch and pull-request actions only after permissions, sandboxing, confirmation, rollback, and human demo evidence are separately approved. | deferred |
| Multi-repository comparison | Compare two bounded reports for teaching architecture differences, without mutating either repository. | P2 — someday |
| Repository health history | Show report snapshots across commits with explicit commit identity and bounded scope. | P2 — someday |

## Ideas to evaluate during playtesting

Capture observations here before turning them into features:

- [ ] Which instruction is still unclear after the first five minutes?
- [ ] Where does a learner stop moving and ask what to do next?
- [ ] Which question wording is too hard for Grades 1–5, 6–8, or 9–12?
- [ ] Do learners understand the difference between answering correctly and changing garden health?
- [ ] Can a learner recover from a wrong answer, expired rehearsal, or refresh without help?
- [ ] Can a teacher explain the learning objective using only the map and recap?
- [ ] Are the map, sprites, target halo, and question card readable on the actual test device?
- [ ] Which feedback feels satisfying, and which feedback accidentally suggests a fake real-world change?

## Promotion rule

An item moves out of this backlog only when it has a clear owner, bounded acceptance criteria, an appropriate place
in `docs/EXECUTION_PLAN.md`, tests or human evidence, and an explicit decision about whether it affects the frozen
truth/read-only/accessibility invariants.
