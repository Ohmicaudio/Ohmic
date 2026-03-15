scope: system
status: active_handoff_board
updated: 2026-03-15

# Ohmic Agent Handoff Start Queue

## Purpose

Provide the first pickup order for agents starting the next completion wave.

## First Pickup Order

### 1. Loudspeaker generated-output closure

Task:

- `resolve-generated-loudspeaker-packet-lane`

Why first:

- one live generated-output drift item is still visible in `B:\ohmic`
- this is the cleanest leftover open loop

### 2. OSM subsystem inventory

Task:

- `inventory-products-ohmic-osm-dirty-subsystem`

Why second:

- `products/ohmic-osm` is a large dirty subsystem inside the main repo
- it should be isolated before anyone starts touching it casually

### 3. Hardware/control UI subsystem inventory

Task:

- `inventory-hardware-control-subsystem`

Why third:

- `components/Hardware` and `services/hardware` are large and high-impact
- likely the next major main-app lane after toolbox

### 4. Backend subsystem inventory

Task:

- `inventory-services-backend-subsystem`

Why fourth:

- backend is big enough to deserve its own split map
- likely safer to execute after the OSM and hardware/control inventories are
  shaped

### 5. Static-content durability verification

Task:

- `verify-static-content-remote-durability`

Why fifth:

- lower urgency than the main app subsystem triage
- but still worth closing if it is not fully remote yet

## Coordination Rules

- claim before editing
- if a task is moved to `done`, immediately stage the matching queue move
- if another agent completes a lane underfoot, do not re-open it casually
- if a subsystem inventory reveals a safer narrower slice, create a new ready
  task instead of improvising it in chat
- assume a doc-only or packet-only task may finish in one focused session and
  size it accordingly
