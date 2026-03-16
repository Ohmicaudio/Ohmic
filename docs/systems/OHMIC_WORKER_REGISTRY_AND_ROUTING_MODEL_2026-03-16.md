# Ohmic Worker Registry And Routing Model

Date: 2026-03-16
Status: working design

## Purpose

Define how workers should be named, registered, budgeted, routed, and stacked so
the system can support:

- multiple workers on the same larger objective
- worker-specific naming and trust
- per-worker queue depth and fallback order
- per-worker context and token budgets
- global queue truth without losing worker-local routing

## Core Rule

The system should distinguish between:

- the global work queue
- the worker registry
- the live per-worker task stack

Those are related, but they are not the same object.

## Worker Identity Model

Each worker should have a stable registry record.

Minimum fields:

- worker id
- display name
- short handle
- worker class
- provider
- model identity
- trust tier
- role family
- project overlay bindings
- capabilities
- restricted surfaces
- fallback worker ids
- status

### Naming Rule

Use three names:

1. stable `worker_id`
2. human-facing `display_name`
3. optional project-local alias from overlay/config

Do not let project-specific nicknames replace the stable worker id.

## Worker Classes

Recommended worker classes:

- administrator
- orchestrator
- performer
- reviewer
- verifier
- hybrid

This lets one model run in different operating roles without pretending every
worker behaves the same.

## Project Overlay Binding

Project-specific logic should not live in the worker core record.

Instead:

- global registry stores stable worker truth
- project overlays map workers to project roles, lane preference, naming, and
  destination rules

Examples:

- one worker is the preferred `ohmic-audio-labs` browser-shell performer
- one worker is allowed only on static-content trust cleanup
- one worker is route-trained for queue shaping but not public content

## Global Queue vs Worker Stack

### Global Queue

Owns:

- canonical ready tasks
- blocked tasks
- done tasks
- project-level truth

### Worker Stack

Owns:

- what a specific worker should do next
- ordered priority for that worker
- fallback tasks if the primary task blocks
- local budget pressure

The global queue is the source of truth.

The worker stack is a routing view.

## Per-Worker Task Stack

Each worker should have a bounded stack, not an infinite dump.

Recommended stack shape:

- 1 primary task
- 3 near-term follow-ons
- 2 same-family fallbacks
- 1 maintenance or verification task
- 1 low-risk documentation or queue-truth fallback

That makes a normal live stack depth of `5-8` items.

Do not give fresh workers giant context blobs they cannot hold in context.
Do give trusted workers a deeper routed stack so they do not starve every time
one task closes.

## Same-Task Multi-Worker Rule

Multiple workers may work the same larger initiative, but not the same exact
claimed file scope without explicit coordination.

Use this split:

- objective family: shared larger initiative
- worker slice: worker-specific task packet
- file claim: exact active edit boundary

Examples:

- two workers can both support the `master administrator` initiative
- one defines intake envelope while another defines overlay rules
- they may not both edit the same packet file without a shared plan and claim

## Fan-Out Rule

When one larger objective needs several workers, split it into:

- one parent objective or packet
- several worker-addressable child tasks
- explicit completion criteria per child

This prevents “same task” from meaning hidden duplicate effort.

## Priority Model

Each worker should carry:

- default priority class
- preferred task families
- fallback priority order
- escalation thresholds

Recommended priority classes:

- mission-critical
- software-primary
- support-parallel
- maintenance
- speculative

## Fallback Rule

Each worker should have explicit fallback order:

1. primary lane
2. same-family fallback
3. verification/cleanup fallback
4. queue-refill or documentation fallback

Do not let workers idle just because the first task blocks.

## Escalation Rule

Escalate instead of grinding when:

- task scope collides with another active claim
- required verification cannot be run
- context required exceeds worker budget
- project overlay rules conflict
- trust tier is too low for the requested surface

## User Intervention Rule

User intervention should be first-class, not an afterthought.

The system should support operator ability to:

- pause a worker
- redirect a worker
- override normal routing
- approve or reject a result
- lower or raise audit depth for a task family
- force escalation to review
- mark a result as accepted despite a non-critical warning

This intervention should be auditable, but it should not require a full system
rewrite every time the operator wants to steer.

## User Override Boundary

Workers can propose.

The user or operator can:

- set priority
- reorder work
- change worker assignment
- force fallback
- reopen completed work
- freeze a lane
- declare a task good enough for now

The system should record these as explicit state-changing events.

## Audit Granularity Rule

Default behavior should capture:

- state-changing events
- routing and reassignment events
- claim lifecycle events
- verification and acceptance events
- escalation and override events
- summarized context and token usage per task

Deeper raw interaction logs should be tunable by worker, task family, and
failure mode.

## Quota And Budget Model

Each worker should have explicit operational budgets.

Minimum tracked values:

- max concurrent active claims
- preferred stack depth
- max stack depth
- target context tokens
- hard context ceiling
- reserved completion tokens
- target input token budget per task
- rolling token usage
- verification budget expectation

### Recommended Defaults

For a normal performer:

- active claims: `1`
- preferred stack depth: `6`
- max stack depth: `8`

For an orchestrator-performer hybrid:

- active claims: `1`
- preferred stack depth: `7`
- max stack depth: `10`

For a fresh or low-trust worker:

- active claims: `1`
- preferred stack depth: `4`
- max stack depth: `6`

## Queue Headroom Rule

The worker stack should assume the global queue stays ahead by more than a bare
survival margin.

Recommended global posture:

- hot ready floor per active project: `20` real tasks minimum
- hot ready target per active project: `28-32`
- cold queueable backlog target per active project: `50+` packetizable actions

This lets workers close several related tasks without instantly collapsing the
board.
- target context usage: `40-60%` of available window
- hard context ceiling: `80%`
- reserve completion tokens: enough for verification and notes

For a fresh worker:

- active claims: `1`
- preferred stack depth: `2-3`
- lower context ceiling
- smaller task packet size

For an orchestrator:

- fewer edit claims
- larger queue/context review budget
- stronger reporting and refill expectations

## Context-Length Rule

Expected context length should be planned, not discovered by overflow.

Each worker/task match should estimate:

- input context needed
- likely retrieved references
- expected command/test output volume
- expected response/output size

If estimated usage does not fit the target budget, split the task before
assignment.

## Token-Usage Rule

Token usage should be measured at two levels:

- per task
- per worker over time

Useful metrics:

- average prompt/input volume
- average completion volume
- total usage by task family
- correction/rework cost
- token-to-correctness efficiency

This matters because the cheapest-looking worker may be wasteful after rework.

## Restriction Rule

Fresh or low-trust workers should not be given:

- large mixed-surface packets
- broad queue reshaping
- unbounded same-task multi-worker overlap
- token-heavy synthesis without guardrails

They should earn higher budgets through route-trained passes.

## Reporting Relationship

This model should plug into:

- agent trust tiers
- sanity/error hooks
- correctness reports
- queue runtime summaries
- per-agent and per-model performance surfaces
- user intervention and override audit events

## Immediate Next Tasks

1. define worker registry schema
2. define per-worker task stack model
3. define worker priority fallback and escalation rules
4. define global vs worker queue boundary
5. later: define worker context and token budget policy
6. later: define multi-worker shared-task fan-out rules
7. later: define user intervention and override rules
