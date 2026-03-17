Status: done
Priority: medium
Date: 2026-03-17
Project: cyd-remote

# Carve Live Display Stream Slot And Missing Stream State Outside Demo Mode

## Goal

Reserve the real live-display surface and its missing-stream state without
letting fake visuals leak back into normal runtime.

## Source

- `docs/roadmap/OHMIC_NETWORK_AND_TELEMETRY_STACK_CONSOLIDATION_WAVE_2026-03-17.md`

## Focus

- live display slot
- missing-stream state
- demo/store quarantine

## Acceptance

- the live display surface is reserved as stream-backed behavior only
- normal mode shows connect/missing-stream truth instead of fake motion
- demo/store mode remains the only place fake presentation may exist

## Result

- `docs/roadmap/OHMIC_LIVE_SLOT_AND_MISSING_SOURCE_QUARANTINE_RESULT_2026-03-17.md`
