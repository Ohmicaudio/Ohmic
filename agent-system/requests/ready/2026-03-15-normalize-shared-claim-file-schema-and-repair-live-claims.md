scope: system
authority: working
project: ohmic
status: ready
requested: 2026-03-15
requester: agent
origin: agent
priority: now
blocking: yes
depends_on:
handoff_from:
claim_id:
topic: coordination-repair

# Normalize Shared Claim File Schema And Repair Live Claims

## Requested Outcome

- standardize one active-claim file schema
- repair any live claims still using the older incompatible format
- make `jobs/active/` safe for tooling again

## Scope

- `agent-system/jobs/active/*`
- `tools/sync/agent-claim.ps1`
- `tools/sync/sync-agent-state.ps1`
- `agent-system/jobs/README.md`

## Constraints

- do not convert claim files into a DB-backed system
- preserve human readability
- keep completed historical claims intact unless a migration note is needed

## Notes

- current tooling only parses the YAML-style claim schema
- at least one live claim was still using the older Markdown-header format
- this is a real overlap-detection and snapshot bug

## Ready When

- live active claims use one schema only
- claim tooling and docs agree on that schema
- mismatch no longer silently hides active work

## Suggested Claim Scope

- `B:\ohmic\agent-system\jobs`
- `B:\ohmic\tools\sync\agent-claim.ps1`
- `B:\ohmic\tools\sync\sync-agent-state.ps1`
- `B:\ohmic\agent-system\jobs\README.md`
