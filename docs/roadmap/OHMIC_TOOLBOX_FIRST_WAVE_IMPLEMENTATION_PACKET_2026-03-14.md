# Ohmic Toolbox First-Wave Implementation Packet

Status: active packet
Date: 2026-03-14

## Purpose

Define the first-wave `ohmic-toolbox` salvage in implementation terms so the work can start cleanly inside `B:\ohmic`.

## Destination

Chosen home:

- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`

Decision source:

- `/mnt/b/ohmic/docs/roadmap/OHMIC_TOOLBOX_IMPORT_SURFACE_DECISION_2026-03-14.md`

## First-Wave Scope

Import only:

1. Wiring Lab
2. Box Volume
3. Wire Gauge

Do not pull the other seven calculators in the first slice.

## Source Files

Primary source files in `A:`:

- `/mnt/a/designlab/apps/ohmic-toolbox/src/App.tsx`
- `/mnt/a/designlab/apps/ohmic-toolbox/src/store.ts`
- `/mnt/a/designlab/apps/ohmic-toolbox/src/WiringDiagram.tsx`

## What To Carry

### Wiring Lab

Carry:

- sub count
- voice coil type
- coil impedance
- series / parallel selection
- resulting impedance
- diagram rendering

Current source logic:

- in `store.ts`
- `SVC = 1 coil`
- `DVC = 2 coils`
- `QVC = 4 coils`
- parallel result:
  - `coilImpedance / (subCount * coils)`
- series result:
  - `coilImpedance * subCount * coils`

### Box Volume

Carry:

- enclosure dimensions
- material thickness
- sub displacement
- port type and dimensions
- net volume
- tuning frequency

Current source logic:

- gross internal volume from dimension reduction
- net volume subtracts:
  - sub displacement
  - port displacement
- tuning frequency derived from area, volume, and port length

### Wire Gauge

Carry:

- material
- amperage
- run length
- run count
- recommended gauge
- voltage drop

Current source logic:

- `OFC` resistance constant: `0.000157`
- `CCA` resistance constant: `0.000251`
- voltage drop:
  - `(amperage * resPerFt * lengthFt * 2) / runs`
- current recommendation thresholds:
  - over `150A` -> `1/0 AWG`
  - over `80A` -> `4 AWG`
  - else -> `8 AWG`

## Implementation Recommendation

### Phase 1

Create a narrow toolbox app shell in:

- `apps/ohmic-toolbox`

With:

- local state
- only first-wave calculators
- minimal presentational shell

### Phase 2

Extract reusable logic into shared calculator modules only after:

- first-wave behavior is verified
- formulas are covered by tests

### Phase 3

Decide whether:

- toolbox remains a standalone mini-app
- or first-wave tools are embedded into other product surfaces

## Guardrails

- preserve formula behavior before redesigning UI
- write tests for calculator outputs as the logic moves
- do not import `node_modules`, `dist`, or scratch artifacts
- do not widen scope into planner or hardware work during first-wave salvage

## Recommended Deliverables

1. app shell under `ohmic-audio-labs/apps/ohmic-toolbox`
2. first-wave calculator UI
3. tests for wiring, box, and wire gauge formulas
4. short README for future expansion
