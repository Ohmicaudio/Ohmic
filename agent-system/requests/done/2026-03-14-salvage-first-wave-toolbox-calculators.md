# Salvage First-Wave Toolbox Calculators

Status: done
Priority: high
Owner: codex
Date: 2026-03-14

## Goal

Carry the first useful `ohmic-toolbox` calculator wave into `B:\ohmic`.

## First Wave

- Wiring Lab
- Box Volume
- Wire Gauge

## Inputs

- `/mnt/b/ohmic/docs/roadmap/OHMIC_TOOLBOX_CALCULATOR_INVENTORY_2026-03-14.md`
- `/mnt/b/ohmic/docs/roadmap/OHMIC_TOOLBOX_IMPORT_SURFACE_DECISION_2026-03-14.md`
- `/mnt/b/ohmic/docs/roadmap/OHMIC_TOOLBOX_FIRST_WAVE_IMPLEMENTATION_PACKET_2026-03-14.md`
- `/mnt/a/designlab/apps/ohmic-toolbox/src/App.tsx`
- `/mnt/a/designlab/apps/ohmic-toolbox/src/store.ts`

## Deliverable

One of:

- reusable calculator modules in the chosen `B:` destination
- or a clearly scoped placeholder app surface in `B:` using the first-wave logic

Preferred destination:

- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`

## Result

Completed as a first import slice in:

- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`

Included:

- Wiring Lab
- Box Volume
- Wire Gauge
- reusable calculator helpers
- basic Vitest coverage for the imported formulas

Implementation commit:

- `5743215` in `ohmic-audio-labs`

Verification:

- `npm test` passed
- `npm run build` passed

## Constraints

- preserve source logic accuracy before visual redesign
- do not pull in all ten tools at once
- keep commits small and traceable
