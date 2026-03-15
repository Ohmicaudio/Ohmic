Status: ready
Priority: medium
Date: 2026-03-14
Project: ohmic-audio-labs

# Extract Ohms Law Into Shared Toolbox Math

## Goal

Prepare `Ohm's Law` as the next shared-math-compatible calculator lane.

## Why

`Ohm's Law` is one of the strongest next mini-tools:

- compact
- reusable
- educational
- likely to be used across multiple surfaces

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

- added `ElectricalInputs`, `ElectricalResult`, and `calculateElectricalResult` to `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
- added canonical `electricalFixtures` to `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.fixtures.ts`
- extended `B:\ohmic\repos\ohmic-audio-labs\test\utils\toolboxMath.test.ts` with Ohm's Law fixture coverage and an invalid-input guard
- extended `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\calculators.ts` to re-export the new shared electrical math types and solver
- verified `cd apps/ohmic-toolbox && npm run test`
- verified `npx vitest run test/utils/toolboxMath.test.ts`
