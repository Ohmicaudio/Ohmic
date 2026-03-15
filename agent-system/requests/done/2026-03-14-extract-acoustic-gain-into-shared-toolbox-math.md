Status: done
Priority: medium
Date: 2026-03-14
Project: ohmic-audio-labs

# Extract Acoustic Gain Into Shared Toolbox Math

## Goal

Prepare `Acoustic Gain` as the next public-facing shared-math calculator after `Ohm's Law` and `Cone Area`.

## Why

`Acoustic Gain` is one of the strongest remaining public mini-tools because it is:

- easy to explain
- useful for upgrade comparison
- suitable for both education and lead-gen utility

## Inputs

- `A:\designlab\apps\ohmic-toolbox\src\store.ts`
- `B:\ohmic\docs\roadmap\OHMIC_TOOLBOX_SECOND_WAVE_PUBLIC_MINI_TOOLS_2026-03-14.md`
- `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`

## Deliverable

A small extraction plan or implementation slice that defines:

- canonical inputs and outputs
- shared formula boundaries
- expected tests and fixtures

## Constraints

- do not widen into UI implementation unless the math slice is already stable
- preserve the shared-core pattern used by the first-wave calculators

## Completion

- added `AcousticGainInputs`, `AcousticGainResult`, and `calculateAcousticGainResult` to `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
- added canonical `acousticGainFixtures` to `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.fixtures.ts`
- extended `B:\ohmic\repos\ohmic-audio-labs\test\utils\toolboxMath.test.ts` with acoustic-gain fixture coverage
- extended `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\calculators.ts` to re-export the new shared acoustic-gain math types and solver
- verified `cd apps/ohmic-toolbox && npm run test`
- verified `npx vitest run test/utils/toolboxMath.test.ts`
