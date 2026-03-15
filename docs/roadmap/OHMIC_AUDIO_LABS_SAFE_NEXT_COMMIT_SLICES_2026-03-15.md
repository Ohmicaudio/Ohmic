Status: split map
Date: 2026-03-15

# Ohmic Audio Labs Safe Next Commit Slices

## Purpose

Identify the next safe commit slices inside the current
`ohmic-audio-labs` worktree so completion can proceed without bundling unrelated
churn.

This is not a cleanup pass.

It is a commit-planning map.

## Main Rule

Only commit slices that meet all three conditions:

- one coherent product or infrastructure lane
- understandable blast radius
- verifiable without pretending the whole repo is clean

## Safe Next Commit Slices

## 1. Toolbox lane

Status:

- safest current lane

Includes:

- `apps/ohmic-toolbox`
- `utils/toolboxMath.ts`
- `utils/toolboxMath.fixtures.ts`
- `test/utils/toolboxMath.test.ts`

Why safe:

- already proven sliceable
- shared math and UI are coherent together
- branch history is already carrying this lane cleanly

Recommendation:

- keep using this as a standalone product slice
- do not mix toolbox commits with unrelated runtime or Android work

## 2. `Wiring Lab` product packet lane

Status:

- safe planning slice

Includes:

- toolbox/Wiring Lab product notes
- state-model notes
- implementation packets

Why safe:

- high value
- low blast radius
- can move independently of runtime cleanup

Recommendation:

- treat product-note and implementation-packet work as clean umbrella slices

## 3. Runtime check and verification lane

Status:

- safe planning/verification slice

Includes:

- minimum trusted runtime checks
- route smoke notes
- app/runtime verification packets

Why safe:

- helps every later commit
- low direct code risk

Recommendation:

- keep runtime-check work out of implementation commits

## 4. `products/ohmic-osm` lane

Count:

- `125` dirty paths under `products/ohmic-osm`

Status:

- separate triage lane

Why it should be its own slice:

- large enough to be a subsystem, not a side detail
- should not be committed together with main app shell or toolbox work

Recommendation:

- create a dedicated inventory and commit-slice plan for `products/ohmic-osm`
- do not mix it with `components/Hardware` or Android cleanup

## 5. Hardware/control UI lane

Main hot bucket:

- `components/Hardware`: `57`
- plus likely related `services/hardware`: `22`

Status:

- important but needs isolation first

Why:

- this is probably one coherent product lane
- but it is too broad for opportunistic commit without its own pass

Recommendation:

- next safe sub-slice should likely be:
  - `components/Hardware`
  - paired with only the directly related `services/hardware/*`
- do not mix with generic modals, tabs, or Android wrapper

## 6. Backend/service lane

Main hot bucket:

- `services/backend`: `26`

Status:

- potentially sliceable

Why:

- bounded service lane
- likely verifiable independently

Recommendation:

- treat backend service work as its own future commit lane
- keep separate from runtime UI and hardware UI

## Needs Isolation Before Commit

## 7. `components` broad UI lane

Sub-buckets:

- `components/Hardware`: `57`
- `components/Tabs`: `9`
- `components/Visualizations`: `7`
- `components/Modals`: `6`
- `components/Mobile`: `5`

Why not safe as one commit:

- too many surface types mixed together

Recommendation:

- split by UI family, not all `components/*` at once

## 8. `services` broad lane

Sub-buckets:

- `services/backend`: `26`
- `services/hardware`: `22`
- `services/ui-runtime`: `14`

Why not safe as one commit:

- those are clearly different systems

Recommendation:

- treat each as its own lane

## 9. `docs/specs`

Count:

- `67`

Why not safe as one commit:

- likely mixes active specs with older spec drift

Recommendation:

- only commit docs/specs when tied to one specific implementation lane

## Freeze For Later

## 10. `public`

Count:

- `594`

Recommendation:

- freeze
- no broad commit until its ownership/boundary is explicitly handled

## 11. Archive and created-book material

Buckets:

- `archive/*`
- `docs/archive/*`
- `docs/created book/*`

Recommendation:

- freeze

## 12. Android wrapper

Count:

- `32`

Recommendation:

- freeze until an Android-specific triage pass is taken

## Likely Cleanup Noise

Treat separately from product slices:

- `dist/`
- `node_modules/`
- `playwright-report/`
- `test-results/`
- `output/`
- `captures/`
- log files
- packaged zip artifacts

These should not be mixed into product commits.

## Recommended Next Commit Order

1. toolbox lane only
2. runtime-check packet only
3. `Wiring Lab` implementation packet only
4. `products/ohmic-osm` inventory lane
5. hardware/control UI inventory lane
6. backend/service inventory lane

## Summary

The safest next slices are not “clean the repo.”

They are:

- toolbox
- runtime verification
- `Wiring Lab` packets
- then isolated subsystem inventories for `ohmic-osm`, hardware/control UI, and
  backend services
