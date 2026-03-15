# Expose Ohmic Toolbox App Surface

Status: done
Priority: high
Owner: codex
Date: 2026-03-14

## Goal

Turn the newly imported `ohmic-toolbox` app into an intentional surface inside `B:\ohmic`, not just a salvaged folder.

## Inputs

- `/mnt/b/ohmic/repos/ohmic-audio-labs/apps/ohmic-toolbox`
- `/mnt/b/ohmic/docs/roadmap/OHMIC_TOOLBOX_IMPORT_SURFACE_DECISION_2026-03-14.md`
- `/mnt/b/ohmic/docs/roadmap/OHMIC_TOOLBOX_FIRST_WAVE_IMPLEMENTATION_PACKET_2026-03-14.md`

## Questions To Resolve

1. How should developers launch it consistently
2. Whether it should stay standalone under `apps/` or be linked from the main shell
3. What minimal docs or scripts are needed so it is discoverable and usable

## Deliverable

A small integration slice that does one or more of:

- adds a root-level launch script
- documents app-local usage
- links the app from an appropriate repo-local startup surface

## Result

Completed as a low-risk app-surface integration slice.

Delivered:

- app-local launch instructions in `apps/ohmic-toolbox/README.md`
- app discovery and usage notes in `apps/README.md`

Implementation commit:

- `6c7631a` in `ohmic-audio-labs`

Verification:

- `cd apps/ohmic-toolbox && npm run test` passed
- `cd apps/ohmic-toolbox && npm run build` passed

Note:

- root `package.json` scripts were intentionally not used for this slice because the surrounding branch carried unrelated package drift and the safer move was app-local launch documentation

## Constraints

- do not widen scope into second-wave calculators yet
- keep the app standalone and low-risk
