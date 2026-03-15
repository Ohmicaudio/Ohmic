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

- `define-next-backend-control-plane-safe-slice`
- `define-next-osm-canvas-disposition-and-noise-fence`
- `enforce-public-and-archive-freeze-boundary-in-handoff-and-queue-surfaces`
- `strip-remaining-raw-source-footers-from-public-pages`

### Success condition

- the backend lane has a clean next slice
- the next OSM boundary is tighter
- the freeze rule is visible where agents actually look
- the public footer-cleanup lane is either finished or clearly bounded

## Phase 2: Promote The Next Safe Subsystem Slices

### First picks

1. `run-static-boundary-and-host-smoke-floor`
2. `define-live-agent-state-json-contract`
3. `define-agent-inbox-outbox-event-model`
4. `define-orchestrator-lock-and-worker-heartbeat-model`
5. `define-stable-idle-stop-and-crash-recovery-rules`
6. `define-runner-wrapper-cycle-for-json-agent-loop`

### Why this order

- keeps the board ahead of execution without reopening broad product churn
- turns the JSON-loop idea into a real reusable packet while the main queue
  remains healthy

## Phase 3: Run Parallel Verification And Public Hygiene

### Follow-on picks

7. `verify-public-cleanup-wave-after-current-claims`

### Why these are later

- useful and real, but not stronger than the app-slice continuity work
- they support trust and public cleanliness without becoming the center lane

## Parallel Split Guidance

### If one person is working

Run Phase 1 first, then Phase 2.

### If two people are working

- person 1:
  - backend next-slice definition
  - then OSM canvas/noise fence
- person 2:
  - public freeze-boundary enforcement
  - then public footer cleanup

### If three people are working

- person 1: backend next-slice definition
- person 2: OSM boundary definition
- person 3: public freeze-boundary enforcement, then footer cleanup

### If four people are working

- person 1: backend next-slice definition
- person 2: OSM boundary definition
- person 3: public freeze-boundary enforcement
- person 4: public cleanup / static smoke lane

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

- the next backend and OSM slices are already queued
- the freeze boundary is operational, not just documented
- the current public cleanup lane is either finished or explicitly fenced
- the ready board stays above the floor instead of collapsing after each burst
