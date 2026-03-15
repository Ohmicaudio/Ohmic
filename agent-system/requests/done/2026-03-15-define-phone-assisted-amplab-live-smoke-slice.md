Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Phone-Assisted AmpLab Live Smoke Slice

## Goal

Define the smallest honest phone-assisted live validation slice now that phones
can be plugged in on demand.

## Source

- `agent-system/requests/done/2026-03-15-implement-hardware-discovery-telemetry-slice.md`
- `agent-system/requests/done/2026-03-15-add-hardware-discovery-telemetry-hook-coverage.md`

## Focus

- one phone involvement path only
- no full measurement orchestration sprawl
- exact preconditions, expected signals, and finish criteria

## Acceptance

- one clean phone-assisted smoke packet exists
- it follows naturally from the discovery/telemetry lane
- later execution will not need to rediscover the setup
