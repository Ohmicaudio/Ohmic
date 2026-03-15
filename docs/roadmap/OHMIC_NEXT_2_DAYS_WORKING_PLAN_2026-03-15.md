scope: system
status: working_plan_for_approval
updated: 2026-03-15
horizon: 2_days

# Ohmic Next 2 Days Working Plan

## Objective

Use the next 48 hours to convert the current planning/documentation burn-down
into concrete completion movement inside the remaining unfinished code lanes.

## Current Reality

- the shared queue was largely burned down into durable docs and done records
- `ohmic-audio-labs` is still the biggest unfinished codebase by far
- the loudspeaker parser lane still leaves generated output drift behind
- the next useful work is no longer “figure out the system”
- the next useful work is targeted subsystem completion

## Priority Rule

Software completion stays first.

Interpretation:

- active code and subsystem triage in `ohmic-audio-labs`
- durable verification of the static/content lane
- closure of the loudspeaker generated-output lane

all outrank:

- new feature ideation
- new hardware design detail
- broad marketing or business expansion

## Estimation Rule

Use completion-time estimates based on current actual throughput, not old
chaotic assumptions.

Current rule of thumb:

- a doc-only or queue-only lane can collapse in one focused session
- a planning packet plus queue follow-through is usually hours, not days
- a true 2-day task should involve either:
  - real code implementation across a non-trivial surface
  - multi-repo coordination with verification
  - or a subsystem triage large enough that it cannot honestly close in one
    sitting

Do not label something as “2 days” just because it sounds important.

If a task is likely to collapse inside one strong work block, stage it as a
single pickup slice instead of pretending it needs a full multi-day runway.

## Day 1

### 1. Close the loudspeaker generated-output lane

Why:

- there is still live drift in `generated/loudspeaker/sample-normalized-loudspeaker-packet-2026-03-15.json`
- until that lane is closed cleanly, the data side is still half-open

Deliverable:

- one explicit request result for the generated sample packet lane
- either durable generated output or explicit disposition on why it should not
  be committed

### 2. Split `ohmic-audio-labs` into the next real subsystem inventories

Why:

- the repo is still too large to clean as one thing
- the next completion wins will come from subsystem-level inventories

Target subsystem inventories:

- `products/ohmic-osm`
- `components/Hardware` plus `services/hardware`
- `services/backend`

Deliverable:

- one inventory note per subsystem
- one explicit recommendation on whether each is safe to commit, freeze, or
  split further

### 3. Verify static-content remote durability

Why:

- static-content should stay calm, not quietly diverge

Deliverable:

- confirm whether `ohmic-audio-static-content` is fully durable remotely
- if not, queue or execute the minimal push/follow-through

## Day 2

### 4. Turn one subsystem inventory into the next safe commit plan

Why:

- inventories alone do not complete work

Preferred order:

1. `services/backend`
2. `components/Hardware` + `services/hardware`
3. `products/ohmic-osm`

Deliverable:

- one follow-on split map for the best next subsystem

### 5. Keep the queue and memory surfaces clean

Why:

- concurrent agents are still moving tasks underfoot
- queue truth is still a real operational concern

Deliverable:

- queue remains accurate
- memory stays limited to survival truths

### 6. Leave hardware and CYD in warm-lane state

Why:

- both are now in decent planning/stability shape
- they should not reclaim center-lane time unless a blocker appears

## Agent Handoff Start Order

Start with these tasks first:

1. resolve generated loudspeaker packet lane
2. inventory `products/ohmic-osm` dirty subsystem
3. inventory hardware/control subsystem
4. inventory backend subsystem
5. verify static-content remote durability

Expectation:

- items 1 through 3 may collapse inside one session each if they stay scoped
- this 2-day plan is a ceiling, not a promise that all tasks are large

## Exit State

If this 2-day plan succeeds, Ohmic should end the window with:

- the loudspeaker generated lane closed cleanly
- three major `ohmic-audio-labs` subsystems explicitly triaged
- one next subsystem chosen for commit-slice execution
- the static-content repo confirmed durable or explicitly queued for push
- the shared queue still truthful
