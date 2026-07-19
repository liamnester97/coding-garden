# The Gardener's Journey (Demo Path)

## The one-minute promise

You open a codebase you've never seen. Instead of ten thousand lines of text, you're standing at the edge of a garden — and you can tell at a glance that it's sick. Brown drought patches. Withered branches. Something crawling on the auth module. You pick up a magnifying glass, and the garden explains itself in plain English. Then you pick up the clippers, and the garden actually gets better — because the code actually got better.

## Step-by-step walkthrough

1. **Open the garden.** Point Code Garden at the demo repo. The analysis pipeline runs (or the cached sample loads) and the garden renders: one plant per module/function cluster, roots showing imports, sunlight showing coverage.
2. **Read the landscape.** The overgrown, brown, pest-ridden state is legible without any UI reading: drought zones are visibly dry, dead code is visibly withered, vulnerabilities visibly crawl.
3. **Magnifying Glass.** Select a plant to see a short summary. Walk close to an unfinished target and press **E** (or Enter) once for its short dialogue, then press the key again to open the teaching question. Detailed source evidence is optional, grounded strictly in the HealthReport and the code itself.
4. **Learn before tending.** Choose a grade-aware Easy, Medium, or Hard level inside the map and answer one short,
   report-grounded question. Grades 1–5 notice and count, Grades 6–8 connect clues, and Grades 9–12 explain a safe
   next step. A wrong answer gives a hint and explains the idea; a correct answer unlocks confirmation.
5. **Clippers.** Select a withered branch. The garden explains what this dead code is and why it appears unused. Confirm → the sample rehearsal advances through the server-authoritative lifecycle → re-analysis visibly clears the decay. Public reports remain read-only.
6. **Watering Can.** Pour water on a drought zone. The garden explains what's untested and what a test would protect. Confirm → the sample rehearsal advances through the lifecycle → re-analysis greens the patch.
7. **The payoff.** Wide shot: the same garden, now lush. In the current public release, reveal the
   server-authoritative demo-rehearsal lifecycle and before/after HealthReport comparison; do not call
   it a real PR or real diff. The real branch/PR reveal is a future/live integration gate.

## Evidence chain (tool → deterministic signal → real change → visual result)

For the current standalone release, Clippers and Watering Can use an explicitly labeled sample-only
demo rehearsal. The lifecycle, learning gate, and re-analysis contract are real; branch/PR execution
and real diffs remain a future/live integration gate and are never implied by the rehearsal UI.

| Tool                        | Health signal (deterministic)   | What Codex actually does                                                                          | Garden result                                |
| --------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Magnifying Glass            | HealthReport entry for the node | Nothing (read-only); GPT-5.6 explains in plain English                                            | Plant "introduces itself"                    |
| Clippers                    | Dead/unused-code finding        | Current release rehearses the validated lifecycle; live integration would remove code on a branch | Withered branch disappears after re-analysis |
| Watering Can                | Coverage gap on the node        | Current release rehearses the validated lifecycle; live integration would write tests on a branch | Drought patch greens up after re-analysis    |
| Pesticide Spray _(stretch)_ | Vulnerability/bug finding       | Patches the vulnerability on a branch                                                             | Pest vanishes, rot heals                     |
| Fertilizer _(stretch)_      | Complexity/debt score           | Refactors the function on a branch                                                                | Plant grows taller, stands straighter        |

## The design rule

**You cannot act without understanding.** Every destructive tool shows the explanation and the exact proposed change before the confirm button exists. The game teaches through doing — that's the Education-track core, not a gimmick.

## Accessibility notes

- Every garden interaction has a keyboard path and a text equivalent (the garden inspector panel lists what the visuals encode).
- Explanations are text-first; any voice/audio is additive.
- Reduced-motion mode swaps animations for state crossfades.

## Authored pixel-garden direction

The current visual expansion uses one fixed, cozy pixel-art garden rather than a procedural world. The
map supplies the terrain, paths, landmarks, learning grove, tool clearing, and payoff area; the analyzed
`HealthReport` supplies the plants, roots, findings, and health states placed into that world. Generated
sprite art is decorative and presentation-focused. It never invents a finding or grants health that the
report does not support.

The active visual stages are tracked in `docs/EXECUTION_PLAN.md` as Bundle 12 (Stages 33–36). Combat, enemies, bosses, accounts, leaderboards, procedural maps, and multiplayer remain
deferred so the educational exploration loop stays clear and honest.

## Map-first controls and audience range

The map is the primary game surface. Global configuration remains above it, while the objective ribbon and gameplay
interaction stay inside the map; the player
uses the keyboard to move and **E**/Enter to interact. Selecting a plant is read-only. The player must approach a
target and press the interaction key before a learning question appears. Plant cards and the Inspector below remain a
text-first evidence fallback for keyboard, screen-reader, and detailed report review—not a second game route.

The gardener faces the last direction pressed. Authored buildings, ponds, trees, beds, benches, and classroom
landmarks are solid; the avatar cannot walk through them. The current movement slice uses clear outer-map bounds,
authored collision rectangles, a camera-follow layer, and one nearby-interaction action shared by keyboard and touch
controls. The map is intentionally large and keeps the next target visible with a soft yellow halo; guided walkways
show the intended route without changing report truth. Enter and E plus the in-map action button are equivalent inputs
for plants, stations, the learning greenhouse, and the reflection bench. H and Show hint reveal help inside the
challenge. The lower Inspector and plant list remain detailed, non-interactive evidence fallbacks.

The objective ribbon is deliberately compact: it names the next target and the key action while leaving the garden
visible. Questions open as bounded in-map cards rather than taking over the page. The map can enter browser
fullscreen for a focused game view. On small screens the camera may follow the gardener, but the same target,
walkway, collision, and keyboard rules apply.

On a first visit, a small in-map guide explains movement, the golden target, and the interaction key. It can be
dismissed and reopened from Help / pause. The map also keeps a Sample rehearsal or Public read-only banner visible so
the learner always knows whether tending is a safe local rehearsal or inspection-only public analysis. Reset sample
lesson clears local demo progress and returns the gardener to the entrance; it never changes a repository or sends a
new analysis request.

Questions use short sentences and one small idea at a time. Easy asks for a visible count, Medium asks whether to
check roots, tests, or safety, and Hard asks for one safe next step. The level labels remain useful for older learners
without making the Easy path depend on advanced code vocabulary.

The single Level control combines the playful name with the age band without creating an account. Grades 1–5 start with
Easy notice-and-count questions; Growing and Master Gardener remain secondary capabilities. A challenge offers up to three clues in order; wrong
answers receive a specific misconception hint, while only a server-validated correct answer unlocks confirmation.

The Lesson selector in the same toolbar can load older local comparison fixtures. The default demo has a healthy
entry point, an intentional missing-test signal, and an intentionally unimported helper so learners can inspect why a
plant is stressed or withered. The selected lesson remains an offline sample rehearsal; choosing it does not analyze,
execute, or mutate the fixture repository.

## Wave 3 loop clarity

During a sample rehearsal, the in-map Current action card tells you whether you are answering, confirming, rehearsing,
waiting for re-analysis, or looking at a verified health change. After a rehearsal, the Reflection bench offers an
optional one-sentence note saved only in the current Garden Journal session. It is a learning recap, not a repository
action or account feature.

## Evidence-first questions and tools

Questions now show a short excerpt from the teaching fixture and ask what the learner thinks is wrong. Multiple choice
is the reliable path; a typed answer is also accepted when it matches the server-side evidence. Tools are metaphorical
and appear in the in-map tool-ready surface rather than as destinations that clutter the garden. The garden dialogue
card remains visible while idle so the next clue never disappears.

After sample rehearsals, **Review possible fixes** lists the proposed scopes without writing to any repository. A real
apply-fixes path is a future, separately approved integration requiring authentication, a branch, a diff preview, checks,
rollback, and final confirmation. Public repository analysis remains read-only.

## Bundle 11 proof-of-concept journey

The dedicated teaching demo is the default starting point. It contains five known,
intentional JavaScript/TypeScript findings with authored lessons and deterministic proposed fixes. All five plants are
visible immediately and may be completed in any order; there is no required route through the garden. The learner
chooses one of:

- **Sprout / Easy — Grades 1–5**
- **Growing / Medium — Grades 6–8**
- **Master Gardener / Hard — Grades 9–12**

Every playable lesson uses four multiple-choice answers and mixes Find it, Plan it, and Execute it activities. The
dialogue begins compactly and expands across the map when active. It shows the relevant code, the problem in direct
language, possible fixes, a hint, a small example, and an explanation after a wrong answer. Learners may retry freely;
this is practice, not grading.

When a learner solves a target, its plant blooms and stays complete for the local session. Solving all five opens a
dismissible completion window with the five blooms, before/after code, proposed fixes, re-analysis evidence, and a
healthier-garden summary. Reset Garden clears only the local session so the learner can choose another level or replay.

For the demo, output is reviewable and must not silently overwrite source files. The planned safe choices are a readable
diff/corrected copy now, with corrected ZIP/folder output and authenticated GitHub branch/PR output designed as future
input-specific options. A finding without an authored lesson appears as **More to explore** and is not playable until
content is validated.

## Easy-first refinement target

The first polished demo is for an independent Grades 1–5 learner. The framing is **A garden adventure for finding and
fixing bugs in code**. A learner walks to one of the five unfinished plants and presses `E` or `Enter`. The first
interaction is a short dialogue prompt; pressing the key again opens the full challenge. The learner may choose any
plant in any order.

The Easy path uses short language, small code excerpts, four clear answer boxes where applicable, a hint, a tiny
example, and an explanation. Wrong answers require or recommend a hint before retry and never reduce health. A correct
answer makes that plant bloom immediately; `Y` opens the explanation if the learner wants to review it. Completed
plants lose their golden halos. The map should stay large, uncluttered, and fully walkable with keyboard controls.

The demo remains five questions for now. Growing and Master Gardener unlock after Easy, but their polish is secondary
to making the Easy path understandable. At completion, the learner can review the before/after code and proposed fixes,
reset or replay, and choose an explicit safe output. The app never silently overwrites code or mutates a public
repository.
