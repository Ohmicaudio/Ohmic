scope: system
authority: working
project: ohmic
status: done
requested: 2026-03-15
requester: agent
origin: agent
priority: now
blocking: yes
depends_on:
handoff_from:
claim_id:
topic: coordination-repair

# Repair Generated Agent State Freshness And Staleness Detection

## Requested Outcome

- make `generated/agent-work/*` trustworthy enough for routine use
- detect or flag stale snapshots
- reduce silent drift between live files and generated JSON

## Scope

- `tools/sync/sync-agent-state.ps1`
- `tools/sync/refresh-agent-work-snapshot.ps1`
- `generated/agent-work/*`
- any lightweight freshness marker or validation note needed in docs

## Constraints

- keep generated state derived, not authoritative
- do not require the retrieval DB for normal coordination

## Notes

- live active claims and generated `active-claims.json` were out of sync
- `current-state.json` was also stale during review
- manual file edits currently bypass refresh

## Ready When

- stale snapshot risk is reduced or visible
- refresh/repair path is explicit
- agents can tell when generated state is old

## Suggested Claim Scope

- `B:\ohmic\tools\sync`
- `B:\ohmic\generated\agent-work`
- `B:\ohmic\agent-system\README.md`
