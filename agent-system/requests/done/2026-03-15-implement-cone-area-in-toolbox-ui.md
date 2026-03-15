Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Cone Area In Toolbox UI

## Goal

Expose the shared `calculateConeAreaResult` math in the `ohmic-toolbox` UI as
the next design/SPL utility.

## Why

`Cone Area` is one of the selected second-wave public tools and the shared math
already exists.

## Inputs

- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`
- `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
- `B:\ohmic\docs\roadmap\OHMIC_SECOND_WAVE_TOOLBOX_SURFACE_STRATEGY_2026-03-15.md`

## Deliverable

A new `Cone Area` panel in `ohmic-toolbox` that:

- accepts diameter and count
- shows total cone area clearly
- positions the result as a comparison/support helper, not a full design app

## Constraints

- reuse shared math
- no separate formula implementation

## Outcome

Completed on 2026-03-15.

Result:

- `Cone Area` is now exposed inside `apps/ohmic-toolbox`
- the UI accepts diameter and driver count
- the copy positions it as a comparison helper rather than a full design lane
