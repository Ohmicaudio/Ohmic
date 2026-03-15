Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Acoustic Gain In Toolbox UI

## Goal

Expose the newly shared `Acoustic Gain` math as a real calculator surface inside `apps\ohmic-toolbox`.

## Why

The shared math slice is complete and tested.

The next useful step is to make it visible in the toolbox UI without widening into a full second-wave overhaul.

## Inputs

- `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
- `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.fixtures.ts`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`
- `B:\ohmic\docs\roadmap\OHMIC_TOOLBOX_SECOND_WAVE_PUBLIC_MINI_TOOLS_2026-03-14.md`

## Deliverable

A minimal UI slice for `Acoustic Gain` that:

- uses shared math only
- fits the current toolbox surface
- has app-local test coverage if needed

## Constraints

- do not widen into the whole second wave
- preserve the current app shape
- do not re-implement formulas locally

## Completion

- added an `Acoustic Gain` panel to `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\App.tsx`
- added `acousticGain` state and `updateAcousticGain` logic to `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\store.ts`
- added supporting panel copy styling to `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\styles.css`
- verified `cd apps/ohmic-toolbox && npm run test`
- verified `cd apps/ohmic-toolbox && npm run build`
