Status: ready
Priority: high
Date: 2026-03-17
Project: firmware

# Carry Live AmpLab Network And Status Floor Into Shared Core Runtime

## Goal

Carry the working live AmpLab station/AP/status behavior forward into the
shared-core branch so the shared contract stops regressing below the live
runtime floor.

## Source

- `docs/roadmap/OHMIC_NETWORK_AND_TELEMETRY_STACK_CONSOLIDATION_WAVE_2026-03-17.md`
- `docs/roadmap/OHMIC_LIVE_AP_GUARD_AND_LAN_TARGET_VALIDATION_RESULT_2026-03-17.md`
- `docs/roadmap/OHMIC_LIVE_DSP_STATUS_SURFACE_CAPTURE_RESULT_2026-03-17.md`

## Focus

- AmpLab station + AP runtime truth
- `/api/status` parity vs shared core
- preserving working LAN behavior while keeping the shared contract

## Acceptance

- the shared-core AmpLab branch no longer regresses below the live AmpLab
  network/status floor
- shared status and legacy operator expectations are both accounted for
- the result gives DSP a real shared runtime floor to converge onto
