Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Add Hardware Discovery Telemetry Hook Coverage

## Goal

Add direct smoke coverage for the new AmpLab discovery and telemetry hooks.

## Source

- `agent-system/requests/done/2026-03-15-implement-hardware-discovery-telemetry-slice.md`
- commit `e38c06a`

## Focus

- `useAmpLabDiscoveryPlane.ts`
- `useAmpLabTelemetryStream.ts`
- narrow hook-level behavior only

## Acceptance

- one direct test or smoke harness exists for the new hook family
- bridge and registry/auth checks remain intact
