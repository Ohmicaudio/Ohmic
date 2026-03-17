Status: ready
Priority: high
Date: 2026-03-17
Project: firmware

# Carry Live AmpLab WiFi Profile And Connect Floor Into Shared Core Runtime

## Goal

Carry the live AmpLab Wi-Fi profile, selection, scan, and connect behavior into
the shared-runtime branch so the shared network core stops stalling at a
placeholder-only floor.

## Source

- `docs/roadmap/OHMIC_NETWORK_AND_TELEMETRY_STACK_CONSOLIDATION_WAVE_2026-03-17.md`
- `docs/roadmap/OHMIC_LIVE_AMPLAB_NETWORK_AND_STATUS_FLOOR_CARRY_FORWARD_RESULT_2026-03-17.md`

## Focus

- Wi-Fi profile persistence
- scan and candidate truth
- connect/select/add/delete actions
- honest AP-versus-STA recovery behavior

## Acceptance

- shared-runtime AmpLab exposes real Wi-Fi profile and connect behavior instead
  of placeholders
- the result remains truthful for both live AmpLab and future shared-core
  consumers
- the next remote and DSP convergence slices can target the shared Wi-Fi floor
  instead of product-local behavior
