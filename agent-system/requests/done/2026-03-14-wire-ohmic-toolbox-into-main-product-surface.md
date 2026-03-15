Status: done
Priority: high
Date: 2026-03-14
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T025244Z-d55a2651

# Wire Ohmic Toolbox Into Main Product Surface

## Goal

Turn the imported `ohmic-toolbox` app into a clear product surface inside `ohmic-audio-labs` instead of leaving it as a hidden sub-app.

## Why

The first-wave calculator import is real product code now.

It needs:

- a clear entry surface
- clear local run guidance
- a clean relationship to the main app shell

## Inputs

- `B:\ohmic\repos\ohmic-audio-labs\apps\README.md`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\README.md`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\*`
- `B:\ohmic\docs\roadmap\OHMIC_NEXT_10_HOURS_EXECUTION_PLAN_2026-03-14.md`

## Deliverable

A documented and discoverable toolbox app surface that:

- can be found from the repo without spelunking
- does not create unsafe root-level churn
- stays compatible with the current branch state

## Constraints

- do not widen into more calculators
- do not redesign the main app shell
- avoid root `package.json` edits unless absolutely necessary
- preserve current test and build behavior

## Completion

- updated `apps\README.md` so `ohmic-toolbox` is discoverable from the repo root with explicit root-run commands and local URL
- updated `apps\ohmic-toolbox\README.md` to explain the app's relationship to the main product and the shared math layer
- added a compact in-app metadata panel in `apps\ohmic-toolbox\src\App.tsx` so the surface identifies its repo location, root run command, and shared math source
- normalized the visible result units in the toolbox UI to ASCII-safe labels
- verified `npm --prefix apps/ohmic-toolbox run test`
- verified `npm --prefix apps/ohmic-toolbox run build`
