Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T161520Z-843e5b96

# Drop Stale Self Host Candidates After Host IP Rollover

## Goal

Teach the discovery/candidate state to evict or downgrade stale self-host LAN
identities after a host rollover.

## Source

- `docs/roadmap/OHMIC_STALE_HOST_CANDIDATE_PURGE_WAVE_2026-03-16.md`

## Focus

- candidate eviction rules
- stale self-host identification

## Acceptance

- old host self-identities are downgraded or removed after rollover
- they stop competing with the current host identity

## Result

Completed on 2026-03-16.

Outputs:

- `B:\ohmic\repos\ohmic-audio-labs\services\ohmicLiveLink\ConnectionManager.ts`
- `B:\ohmic\docs\roadmap\OHMIC_STALE_HOST_CANDIDATE_PURGE_WAVE_2026-03-16.md`

Outcome:

- likely self-host service bases are now filtered out of stored live-link candidate state
