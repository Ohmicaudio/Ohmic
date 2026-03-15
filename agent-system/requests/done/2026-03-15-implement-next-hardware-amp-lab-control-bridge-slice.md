Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T125107Z-60b904c4

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

## Outcome

Completed on 2026-03-15.

Result:

- confirmed the core AmpLab control bridge files
  `AmpLabControlHost.tsx`, `AmpLabControlSurfaces.tsx`, and
  `useAmpLabControlPlane.ts` were already present in repo history from the
  earlier `3695099` bridge commit
- landed the two directly required control-surface dependencies that made the
  bridge packet compile cleanly as a bounded hardware shell/control slice:
  `AmpLabAlertCenter.tsx` and `DeskLabNodeControls.tsx`
- kept discovery, telemetry, transport, DSP, Android, and deeper
  `services/hardware/*` churn out of the commit

## Verification

- identified the slice packet from
  `docs/roadmap/OHMIC_HARDWARE_NEXT_SERVICE_BRIDGE_SAFE_SLICE_2026-03-15.md`
- confirmed bridge-file history with:
  - `git log --oneline -- components/Hardware/AmpLabControlHost.tsx`
  - `git log --oneline -- components/Hardware/AmpLabControlSurfaces.tsx`
  - `git log --oneline -- components/Hardware/useAmpLabControlPlane.ts`
  - result: all three resolve to prior bridge commit `3695099`
- ran:
  - `npm run build`
  - result: passed, including the hardware shell/control bundles
- committed the bounded repo delta in `ohmic-audio-labs` as `16522ff`

## Notes

- the narrow supporting service-contract files in the request scope were
  consumed as existing support and did not require new edits in this packet
- the current truthful check floor for this slice is still the frontend build,
  not dedicated hardware control tests
