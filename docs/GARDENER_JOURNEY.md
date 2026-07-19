# The Gardener's Journey (Demo Path)

## The one-minute promise

You open a codebase you've never seen. Instead of ten thousand lines of text, you're standing at the edge of a garden — and you can tell at a glance that it's sick. Brown drought patches. Withered branches. Something crawling on the auth module. You pick up a magnifying glass, and the garden explains itself in plain English. Then you pick up the clippers, and the garden actually gets better — because the code actually got better.

## Step-by-step walkthrough

1. **Open the garden.** Point Code Garden at the demo repo. The analysis pipeline runs (or the cached sample loads) and the garden renders: one plant per module/function cluster, roots showing imports, sunlight showing coverage.
2. **Read the landscape.** The overgrown, brown, pest-ridden state is legible without any UI reading: drought zones are visibly dry, dead code is visibly withered, vulnerabilities visibly crawl.
3. **Magnifying Glass.** Select a plant to see a short summary. Walk close to a target and press **E** (or Enter) to open its teaching question. Detailed source evidence is optional, grounded strictly in the HealthReport and the code itself.
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

The active visual stages are tracked in `docs/EXECUTION_PLAN.md` as Bundle 7 (Stages 11–14) and Bundle 8
(Stages 15–18). Combat, enemies, bosses, accounts, leaderboards, procedural maps, and multiplayer remain
deferred so the educational exploration loop stays clear and honest.

## Map-first controls and audience range

The map is the primary game surface. Global controls and instructions sit in a compact toolbar above it; the player
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

The learner can choose an age band in the top toolbar without creating an account. Grades 1–5 start with Easy notice-and-
count questions, Grades 6–8 with Medium clue-connection questions, and Grades 9–12 with Hard safe-next-step questions.
The recommended depth is explained and can be overridden. A challenge offers up to three clues in order; wrong
answers receive a specific misconception hint, while only a server-validated correct answer unlocks confirmation.

The Lesson selector in the same toolbar loads one of the three local teaching fixtures. Each fixture has a healthy
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
