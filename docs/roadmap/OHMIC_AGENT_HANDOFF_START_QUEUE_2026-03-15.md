scope: system
status: active_handoff_board
updated: 2026-03-15

# Ohmic Agent Handoff Start Queue

## Purpose

Provide the first pickup order for agents starting the next completion wave.

## First Pickup Order

Do not skip to lower-risk work while items 1-3 are open unless:

- the item is already actively claimed
- the item is truly blocked
- or the blocker is recorded and visible in the queue

### 1. Verify first OSM slice in the correct shell

Task:

- `verify-first-osm-slice-in-correct-node-shell`

Why first:

- the OSM slice is committed, but truthful verification is still incomplete from
  this bash environment
- we need one real pass from the correct Node shell or an explicit recorded
  blocker

### 2. Verify first hardware/control shell slice coverage

Task:

- `verify-first-hardware-shell-slice-check-coverage`

Why second:

- the hardware shell slice landed, but its truthful check floor still needs to
  be recorded cleanly
- this keeps implementation durability honest

### 3. Implement next hardware AmpLab control bridge slice

Task:

- `implement-next-hardware-amp-lab-control-bridge-slice`

Why third:

- the next hardware bridge is now bounded cleanly
- the real move is implementation, not more abstract slice-writing

### 4. Define next Android wrapper tracked-text slice

Task:

- `define-next-android-wrapper-tracked-text-slice`

Why fourth:

- the Android hygiene slice is already done
- the remaining tracked wrapper files need one deliberate next slice instead of
  falling back into mystery churn

### 5. Define next backend control-plane safe slice

Task:

- `define-next-backend-control-plane-safe-slice`

Why fifth:

- the first backend family is already satisfied
- the next backend move should be chosen deliberately instead of letting the
  whole service lane blur together

### 6. Define next OSM canvas disposition and noise fence

Task:

- `define-next-osm-canvas-disposition-and-noise-fence`

Why sixth:

- `CanvasView.tsx`, nested `dist/`, and nested `node_modules/` still create
  ambiguity inside the OSM lane
- this gives the next OSM pickup a tighter boundary

### 7. Run static boundary and host smoke floor

Task:

- `run-static-boundary-and-host-smoke-floor`

Why seventh:

- this is a trustworthy low-blast-radius verification lane
- it supports public durability without outranking the main app slices

### 8. Enforce public/archive freeze boundary in queue and handoff surfaces

Task:

- `enforce-public-and-archive-freeze-boundary-in-handoff-and-queue-surfaces`

Why eighth:

- the freeze rule exists
- the operational surfaces should reflect it so legacy content does not creep
  back into active completion work

### 9. Public cleanup lane

Tasks:

- `strip-remaining-raw-source-footers-from-public-pages`
- `verify-public-cleanup-wave-after-current-claims`

Constraint:

- do not choose these ahead of items 1-6 just because they are cleaner or safer

## Avoidance Rule

If an agent keeps selecting low-risk side work while the first app slices are
open, that is not neutral prioritization. Treat it as avoidance and redirect
back to items 1-6.

## Coordination Rules

- claim before editing
- if a task is moved to `done`, immediately stage the matching queue move
- if another agent completes a lane underfoot, do not re-open it casually
- if a subsystem inventory reveals a safer narrower slice, create a new ready
  task instead of improvising it in chat
- assume a doc-only or packet-only task may finish in one focused session and
  size it accordingly
- keep at least `4` executable ready tasks visible; if the board is thinning,
  replenish it before leaving the lane

## Immediate Follow-On

After items 1-6 are either claimed or done, keep the queue above the floor by
promoting the next verified slice from the same subsystem instead of freelancing.
