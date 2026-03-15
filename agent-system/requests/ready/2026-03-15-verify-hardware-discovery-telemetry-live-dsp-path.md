Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Verify Hardware Discovery Telemetry Live DSP Path

## Goal

Run one live-device validation pass against the plugged-in DSP unit using the
new AmpLab discovery and telemetry hooks.

## Source

- `agent-system/requests/done/2026-03-15-implement-hardware-discovery-telemetry-slice.md`
- commit `e38c06a`
- commit `31b0883`

## Focus

- unit discovery
- auto-link or manual link behavior
- live telemetry connection path
- exact auth or transport requirement surfaced by the real device

## Acceptance

- one live DSP validation pass is recorded honestly
- success or exact device/runtime blocker is written down
- no broad measurement or phone orchestration sprawl is mixed in
