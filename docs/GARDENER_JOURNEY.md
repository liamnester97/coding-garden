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
7. **The payoff.** Wide shot: the same garden, now lush. Then the reveal — the actual PRs, real diffs, real passing tests that produced every visual change.

## Evidence chain (tool → deterministic signal → real change → visual result)

For the current standalone release, Clippers and Watering Can use an explicitly labeled sample-only
demo rehearsal. The lifecycle, learning gate, and re-analysis contract are real; branch/PR execution
and real diffs remain a future/live integration gate and are never implied by the rehearsal UI.

| Tool                        | Health signal (deterministic)   | What Codex actually does                                       | Garden result                         |
| --------------------------- | ------------------------------- | -------------------------------------------------------------- | ------------------------------------- |
| Magnifying Glass            | HealthReport entry for the node | Nothing (read-only); GPT-5.6 explains in plain English         | Plant "introduces itself"             |
| Clippers                    | Dead/unused-code finding        | Removes the code on a branch, opens PR; analysis re-runs       | Withered branch disappears            |
| Watering Can                | Coverage gap on the node        | Writes missing tests on a branch; tests pass; analysis re-runs | Drought patch greens up               |
| Pesticide Spray _(stretch)_ | Vulnerability/bug finding       | Patches the vulnerability on a branch                          | Pest vanishes, rot heals              |
| Fertilizer _(stretch)_      | Complexity/debt score           | Refactors the function on a branch                             | Plant grows taller, stands straighter |

## The design rule

**You cannot act without understanding.** Every destructive tool shows the explanation and the exact proposed change before the confirm button exists. The game teaches through doing — that's the Education-track core, not a gimmick.

## Accessibility notes

- Every garden interaction has a keyboard path and a text equivalent (the garden inspector panel lists what the visuals encode).
- Explanations are text-first; any voice/audio is additive.
- Reduced-motion mode swaps animations for state crossfades.
