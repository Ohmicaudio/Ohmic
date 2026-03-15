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

### 1. Commit OSM canvas theme token slice

Task:

- `commit-osm-canvas-theme-token-slice`

Why first:

- the OSM lane now has a one-file canvas slice ready to land
- it keeps generated workspace noise fenced out while moving the product lane
  forward

### 2. Define next backend post-auth router safe slice

Task:

- `define-next-backend-post-auth-router-safe-slice`

Why second:

- the backend auth/policy slice and the narrow type-check spill are now both
  closed
- the next useful backend move is to define the next bounded family before the
  lane goes cold

### 3. Define next OSM post-canvas safe slice

Task:

- `define-next-osm-post-canvas-safe-slice`

Why third:

- the OSM queue should not depend on rediscovering the next boundary after the
  canvas slice lands
- this keeps the product lane ahead of execution

### 4. Define next public trust cleanup slice after freeze boundary

Task:

- `define-next-public-trust-cleanup-slice-after-freeze-boundary`

Why fourth:

- the freeze boundary is now operational
- the next public cleanup move should be chosen deliberately instead of drifting
  back into broad site churn

### 5. JSON loop packet lane

Tasks:

- `define-live-agent-state-json-contract`
- `define-agent-inbox-outbox-event-model`
- `define-orchestrator-lock-and-worker-heartbeat-model`
- `define-stable-idle-stop-and-crash-recovery-rules`
- `define-runner-wrapper-cycle-for-json-agent-loop`
- `define-json-dashboard-render-surface`
- `define-json-dashboard-input-writeback-flow`

Why fifth:

 - the reusable loop work is now a real background lane
 - it should stay below the stronger main completion work unless the board is
   already healthy

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
- app-side `public/` and archive surfaces are frozen by default; only touch
  them when a specific ready task names that lane explicitly

## Immediate Follow-On

After items 1-4 are either claimed or done, keep the queue above the floor by
promoting the next verified slice from the same subsystem instead of freelancing.
