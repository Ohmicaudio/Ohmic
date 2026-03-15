Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Next Hardware AmpLab Control Bridge Slice

## Goal

Take the next AmpLab control bridge slice from packet to code while still
keeping discovery, telemetry, DSP internals, and Android out of scope.

## Source

- `docs/roadmap/OHMIC_HARDWARE_NEXT_SERVICE_BRIDGE_SAFE_SLICE_2026-03-15.md`

## Focus

- AmpLab session and command contract edges
- host-to-surface bridge behavior
- narrow service touchpoints only
- no broad hardware service expansion

## Acceptance

- one real bridge slice lands cleanly
- touched files stay inside the documented bridge boundary
- follow-on scope is easier to isolate afterward
