# AI Layer Instructions (`lib/ai/`)

## What this module owns

All GPT-5.6/Codex interaction: Magnifying Glass explanations, plant narration (stretch), and dispatching/verifying Codex change tasks for tool actions.

## Rules

- Explanations are grounded strictly in the HealthReport entry and the referenced source code passed in the prompt context. An explanation asserting a finding not present in that context is a defect (eval suite enforces this).
- Explanations are written for non-coders: plain English, jargon explained on first use, no condescension.
- Change tasks (Clippers, Watering Can) run on branches and produce PRs; this module verifies (checks pass) before reporting success. It never reports success optimistically.
- Every call has a deterministic fallback: canned explanation for sample-repo nodes, graceful "the garden is quiet right now" error state otherwise. The app must never hard-fail because the API is down (Risk R05).
- Log token usage per call; respect the cost budget in Execution Plan §6.11. Cache explanations keyed by (node identity, report hash).
- Prompts live in versioned files here, not inline strings scattered through the app. Prompt changes go through the eval suite.
- Secrets are server-side only; nothing in this module may be imported by client components.
