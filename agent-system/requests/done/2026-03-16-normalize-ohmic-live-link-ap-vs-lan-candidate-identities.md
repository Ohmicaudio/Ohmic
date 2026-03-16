Status: done
Priority: high
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T124119Z-fabe40cd

# Normalize Ohmic Live Link AP vs LAN Candidate Identities

## Goal

Fix the live-link candidate model so firmware AP identity, current LAN identity,
stale aliases, and host/self addresses stop collapsing into one misleading
candidate set.

## Focus

- AP vs LAN identity boundary
- stale alias demotion
- host/self candidate rejection
- post-fix rerun setup

## Acceptance

- one parent fix wave is explicit
- the next children are implementation-oriented, not abstract

## Result

- published the first and second live-link normalization slices in:
  - `docs/roadmap/OHMIC_LIVE_LINK_CANDIDATE_NORMALIZATION_FIRST_SLICE_2026-03-16.md`
  - `docs/roadmap/OHMIC_LIVE_LINK_CANDIDATE_NORMALIZATION_SECOND_SLICE_2026-03-16.md`
- corrected the candidate ordering and fallback model so explicit LAN truth,
  firmware AP truth, and stale aliases no longer collapse into the same ranking
  behavior
