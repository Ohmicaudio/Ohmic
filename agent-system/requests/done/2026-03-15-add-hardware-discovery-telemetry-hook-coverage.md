Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: codex
Claim ID: 20260315T195000Z-6d6ca0b1

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

## Outcome

Completed on 2026-03-15.

Result:

- added direct hook coverage in
  `test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`
- covered:
  - discovery auto-link behavior for a single reachable AmpLab unit
  - telemetry fallback from WS to HTTP plus telemetry frame forwarding

## Verification

- `cmd.exe /C "cd /D B:\ohmic\repos\ohmic-audio-labs && C:\PROGRA~1\nodejs\npm.cmd run test -- --run test/components/AmpLabDiscoveryTelemetryHooks.test.tsx"`
- `cmd.exe /C "cd /D B:\ohmic\repos\ohmic-audio-labs && C:\PROGRA~1\nodejs\npm.cmd run test -- --run test/components/AmpLabDiscoveryTelemetryHooks.test.tsx test/services/amplabDeviceRegistry.test.ts test/services/amplabTransportAuth.test.ts test/components/AmpLabControlHost.test.tsx test/components/AmpLabControlSurfaces.test.tsx"`
