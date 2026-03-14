scope: global
horizon: mid
authority: working
project: org-wide
topic: initiatives
updated: 2026-03-13

# Mid-Term Memory

## Current Initiatives

- consolidate cross-project agent behavior into one shared contract
- reduce repo drift by promoting stable truths into shared docs instead of re-deriving them in chat
- use Docker + Chroma for fast retrieval across offline reference material
- continue separating umbrella context from product repos
- keep the `B:\ohmic\repos\*` repo set as the only active local work surface while GitHub org cleanup continues

## Learned Lessons

- file-backed memory is easier to trust, diff, and repair than DB-only memory
- retrieval should accelerate recall, not replace authority
- shared agent behavior needs one explicit contract or it drifts across sessions

## Capability And Access Notes

- agents can use the local semantic-index setup as a cross-project retrieval layer
- reference and archive material should be consolidated under `B:\ohmic` for easier indexing and re-entry
- project overlays are the right place for repo-specific current truth that should not pollute global long-term memory

## Recurring Mistakes To Watch

- overloading long-term memory with unstable details
- letting archive or working folders keep misleading names for too long
- confusing session continuity notes with canonical truth

## Cross-Project Direction

- `Ohmic` remains the umbrella/context repo, not a monorepo dump
- product code should live in separate repos with explicit overlays and contracts
- the shared agent system should span repos without replacing repo-local truth
- `ohmic-audio-labs`, `amplab-firmware`, `cyd-remote`, and `ohmic-audio-static-content` are all part of one active migration workstream and should not be treated as unrelated repo chores

## Known Work Ahead

- define project overlay maintenance rules
- define a reliable handoff cadence
- index the highest-value docs first: contracts, migration docs, architecture, project overlays, durable handoffs
- clean up repo landing zones under `B:\ohmic\repos` when migration timing is right
- finish promoting migration truth into the always-load surfaces so it stops dropping out between sessions
