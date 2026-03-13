id: 2026-03-13-startup-funnel-and-remote-sync
thread_id: startup-funnel
kind: proposal
status: active
project: ohmic
created: 2026-03-13
author: codex
relates_to: B:\ohmic\docs\systems\STARTUP_FUNNEL_AND_REMOTE_SYNC_PROPOSAL_2026-03-13.md
resolves:
promoted_to:

# Summary

Make `B:\ohmic` the canonical startup funnel for both local and remote agents and use Git to mirror the source docs and scripts that drive re-entry.

## Context

- `B:\ohmic` is already the umbrella root
- the transaction layer and generated re-entry surfaces now exist
- the startup docs still lag behind the implemented system
- remote agents will only stay in sync if the umbrella repo itself tells them
  what to read and what to regenerate

## Body

Use the umbrella repo as the primary entry path:

- root `README.md` as the front door
- `agent-system/AGENTS.md` as the operating contract
- `generated/agent-work/` as the re-entry surface
- project brief before repo entry

Git should mirror source docs and scripts, not treat generated files as
authority.

## Next Action

- adopt this by updating the root startup and routing rules
- keep generated state derived and regenerable
