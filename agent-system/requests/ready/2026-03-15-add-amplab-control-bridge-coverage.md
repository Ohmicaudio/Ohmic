Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Add AmpLab Control Bridge Coverage

## Goal

Add one honest direct check for the bounded AmpLab control bridge files that are
already in the repo but still lack focused coverage.

## Source

- `docs/roadmap/OHMIC_HARDWARE_NEXT_SERVICE_BRIDGE_SAFE_SLICE_2026-03-15.md`
- `agent-system/requests/done/2026-03-15-implement-next-hardware-amp-lab-control-bridge-slice.md`

## Focus

- `AmpLabControlHost.tsx`
- `AmpLabControlSurfaces.tsx`
- `useAmpLabControlPlane.ts`
- narrow service/host interaction only
- no discovery, telemetry, DSP, or Android expansion

## Acceptance

- at least one direct component or hook-level check exists for the AmpLab control bridge slice
- the covered bridge behavior is documented clearly
- any remaining gaps are narrowed to specific follow-on surfaces
