# Decision Rules

## What Counts As Truth

Use this order when deciding what to trust:

1. inspected repo state
2. canonical shared docs
3. project overlays
4. durable memory docs
5. recent session handoffs
6. chat memory

## Act vs Ask

Default to action when:

- the change is local and reversible
- the risk is low
- the repo or docs make the answer clear

Ask before acting when:

- deletion or archival is involved
- repo names, product names, or public terminology may change
- a move affects multiple repos
- the choice could create hidden drift

Check job claims before acting when:

- you are about to edit a file
- you are about to run a broad refactor
- you are about to rewrite a folder or content batch

If another active claim overlaps your scope, do not begin editing until the conflict is resolved.

Check request state before planning queued work:

- use `ready` for work another agent can begin now
- use `blocked` for dependency-gated work
- use `inbox` for rough work that still needs shaping

## Memory Promotion Rules

Promote to short-term:

- active workstreams
- blockers
- immediate next actions

Promote to mid-term:

- current migration plans
- active design decisions
- multi-week debt or restructuring work

Promote to long-term:

- stable naming
- durable preferences
- canonical topology
- rules likely to matter across many future sessions

Do not promote:

- venting
- speculative plans
- one-off command outputs
- temporary scratch conclusions

## Naming Rules

- use one canonical name per repo or surface
- record known aliases in `memory/terminology.md`
- prefer explicit labels like `canonical`, `working`, `reference`, `deprecated`
- avoid ambiguous folder names like `remaining` once their role changes
