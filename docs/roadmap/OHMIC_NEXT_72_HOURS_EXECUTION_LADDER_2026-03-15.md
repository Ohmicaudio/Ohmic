scope: system
status: working_plan_for_approval
updated: 2026-03-15
horizon: 72_hours

# Ohmic Next 72 Hours Execution Ladder

## Purpose

Bridge the gap between the current ready queue and the broader 7-day plan.

This is the realistic “what happens after the next few task pickups” ladder.

## Assumptions

- doc-only and packet-only work may collapse in one focused session
- code slices may still expand if they reveal hidden coupling
- `ohmic-audio-labs` remains the main completion risk
- `B:\ohmic` should only carry intentional drift

## Phase 1: Close The First-Slice Wave Honestly

### Primary tasks

- `verify-first-osm-slice-in-correct-node-shell`
- `verify-first-hardware-shell-slice-check-coverage`
- `implement-next-hardware-amp-lab-control-bridge-slice`
- `define-next-android-wrapper-tracked-text-slice`

### Success condition

- the first OSM slice has truthful verification or a recorded environment
  blocker
- the first hardware shell slice has truthful verification coverage recorded
- the next hardware and Android follow-on slices are already bounded for pickup

## Phase 2: Promote The Next Safe Subsystem Slices

### First picks

1. `define-next-hardware-service-bridge-safe-slice`
2. `define-next-backend-control-plane-safe-slice`
3. `define-next-osm-canvas-disposition-and-noise-fence`

### Why this order

- keeps momentum inside the same dirty subsystems instead of drifting sideways
- turns one finished slice into the next bounded slice fast enough that the
  board stays ahead of execution

## Phase 3: Run Parallel Verification And Public Hygiene

### Follow-on picks

4. `run-static-boundary-and-host-smoke-floor`
5. `enforce-public-and-archive-freeze-boundary-in-handoff-and-queue-surfaces`
6. `strip-public-builder-and-scaffold-language`
7. `strip-remaining-raw-source-footers-from-public-pages`
8. `verify-public-cleanup-wave-after-current-claims`

### Why these are later

- useful and real, but not stronger than the app-slice continuity work
- they support trust and public cleanliness without becoming the center lane

## Parallel Split Guidance

### If one person is working

Run Phase 1 first, then Phase 2.

### If two people are working

- person 1:
  - Android wrapper hygiene slice
  - then OSM verification
- person 2:
  - hardware verification
  - then next hardware service-bridge definition

### If three people are working

- person 1: Android wrapper hygiene slice
- person 2: OSM verification, then next OSM boundary definition
- person 3: hardware verification, then next backend slice definition

### If four people are working

- person 1: Android wrapper hygiene slice
- person 2: OSM verification
- person 3: hardware verification
- person 4: public cleanup / static smoke lane

Static/public durability should only outrank the app lanes if those app lanes
are already claimed or concretely blocked.

## Branch Rules

### If verification is environment-blocked

- record the exact shell/runtime blocker
- queue the corrective verification task instead of pretending the slice is
  fully blessed

### If the ready queue drops below `4`

- replenish it before leaving the current lane
- prefer real follow-ons from the just-finished subsystem over broad new idea
  generation

## Completion Markers

The 72-hour ladder is successful if, by the end:

- the first-slice wave is actually verified or honestly blocked
- Android is no longer a mysterious churn bucket
- the next hardware, backend, and OSM slices are already queued
- the ready board stays above the floor instead of collapsing after each burst
