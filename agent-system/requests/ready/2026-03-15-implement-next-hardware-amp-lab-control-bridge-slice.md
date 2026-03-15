Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Next Hardware AmpLab Control Bridge Slice

## Goal

Implement the next bounded hardware/control slice as the AmpLab control bridge
between the new shell hosts and a narrow supporting service contract.

## Use

- `docs/roadmap/OHMIC_HARDWARE_NEXT_SERVICE_BRIDGE_SAFE_SLICE_2026-03-15.md`

## Scope

- `components/Hardware/AmpLabControlHost.tsx`
- `components/Hardware/AmpLabControlSurfaces.tsx`
- `components/Hardware/useAmpLabControlPlane.ts`
- `services/hardware/amplab/AmpLabSessionManager.ts`
- `services/hardware/amplab/commandPolicy.ts`
- `services/hardware/amplab/types.ts`

## Acceptance

- host-to-control bridge lands as one bounded slice
- discovery, telemetry, transport, DSP, and Android files stay out
- verification is recorded honestly for the touched surface
