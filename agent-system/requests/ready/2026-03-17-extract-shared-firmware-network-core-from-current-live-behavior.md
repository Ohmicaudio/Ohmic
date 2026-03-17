Status: ready
Priority: high
Date: 2026-03-17
Project: firmware

# Extract Shared Firmware Network Core From Current Live Behavior

## Goal

Define and begin the shared firmware network core using the working AmpLab/DSP
and remote behavior as source truth instead of continuing local clones.

## Source

- `docs/roadmap/OHMIC_NETWORK_AND_TELEMETRY_STACK_CONSOLIDATION_WAVE_2026-03-17.md`

## Focus

- shared Wi-Fi/connect/join/retry surface
- target persistence
- network status truth

## Acceptance

- the shared network-core seam is explicitly defined
- current live behavior is classified into shared vs device-specific layers
- new remote-only network divergence is no longer the default path

