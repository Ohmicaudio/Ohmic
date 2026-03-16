Status: done
Priority: high
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T124119Z-fabe40cd

# Promote Live STA IP From AmpLab Status Into Device Link Candidates

## Goal

Ensure a reachable AmpLab status payload can promote its current
`connection.sta.ip` into the candidate set instead of leaving the browser stuck
on stale aliases.

## Focus

- status payload parsing
- current station IP promotion
- candidate persistence rules
- regression proof

## Acceptance

- the live LAN address becomes a first-class candidate when present
- stale alias-only storage is no longer the only remembered path

## Result

Completed on 2026-03-16.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_LIVE_LINK_CANDIDATE_NORMALIZATION_FIRST_SLICE_2026-03-16.md`

Outcome:

- reachable alias payloads now promote `connection.sta.ip` into the candidate
  set
- the first slice is covered by targeted `ConnectionManager` regressions
