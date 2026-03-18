Status: done
Priority: high
Date: 2026-03-17
Project: firmware
Owner: d
Claim ID: 20260318T001626Z-1d58f3c2

# Verify Live DSP And Remote Shared Status And Missing Source Truth

## Goal

Verify on real hardware that the remote reads the shared status/source contract
truthfully from the live DSP node and shows missing-source state without
decorative fallback.

## Source

- `docs/roadmap/OHMIC_LIVE_NETWORK_AND_TELEMETRY_VALIDATION_WAVE_2026-03-17.md`

## Focus

- live DSP producer
- remote consumer
- shared status and source truth

## Acceptance

- the remote reflects live status from DSP over the shared contract
- missing-source truth is visible and stable on-device
- no fake live-slot surface leaks into normal mode

## Result

- `docs/roadmap/OHMIC_LIVE_DSP_AND_REMOTE_SHARED_STATUS_AND_MISSING_SOURCE_RESULT_2026-03-17.md`
