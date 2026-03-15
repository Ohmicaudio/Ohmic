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

## Phase 1: Finish The Error Reporting Lane

### Primary tasks

- `define-page-issue-reporter-ui-contract`
- `extend-support-intake-for-page-error-capture`
- `build-page-report-triage-queue-view`
- `implement-page-report-button-on-core-surfaces`

### Success condition

- page reporting has one intake path
- route/context capture is explicit
- triage view expectations are defined
- the work is tested enough that the follow-on queue can start immediately

## Phase 2: Close Top-Level Drift And Start Real App Slices

### First picks

1. `resolve-generated-loudspeaker-output-disposition`
2. `commit-first-ohmic-osm-editor-shell-safe-slice`
3. `split-first-hardware-control-safe-commit-slice`
4. `split-first-backend-safe-commit-slice`

### Why this order

- removes one clear umbrella ambiguity first
- turns the already-inventoried subsystems into execution lanes
- keeps the next work anchored in the app, not in more queue theory

## Phase 3: Bound The Remaining Noise

### Follow-on picks

5. `inventory-android-wrapper-dirty-subsystem`
6. `push-static-content-clean-slice-if-remote-not-aligned`
7. `define-public-and-archive-freeze-boundary`

### Why these are later

- useful, but not stronger than the first app slices
- they are support lanes for cleaner completion, not the center of gravity

## Parallel Split Guidance

### If one person is working

Run the tasks in the exact order listed above.

### If two people are working

- person 1:
  - error reporting implementation lane
  - then OSM editor-shell slice
- person 2:
  - generated loudspeaker output disposition
  - then hardware/control split

### If three people are working

- person 1: error reporting lane
- person 2: OSM editor-shell slice
- person 3: hardware/control split, then backend split

### If four people are working

- person 1: error reporting lane
- person 2: OSM editor-shell slice
- person 3: hardware/control split
- person 4: backend split

Android and static-content durability should only be pulled in once one of the
first three app-oriented lanes is already underway.

## Branch Rules

### If the error-reporting lane finishes fast

- do not invent a new reporting subproject
- move straight into the Phase 2 sequence

### If the OSM slice widens past `apps/osm-web`

- stop and create a narrower ready task
- do not let it absorb packages, workers, or workspace cleanup

### If the hardware/control split reveals one obviously safe implementation slice

- queue it immediately as a new `ready` task
- keep the split note separate from the implementation slice

### If the backend split reveals a testable endpoint family

- queue that endpoint family as the next backend implementation slice
- include exact verification commands

## Completion Markers

The 72-hour ladder is successful if, by the end:

- the page-reporting lane is no longer just a remembered idea
- the generated loudspeaker artifact is no longer ambiguous
- one OSM slice has moved beyond inventory
- hardware/control and backend each have a first bounded executable slice
- Android and public/archive are bounded enough not to contaminate stronger work
