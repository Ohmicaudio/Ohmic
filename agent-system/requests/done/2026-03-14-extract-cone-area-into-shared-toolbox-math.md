Status: done
Priority: medium
Date: 2026-03-14
Project: ohmic-audio-labs

# Extract Cone Area Into Shared Toolbox Math

## Goal

Prepare `Cone Area` as another shared-math-compatible calculator lane after the first wave.

## Why

`Cone Area` is a good next shared utility because it is:

- simple
- useful for SPL and design contexts
- easy to surface in both education and tooling

## Inputs

- `A:\designlab\apps\ohmic-toolbox\src\store.ts`
- `B:\ohmic\docs\roadmap\OHMIC_TOOLBOX_CALCULATOR_INVENTORY_2026-03-14.md`
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

- added `ConeAreaInputs`, `ConeAreaResult`, and `calculateConeAreaResult` to `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
- added canonical `coneAreaFixtures` to `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.fixtures.ts`
- extended `B:\ohmic\repos\ohmic-audio-labs\test\utils\toolboxMath.test.ts` with cone-area fixture coverage
- extended `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\calculators.ts` to re-export the new shared cone-area math types and solver
- verified `cd apps/ohmic-toolbox && npm run test`
- verified `npx vitest run test/utils/toolboxMath.test.ts`
