scope: system
status: active_handoff_board
updated: 2026-03-15

# Ohmic Post Error Reporting 20 Minute Queue

## Purpose

Define the immediate execution order once the page error reporting lane is:

- implemented
- tested
- and the matching queue moves are staged

This is intentionally short.

It is the next burst, not another giant roadmap.

## Trigger

Start this queue after these four tasks are finished and tested:

- `define-page-issue-reporter-ui-contract`
- `extend-support-intake-for-page-error-capture`
- `build-page-report-triage-queue-view`
- `implement-page-report-button-on-core-surfaces`

## Immediate Sequence

### 1. Close the generated loudspeaker artifact loop

Task:

- `resolve-generated-loudspeaker-output-disposition`

Why:

- it is a clean umbrella-drift closure
- it removes one ambiguous artifact from the top-level repo

### 2. Take the first OSM editor-shell slice

Task:

- `commit-first-ohmic-osm-editor-shell-safe-slice`

Why:

- highest-value app-adjacent slice already shaped by inventory
- should move from planning into one real commit proposal or implementation

### 3. Split the first hardware/control safe slice

Task:

- `split-first-hardware-control-safe-commit-slice`

Why:

- this is the next large user-facing dirty lane after toolbox and OSM

### 4. Split the first backend safe slice

Task:

- `split-first-backend-safe-commit-slice`

Why:

- keeps backend from remaining a vague dirty mass
- gives the next service-level lane a real boundary

### 5. Inventory Android wrapper lane if no better app slice is ready

Task:

- `inventory-android-wrapper-dirty-subsystem`

Why:

- useful parallel-safe lane
- should not outrank the first three if a stronger app slice is moving

## Parallel Split

If two people are free:

- person 1: `commit-first-ohmic-osm-editor-shell-safe-slice`
- person 2: `split-first-hardware-control-safe-commit-slice`

If three people are free:

- person 1: OSM editor-shell
- person 2: hardware/control split
- person 3: backend split

If one person is free:

- do them in the numbered order above

## Stop Conditions

Pause and refresh the board if:

- another agent already completes one of the first three tasks
- OSM slice grows beyond `apps/osm-web`
- hardware/control slice starts mixing Android or generic modal churn
- backend slice starts bundling unrelated frontend runtime work
