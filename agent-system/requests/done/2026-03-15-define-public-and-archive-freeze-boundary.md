Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T105115Z-179762f3

# Define Public And Archive Freeze Boundary

## Goal

Make the freeze rule for `public/`, archive, and legacy-shaped surfaces explicit
so current completion work does not keep bleeding into those areas.

## Scope

- `public/*`
- `archive/*`
- `docs/created book/*`

## Deliverables

- one boundary note naming what is frozen
- explicit exceptions, if any
- recommendation for how future work should enter these areas safely

## Acceptance

- the boundary is durable in docs, not chat-only
- current completion work gets a clearer “do not touch casually” rule
- no broad content cleanup is bundled into this task

## Outcome

Completed on 2026-03-15.

Result:

- added a durable freeze-boundary note for app-side `public`, `archive`, and
  `docs/created book` legacy-shaped surfaces
- made the active exception explicit: `ohmic-audio-static-content/public` stays
  live while app-side `public` is frozen by default
- documented a narrow re-entry rule so future salvage work arrives as its own
  request/claim/commit slice instead of contaminating runtime work
