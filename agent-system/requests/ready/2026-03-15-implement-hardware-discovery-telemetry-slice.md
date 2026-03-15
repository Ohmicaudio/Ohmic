Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Hardware Discovery Telemetry Slice

## Goal

Land the bounded hardware discovery-and-telemetry slice that follows the AmpLab
control bridge.

## Source

- `docs/roadmap/OHMIC_HARDWARE_NEXT_DISCOVERY_TELEMETRY_SAFE_SLICE_2026-03-15.md`

## Focus

- discovery hook
- telemetry hook
- registry/auth edges
- no transport/adapter sprawl

## Acceptance

- one bounded discovery/telemetry commit lands
- scope stays inside the packet boundary
- bridge coverage remains intact afterward
