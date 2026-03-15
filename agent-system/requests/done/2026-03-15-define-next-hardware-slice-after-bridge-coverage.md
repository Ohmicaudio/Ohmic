Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Next Hardware Slice After Bridge Coverage

## Goal

Define the next truthful hardware slice after the AmpLab control bridge and its
direct coverage are in place.

## Source

- `docs/roadmap/OHMIC_HARDWARE_NEXT_SERVICE_BRIDGE_SAFE_SLICE_2026-03-15.md`
- commit `3695099`
- commit `8031c80`

## Focus

- next bounded hardware/control lane
- what stays out
- verification surface

## Acceptance

- one clear next hardware slice packet exists
- it follows the now-landed bridge work
- the hardware lane stays deliberate instead of sprawling

## Completion Notes

- Defined the next packet at
  `docs/roadmap/OHMIC_HARDWARE_NEXT_DISCOVERY_TELEMETRY_SAFE_SLICE_2026-03-15.md`
- Chosen next slice:
  - `components/Hardware/useAmpLabDiscoveryPlane.ts`
  - `components/Hardware/useAmpLabTelemetryStream.ts`
  - `services/hardware/amplab/DeviceRegistry.ts`
  - `services/hardware/amplab/transports/auth.ts`
- This follows the landed bridge and direct bridge tests without reopening BLE
  provisioning, adapter internals, or broader measurement orchestration
