Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T190111Z-0bfcecb9

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

## Outcome

Completed on 2026-03-15.

Result:

- added direct component coverage for the bounded AmpLab control bridge slice
- verified the host maps the live session snapshot into control-surface props
- verified the control surface sanitizes and sends valid BLE JSON commands while rejecting invalid JSON
- narrowed the remaining gap to `useAmpLabControlPlane.ts` transport fallback behavior

## Artifact

- `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabControlHost.test.tsx`
- `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabControlSurfaces.test.tsx`
- `B:\ohmic\docs\roadmap\OHMIC_AMPLAB_CONTROL_BRIDGE_COVERAGE_2026-03-15.md`

## Verification

- `npx vitest run test/components/AmpLabControlHost.test.tsx test/components/AmpLabControlSurfaces.test.tsx`
