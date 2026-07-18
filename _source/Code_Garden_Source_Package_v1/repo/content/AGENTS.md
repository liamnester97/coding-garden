# Content Instructions (`content/`)

## What this module owns

The metaphor-map registry (code concept → garden encoding), canned sample-mode explanations, and all player-facing copy.

## Rules

- The metaphor registry is the single source of truth for visual encodings; renderer and inspector both read it. Adding a visual state requires a registry entry naming the HealthReport signal behind it.
- Canned explanations for the sample repo must meet the same quality bar as live ones (Execution Plan §7.5): grounded, plain-English, honest about uncertainty.
- Copy is written for non-coders; jargon is explained on first use or removed.
- No copy may overstate what analysis found ("possibly unused" stays "possibly unused").
- Registry or canned-content changes ship with updated golden snapshots in the same PR.
