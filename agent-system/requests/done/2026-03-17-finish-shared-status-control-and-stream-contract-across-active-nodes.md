Status: done
Priority: high
Date: 2026-03-17
Project: firmware
Owner: d
Claim ID: 20260317T154935Z-18c7d4b2

# Finish Shared Status Control And Stream Contract Across Active Nodes

## Goal

Close the remaining contract gap between shared status, shared control, and the
future stream slot across AmpLab, DSP, remote, and hub/client instances.

## Source

- `docs/roadmap/OHMIC_NETWORK_AND_TELEMETRY_STACK_CONSOLIDATION_WAVE_2026-03-17.md`

## Focus

- status
- control
- stream capability and missing-stream truth

## Acceptance

- active nodes share one contract family for status/control/stream state
- missing stream is represented explicitly instead of with decorative fallback
- unsupported capabilities reject cleanly

## Result

- `docs/roadmap/OHMIC_SHARED_STATUS_CONTROL_AND_STREAM_CONTRACT_RESULT_2026-03-17.md`
