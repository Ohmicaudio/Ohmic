# Handoff Rules

## Purpose

Handoffs preserve session continuity. They are not the main source of truth.

## What A Good Handoff Contains

- date
- scope
- what changed
- what is now true
- what still needs attention
- any decisions that should be promoted to memory or project overlays

## What Not To Put In Handoffs

- full command transcripts
- emotional play-by-play
- large pasted diffs
- facts that belong permanently in long-term memory but were never promoted

## Naming

Use:

- `YYYY-MM-DD-topic.md`

Examples:

- `2026-03-13-content-cleanup.md`
- `2026-03-13-agent-system-bootstrap.md`

## Promotion Rule

After writing a handoff, ask:

- should this become project truth?
- should this become shared memory?
- is this just historical context?

Only then leave it in `handoffs/`.
