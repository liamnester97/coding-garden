# Garden Projection Instructions (`lib/garden/`)

## What this module owns

The deterministic projection `HealthReport → GardenScene`: layout (where each plant stands), visual encoding (how sick reads as sick), and the typed command model for tool actions (see → understand → confirm → act → verify → re-analyze).

## Rules

- The projection is a pure function. Same HealthReport → same GardenScene, including layout positions (use stable hashing of node identity, never insertion order or randomness).
- The render layer consumes GardenScene; it never computes health, never mutates it, and never grants a visual improvement that the report doesn't justify.
- No optimistic health updates: after a tool action, the scene may show a "landing/pending" state on the node, but the healthy visual appears only after re-analysis confirms it.
- Visual encodings are documented in one registry (metaphor map) so the inspector panel can always express the scene as text — that registry is the accessibility contract.
- Commands are typed and validated; a command that would touch a default branch or skip the confirm step is invalid by construction.
- No imports from OpenAI/LLM clients here. Narration/explanation text arrives as data.
