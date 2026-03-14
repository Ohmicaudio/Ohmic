scope: project
authority: working
project: org-wide
status: ready
requested: 2026-03-14
requester: codex-local
origin: split
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id:
topic: requested-task

# Clean agent coordination drift after graphics queue split

## Requested Outcome

- clean stale claims, stale request-history leftovers, and other coordination noise exposed during the graphics queue split
- leave the shared board easier to trust

## Scope

- `B:\ohmic\agent-system\jobs`
- `B:\ohmic\agent-system\requests`
- `B:\ohmic\docs\migration\STATIC_POST_GRAPHICS_FINISHING_PLAYBOOK_2026-03-14.md`

## Instructions

- do not rewrite the actual graphics queue structure again
- close obviously stale active job files if the work is already complete or moved
- isolate queue-history cleanup from live task edits

## Ready When

- stale coordination artifacts are either cleared or explicitly explained
- live ready items match the actual work model
