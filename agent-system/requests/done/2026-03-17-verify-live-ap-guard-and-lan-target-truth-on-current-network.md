Status: done
Priority: medium
Date: 2026-03-17
Project: firmware
Owner: d
Claim ID: 20260317T190316Z-5e8c1a2b

# Verify Live AP Guard And Lan Target Truth On Current Network

## Goal

Verify on the real network that AP recovery targets stay guarded, LAN live
targets remain actionable, and saved-host behavior does not regress back into
blind AP retries.

## Source

- `docs/roadmap/OHMIC_LIVE_NETWORK_AND_TELEMETRY_VALIDATION_WAVE_2026-03-17.md`

## Focus

- AP guard
- LAN target truth
- saved host behavior

## Acceptance

- wrong-subnet AP retries remain blocked
- actionable LAN targets are still reachable when present
- the result clarifies the next AP-vs-LAN normalization slice

## Result

- `docs/roadmap/OHMIC_LIVE_AP_GUARD_AND_LAN_TARGET_VALIDATION_RESULT_2026-03-17.md`
