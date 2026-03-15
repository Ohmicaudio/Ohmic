Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Ohm's Law In Toolbox UI

## Goal

Expose the shared `calculateElectricalResult` math in the `ohmic-toolbox` UI
as a public-facing electrical helper.

## Why

The shared math already exists and the second-wave surface strategy now says
`Ohm's Law` should stay inside `ohmic-toolbox` first.

The next useful step is to make it real in the app.

## Inputs

- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`
- `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
- `B:\ohmic\docs\roadmap\OHMIC_SECOND_WAVE_TOOLBOX_SURFACE_STRATEGY_2026-03-15.md`

## Deliverable

A new `Ohm's Law` panel in `ohmic-toolbox` that:

- accepts any two known positive values
- computes the remaining two fields
- keeps the boundary explicit that this is not the speaker load tool

## Constraints

- reuse shared math
- no separate formula implementation
- do not turn this into `Wiring Lab`

## Outcome

Completed on 2026-03-15.

Result:

- `Ohm's Law` is now exposed inside `apps/ohmic-toolbox`
- the UI accepts two known values and computes the remaining electrical fields
- the copy keeps the boundary explicit that speaker load remains a `Wiring Lab`
  concern
