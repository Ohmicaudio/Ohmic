Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Add Hardware Shell Deck Smoke Check Coverage

## Goal

Add one honest verification path that exercises the new hardware shell deck and
host surfaces more directly than a root production build.

## Source

- `docs/roadmap/OHMIC_HARDWARE_CONTROL_FIRST_SAFE_SLICE_2026-03-15.md`
- `agent-system/requests/done/2026-03-15-verify-first-hardware-shell-deck-check-coverage.md`

## Focus

- one targeted route or component smoke path
- deck host mount behavior
- deck switching survival
- clear failure capture if the route still depends on broader unstable hardware work

## Acceptance

- at least one direct smoke or component-level check exists for the hardware shell deck slice
- the check path is documented clearly
- any remaining gaps are narrowed to specific follow-on surfaces
