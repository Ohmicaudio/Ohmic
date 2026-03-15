Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Add Hardware Discovery Telemetry Regression Check

## Goal

Add one repeatable smoke artifact for the new AmpLab discovery and telemetry
hook lane.

## Source

- `agent-system/requests/done/2026-03-15-add-hardware-discovery-telemetry-hook-coverage.md`
- commits `e38c06a`, `31b0883`

## Focus

- repeatable hook or host-level smoke path
- explicit discovery inputs
- explicit telemetry connection expectation

## Acceptance

- one reusable regression check exists for the discovery/telemetry hook family
- direct hook coverage remains the narrow baseline
