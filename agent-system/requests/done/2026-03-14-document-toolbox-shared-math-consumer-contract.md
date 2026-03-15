Status: done
Priority: medium
Date: 2026-03-14
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T030221Z-7c190f36

# Document Toolbox Shared Math Consumer Contract

## Goal

Define how future calculator surfaces should consume `utils\toolboxMath.ts` without re-embedding formulas locally.

## Why

The shared math extraction is complete, but future reuse needs a short contract:

- what is canonical
- what is surface-only
- what test vectors must stay aligned

## Inputs

- `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
- `B:\ohmic\repos\ohmic-audio-labs\test\utils\toolboxMath.test.ts`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\calculators.ts`
- `B:\ohmic\docs\roadmap\OHMIC_NEXT_10_HOURS_EXECUTION_PLAN_2026-03-14.md`

## Deliverable

A short consumer contract covering:

- import boundary
- canonical types
- fixture expectations
- allowed surface-specific presentation logic

## Constraints

- no formula redesign
- keep scope to first-wave calculators
- prefer one concise doc over sprawling guidance

## Completion

- added `B:\ohmic\repos\ohmic-audio-labs\docs\specs\TOOLBOX_SHARED_MATH_CONSUMER_CONTRACT_2026-03-14.md`
- documented the canonical source files for formulas, types, fixtures, and shared regression coverage
- defined the import boundary, thin-wrapper rule, fixture expectations, and change rules for future calculator consumers
- recorded `apps\ohmic-toolbox` as the current reference consumer of the shared math layer
- no runtime tests were needed because this task only added consumer-contract documentation
