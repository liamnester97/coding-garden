# The Gardener's Journey (Demo Path)

## The one-minute promise

You open a codebase you've never seen. Instead of ten thousand lines of text, you're standing at the edge of a garden — and you can tell at a glance that it's sick. Brown drought patches. Withered branches. Something crawling on the auth module. You pick up a magnifying glass, and the garden explains itself in plain English. Then you pick up the clippers, and the garden actually gets better — because the code actually got better.

## Step-by-step walkthrough

1. **Open the garden.** Point Code Garden at the demo repo. The analysis pipeline runs (or the cached sample loads) and the garden renders: one plant per module/function cluster, roots showing imports, sunlight showing coverage.
2. **Read the landscape.** The overgrown, brown, pest-ridden state is legible without any UI reading: drought zones are visibly dry, dead code is visibly withered, vulnerabilities visibly crawl.
3. **Magnifying Glass.** Hover any plant → a plain-English explanation of what that code does, grounded strictly in the HealthReport and the code itself. This is the non-coder magic moment.
4. **Learn before tending.** Choose Easy, Medium, or Hard and answer a short report-grounded question. A wrong answer gives a hint; a correct answer unlocks the proposed-scope confirmation.
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

The map is the primary game surface. Movement buttons, tool stations, map plants, and the learning question all
appear inside the garden so a player can stay in one field of play. The plant cards and Inspector below remain a
text-first evidence fallback for keyboard, screen-reader, and detailed report review—not a second game route.

The gardener faces the last direction pressed. Authored buildings, ponds, trees, beds, benches, and classroom
landmarks are solid; the avatar cannot walk through them. The current movement slice uses clear outer-map bounds
authored collision rectangles, a camera-follow layer, and one nearby-interaction action shared by keyboard and
touch controls. Enter and the in-map action button are equivalent inputs for plants, stations, the learning
greenhouse, and the reflection bench; the lower Inspector remains the detailed evidence fallback.

Questions use short sentences and one small idea at a time. Easy asks for a visible count, Medium asks for the
short check name, and Hard asks for one safe next step. The level labels remain useful for older learners without
making the Easy path depend on advanced code vocabulary.
