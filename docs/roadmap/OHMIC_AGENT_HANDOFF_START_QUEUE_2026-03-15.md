scope: system
status: active_handoff_board
updated: 2026-03-15

# Ohmic Agent Handoff Start Queue

## Purpose

Provide the first pickup order for agents starting the next completion wave.

## First Pickup Order

### 1. Implement first OSM editor-shell slice

Task:

- `implement-first-ohmic-osm-editor-shell-slice`

Why first:

- the OSM packet is done
- the next real move is the actual bounded `osm-web` commit

### 2. Implement first hardware/control shell slice

Task:

- `implement-first-hardware-control-shell-slice`

Why second:

- the split packet is done
- the next real move is one bounded hardware shell commit

### 3. Implement first backend measurement-capture slice

Task:

- `implement-first-backend-measurement-capture-slice`

Why third:

- the split packet is done
- the next move is one bounded backend commit with explicit verification

### 4. Inventory Android wrapper dirty subsystem

Task:

- `inventory-android-wrapper-dirty-subsystem`

Why fourth:

- Android remains a large mixed dirty lane
- it deserves explicit separation from the main web/runtime path

### 5. Push static-content clean slice if remote not aligned

Task:

- `push-static-content-clean-slice-if-remote-not-aligned`

Why fifth:

- lower urgency than app completion
- still worth closing if a local-only clean slice remains

### 6. Define public and archive freeze boundary

Task:

- `define-public-and-archive-freeze-boundary`

Why sixth:

- prevents ongoing completion work from bleeding back into frozen high-noise
  areas

### 7. Page error reporting lane

Tasks:

- `define-page-issue-reporter-ui-contract`
- `extend-support-intake-for-page-error-capture`
- `build-page-report-triage-queue-view`
- `implement-page-report-button-on-core-surfaces`

Why in parallel:

- user explicitly wants it remembered and staged
- backend triage path already exists, so this is an extension lane not a green
  field system
- it should not outrank the first app-safe slices unless it is directly
  unblocking a live product failure

## Coordination Rules

- claim before editing
- if a task is moved to `done`, immediately stage the matching queue move
- if another agent completes a lane underfoot, do not re-open it casually
- if a subsystem inventory reveals a safer narrower slice, create a new ready
  task instead of improvising it in chat
- assume a doc-only or packet-only task may finish in one focused session and
  size it accordingly

## Immediate Follow-On

After the page error reporting lane is finished and tested, use:

- `docs/roadmap/OHMIC_POST_ERROR_REPORTING_20_MINUTE_QUEUE_2026-03-15.md`
