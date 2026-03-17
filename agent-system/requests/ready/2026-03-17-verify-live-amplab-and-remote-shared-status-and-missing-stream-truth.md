Status: ready
Priority: high
Date: 2026-03-17
Project: firmware

# Verify Live AmpLab And Remote Shared Status And Missing Stream Truth

## Goal

Verify on real hardware that the remote reads the shared status/stream contract
truthfully from AmpLab and shows missing-stream state without decorative
fallback.

## Source

- `docs/roadmap/OHMIC_LIVE_NETWORK_AND_TELEMETRY_VALIDATION_WAVE_2026-03-17.md`

## Focus

- live AmpLab producer
- remote consumer
- shared status and stream truth

## Acceptance

- the remote reflects live status from AmpLab over the shared contract
- missing-stream truth is visible and stable on-device
- no fake stream/rta surface leaks into normal mode
