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

## Phase 1: Start Real App Slices

### Primary tasks

- `implement-first-ohmic-osm-editor-shell-slice`
- `implement-first-hardware-control-shell-slice`
- `implement-first-backend-measurement-capture-slice`

### Success condition

- OSM has one real bounded execution slice
- hardware/control has a first executable slice
- backend has a first executable slice

## Phase 2: Run Parallel Support And Drift Lanes

### First picks

1. `resolve-generated-loudspeaker-output-disposition`
2. `define-page-issue-reporter-ui-contract`
3. `extend-support-intake-for-page-error-capture`
4. `build-page-report-triage-queue-view`
5. `implement-page-report-button-on-core-surfaces`

### Why this order

- closes top-level ambiguity
- moves the reporting lane forward without replacing app completion as the main
  focus

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

Run Phase 1 first, then Phase 2.

### If two people are working

- person 1:
  - OSM editor-shell slice
  - then error-reporting lane
- person 2:
  - hardware/control split
  - then generated loudspeaker output disposition

### If three people are working

- person 1: OSM editor-shell slice
- person 2: hardware/control split
- person 3: backend split, then error-reporting lane

### If four people are working

- person 1: OSM editor-shell slice
- person 2: hardware/control split
- person 3: backend split
- person 4: error-reporting lane

Android and static-content durability should only be pulled in once one of the
first three app-oriented lanes is already underway.

## Branch Rules

### If the error-reporting lane finishes fast

- do not invent a new reporting subproject
- keep it parallel to app slices, not above them

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

## Seeded Follow-On Branches

These are intentionally parked in `blocked` so the board stays ahead of
execution without pretending they are current work:

- `commit-second-ohmic-osm-support-slice-after-editor-shell`
- `commit-first-hardware-control-implementation-slice-after-split`
- `commit-first-backend-endpoint-slice-after-split`
- `commit-first-android-wrapper-safe-slice-after-inventory`
- `close-page-error-reporting-implementation-lane`
