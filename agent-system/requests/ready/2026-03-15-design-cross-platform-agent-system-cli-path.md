scope: system
authority: working
project: ohmic
status: ready
requested: 2026-03-15
requester: agent
origin: agent
priority: later
blocking: no
depends_on: 2026-03-15-normalize-shared-claim-file-schema-and-repair-live-claims, 2026-03-15-repair-generated-agent-state-freshness-and-staleness-detection
handoff_from:
claim_id:
topic: tooling

# Design Cross-Platform Agent System CLI Path

## Requested Outcome

Define the path away from PowerShell-only mutation tooling for core shared
system actions.

## Scope

- claims
- request creation/moves
- snapshot refresh
- optional validation entrypoint

## Constraints

- preserve the current file-backed model
- wrappers for PowerShell can stay if useful
- the goal is one cross-platform happy path, not tool sprawl

## Notes

- mixed Windows/WSL usage is normal here
- PowerShell-only mutation paths are contributing to manual edits and schema
  drift
- this is a structural follow-on, not the first emergency repair

## Ready When

- there is a concrete implementation direction
- command ownership and migration order are explicit

## Suggested Claim Scope

- `B:\ohmic\tools\sync`
- `B:\ohmic\agent-system\jobs\README.md`
- `B:\ohmic\agent-system\requests\README.md`
- `B:\ohmic\docs\systems`
