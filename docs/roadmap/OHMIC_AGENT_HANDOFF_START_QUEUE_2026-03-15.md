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

### 1. Define next backend control-plane safe slice

Task:

- `define-next-backend-control-plane-safe-slice`

Why first:

- the first backend family is already satisfied
- the next backend move should be bounded before the service lane turns back
  into one blur

### 2. Define next OSM canvas disposition and noise fence

Task:

- `define-next-osm-canvas-disposition-and-noise-fence`

Why second:

- `CanvasView.tsx`, nested `dist/`, and nested `node_modules/` still create
  ambiguity inside the OSM lane
- this gives the next OSM pickup a tighter boundary

### 3. Enforce public/archive freeze boundary in queue and handoff surfaces

Task:

- `enforce-public-and-archive-freeze-boundary-in-handoff-and-queue-surfaces`

Why third:

- the freeze rule exists
- the operational surfaces should reflect it where agents actually look

### 4. Strip remaining raw source footers from public pages

Task:

- `strip-remaining-raw-source-footers-from-public-pages`

Why fourth:

- this is an active public cleanup lane that is still real work
- it should finish cleanly instead of lingering half-closed

### 5. JSON loop packet lane

Tasks:

- `define-live-agent-state-json-contract`
- `define-agent-inbox-outbox-event-model`
- `define-orchestrator-lock-and-worker-heartbeat-model`
- `define-stable-idle-stop-and-crash-recovery-rules`
- `define-runner-wrapper-cycle-for-json-agent-loop`

Why fifth:

 - the reusable loop work is now a real background lane
 - it should stay below the stronger main completion work unless the board is
   already healthy

### 6. Run static boundary and host smoke floor

Task:

- `run-static-boundary-and-host-smoke-floor`

Why sixth:

- this is a trustworthy low-blast-radius verification lane
- it supports public durability without outranking the main app slices

## Avoidance Rule

If an agent keeps selecting low-risk side work while the strongest current
lanes are open, that is not neutral prioritization. Treat it as avoidance and
redirect back to items 1-4.

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

After items 1-4 are either claimed or done, keep the queue above the floor by
promoting the next verified slice from the same subsystem instead of freelancing.
