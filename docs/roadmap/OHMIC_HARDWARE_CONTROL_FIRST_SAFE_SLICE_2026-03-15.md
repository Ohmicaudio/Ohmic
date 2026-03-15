Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Hardware Control First Safe Slice

## Purpose

Turn the giant `components/Hardware` lane into one first executable slice.

## Recommended First Slice

The first slice should focus on the new hardware shell hosts and orchestration
hooks, not the entire hardware feature universe.

## Exact Candidate Files

### Host and shell files

- `components/Hardware/HardwareDeckPanel.tsx`
- `components/Hardware/HardwareModalLayer.tsx`
- `components/Hardware/HardwareTopBar.tsx`
- `components/Hardware/UniversalOverlayWorkspace.tsx`
- `components/Hardware/README.md`

### Closely related hooks only if required

- `components/Hardware/useHardwareShellChrome.ts`
- `components/Hardware/useHardwareWorkspacePresentation.ts`
- `components/Hardware/useHardwarePersistence.ts`

## Why This Slice First

- these files look like the shell/presentation boundary for the new hardware
  workspace
- they are easier to reason about than transport, telemetry, or measurement
  orchestration
- they avoid mixing deep device-control logic with broad UI churn

## Explicitly Out Of Scope

- Android wrapper files
- `services/backend/*`
- DSP transport files
- measurement run lifecycle files
- old placeholder deletions unless they are directly replaced by the shell host

## Verification

At minimum:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npm run type-check
npm run test -- --run
```

If the full test suite is too wide for the slice, record the narrower component
or route-level checks actually used.

## Finish Condition

- one bounded hardware shell slice lands
- Android is not bundled into it
- deep transport/backend work is not bundled into it
