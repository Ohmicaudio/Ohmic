Status: done
Priority: high
Date: 2026-03-14
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T024823Z-81f2e4fa

# Add Toolbox Canonical Fixtures And Cross-Surface Tests

## Goal

Turn the first-wave toolbox math into a more durable shared core by adding canonical fixtures and reusable test vectors.

## Why

The extraction into `utils\toolboxMath.ts` is done, but future surfaces still need a shared truth set so the formulas cannot drift quietly.

## Inputs

- `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
- `B:\ohmic\repos\ohmic-audio-labs\test\utils\toolboxMath.test.ts`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\calculators.test.ts`
- `B:\ohmic\docs\roadmap\OHMIC_NEXT_10_HOURS_EXECUTION_PLAN_2026-03-14.md`

## Deliverable

A fixture and test-vector layer that:

- defines canonical example inputs and outputs
- can be reused by future calculator consumers
- keeps Wiring Lab, Box Volume, and Wire Gauge consistent everywhere

## Constraints

- keep to first-wave calculators only
- preserve current formula behavior
- prefer pure TypeScript data fixtures over UI-bound test helpers

## Completion

- added canonical first-wave fixtures in `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.fixtures.ts`
- defined reusable input/output vectors for wiring, box, and wire-gauge calculations
- updated the root shared-math tests to consume the shared fixture layer
- updated the toolbox app tests to consume the same shared fixture layer
- verified `npm --prefix apps/ohmic-toolbox run test`
- verified `npx vitest run test/utils/toolboxMath.test.ts`
