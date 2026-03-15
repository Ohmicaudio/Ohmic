Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T185142Z-0edba0c7

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

## Outcome

Completed on 2026-03-15.

Result:

- added focused component smoke coverage for the hardware shell/deck slice
- verified deck stack activation and collapse wiring
- verified the deck content host mounts the AmpLab branch and can switch auxiliary deck content
- documented the exact new check path and the remaining route-level gap

## Artifact

- `B:\ohmic\repos\ohmic-audio-labs\test\components\HardwareShellDecks.test.tsx`
- `B:\ohmic\docs\roadmap\OHMIC_HARDWARE_SHELL_DECK_SMOKE_CHECK_COVERAGE_2026-03-15.md`

## Verification

- `npx vitest run test/components/HardwareShellDecks.test.tsx`
