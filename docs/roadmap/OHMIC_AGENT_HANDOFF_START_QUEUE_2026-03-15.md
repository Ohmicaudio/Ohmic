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

### 1. Fix backend index type-check spill after auth policy slice

Task:

- `fix-backend-index-type-check-spill-after-auth-policy-slice`

Why first:

- the bounded auth/policy slice is already validated and closed
- the real remaining backend pressure is the narrow `index.ts` type-check spill
- it is a sharper completion task than opening a brand new backend family

### 2. Commit OSM canvas theme token slice

Task:

- `commit-osm-canvas-theme-token-slice`

Why second:

- the OSM lane now has a one-file canvas slice ready to land
- it keeps generated workspace noise fenced out while moving the product lane
  forward

### 3. Enforce public/archive freeze boundary in queue and handoff surfaces

Task:

- `enforce-public-and-archive-freeze-boundary-in-handoff-and-queue-surfaces`

Why third:

- the freeze rule exists
- the operational surfaces should reflect it where agents actually look

### 4. Define next backend post-auth router safe slice

Task:

- `define-next-backend-post-auth-router-safe-slice`

Why fourth:

- the current backend implementation slice should already have its next bounded
  follow-on waiting
- this keeps the backend lane from going empty after one commit

### 5. Define next OSM post-canvas safe slice

Task:

- `define-next-osm-post-canvas-safe-slice`

Why fifth:

- the OSM queue should not depend on rediscovering the next boundary after the
  canvas slice lands
- this keeps the product lane ahead of execution
### 6. JSON loop packet lane

Tasks:

- `define-live-agent-state-json-contract`
- `define-agent-inbox-outbox-event-model`
- `define-orchestrator-lock-and-worker-heartbeat-model`
- `define-stable-idle-stop-and-crash-recovery-rules`
- `define-runner-wrapper-cycle-for-json-agent-loop`

Why sixth:

 - the reusable loop work is now a real background lane
 - it should stay below the stronger main completion work unless the board is
   already healthy

## Avoidance Rule

If an agent keeps selecting low-risk side work while the strongest current
lanes are open, that is not neutral prioritization. Treat it as avoidance and
redirect back to items 1-5.

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

After items 1-5 are either claimed or done, keep the queue above the floor by
promoting the next verified slice from the same subsystem instead of freelancing.
