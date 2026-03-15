# Extract Toolbox Shared Math Core

Status: ready
Priority: high
Owner: unassigned
Date: 2026-03-14

## Goal

Turn the first-wave toolbox formulas into a shared engineering core instead of leaving them app-local.

## Why

The ecosystem will eventually share:

- project data
- planner data
- calculator inputs
- generated outputs

That requires one canonical formula source so different surfaces do not diverge.

## Inputs

- `/mnt/b/ohmic/repos/ohmic-audio-labs/apps/ohmic-toolbox/src/calculators.ts`
- `/mnt/b/ohmic/repos/ohmic-audio-labs/apps/ohmic-toolbox/src/calculators.test.ts`
- `/mnt/b/ohmic/docs/roadmap/OHMIC_TOOLBOX_FIRST_WAVE_IMPLEMENTATION_PACKET_2026-03-14.md`

## Deliverable

A proposed or implemented shared home for:

- wiring calculations
- enclosure calculations
- wire gauge calculations

With:

- clear function boundaries
- tests
- a plan for future consumers like BassBuilder, OSM helpers, and mobile utilities

## Constraints

- preserve current tested behavior
- do not widen into all ten calculators yet
- prefer a clean shared module over app-specific state logic
