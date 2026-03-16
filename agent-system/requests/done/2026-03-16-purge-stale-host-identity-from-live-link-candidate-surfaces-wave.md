Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T161520Z-843e5b96

# Purge Stale Host Identity From Live Link Candidate Surfaces Wave

## Goal

Remove stale self-host identities from live-link candidate surfaces after host
IP rollover.

## Source

- `docs/roadmap/OHMIC_STALE_HOST_CANDIDATE_PURGE_WAVE_2026-03-16.md`

## Focus

- self-host candidate state
- discovery surfaces
- rollover cleanup

## Acceptance

- stale self-host identities no longer linger as live candidates
- discovery output reflects current host truth more cleanly

## Result

Completed on 2026-03-16.

Outputs:

- `B:\ohmic\repos\ohmic-audio-labs\services\ohmicLiveLink\ConnectionManager.ts`
- `B:\ohmic\repos\ohmic-audio-labs\test\services\ohmicLiveLinkConnectionManager.test.ts`
- `B:\ohmic\docs\roadmap\OHMIC_STALE_HOST_CANDIDATE_PURGE_WAVE_2026-03-16.md`

Outcome:

- stale host-service candidates are purged while real device candidates remain visible
