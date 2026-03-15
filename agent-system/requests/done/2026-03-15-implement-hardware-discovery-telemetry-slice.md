Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: codex
Claim ID: 20260315T195000Z-6d6ca0b1

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

## Outcome

Completed on 2026-03-15.

Result:

- landed the bounded hardware discovery/telemetry hook family in
  `ohmic-audio-labs` as commit `e38c06a`
- included only:
  - `components/Hardware/useAmpLabDiscoveryPlane.ts`
  - `components/Hardware/useAmpLabTelemetryStream.ts`
- explicitly left `DeviceRegistry.ts` and transport auth service churn out
  because those diffs were line-ending noise, not semantic slice content

## Verification

- `cmd.exe /C "cd /D B:\ohmic\repos\ohmic-audio-labs && C:\PROGRA~1\nodejs\npm.cmd run test -- --run test/services/amplabDeviceRegistry.test.ts test/services/amplabTransportAuth.test.ts test/components/AmpLabControlHost.test.tsx test/components/AmpLabControlSurfaces.test.tsx"`
- `cmd.exe /C "cd /D B:\ohmic\repos\ohmic-audio-labs && C:\PROGRA~1\nodejs\npm.cmd run build"`

## Follow-On

- direct hook-specific coverage still does not exist for the new discovery and
  telemetry hooks
