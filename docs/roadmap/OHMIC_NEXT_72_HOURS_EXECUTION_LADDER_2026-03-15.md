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

- `commit-osm-canvas-theme-token-slice`
- `define-next-backend-post-auth-router-safe-slice`
- `define-next-osm-post-canvas-safe-slice`
- `define-next-public-trust-cleanup-slice-after-freeze-boundary`

### Success condition

- the OSM lane moves through a real one-file canvas slice
- the backend lane already has its next bounded family staged
- backend and OSM both have their next bounded follow-ons already staged
- the next public trust cleanup move is deliberate rather than ambient drift

## Phase 2: Promote The Next Safe Subsystem Slices

### First picks

1. `define-live-agent-state-json-contract`
2. `define-agent-inbox-outbox-event-model`
3. `define-orchestrator-lock-and-worker-heartbeat-model`
4. `define-stable-idle-stop-and-crash-recovery-rules`
5. `define-runner-wrapper-cycle-for-json-agent-loop`
6. `define-json-dashboard-render-surface`
7. `define-json-dashboard-input-writeback-flow`

### Why this order

- keeps the board ahead of execution without reopening broad product churn
- turns the JSON-loop idea into a real reusable packet while the main queue
  remains healthy

## Phase 3: Run Parallel Verification And Public Hygiene

### Follow-on picks

- replenish the queue from the just-finished backend or OSM subsystem if the
  ready count drops under the floor

### Why these are later

- useful and real, but not stronger than the app-slice continuity work
- they support system reuse without becoming the center lane

## Parallel Split Guidance

### If one person is working

Run Phase 1 first, then Phase 2.

### If two people are working

- person 1:
  - backend post-auth router definition
  - then backend post-auth follow-on definition
- person 2:
  - OSM canvas theme slice
  - then OSM post-canvas follow-on definition

### If three people are working

- person 1: backend post-auth router definition
- person 2: OSM canvas theme slice
- person 3: public trust-cleanup definition, then JSON-loop packet work

### If four people are working

- person 1: backend post-auth router definition
- person 2: OSM canvas theme slice
- person 3: public trust-cleanup definition
- person 4: JSON-loop packet lane

Static/public durability should only outrank stronger app lanes if those app
lanes are already absent, claimed, or concretely blocked.

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

- the current OSM slice is either implemented or honestly fenced
- the next backend and OSM follow-on slices are already queued
- the freeze boundary is operational, not just documented
- the ready board stays above the floor instead of collapsing after each burst
