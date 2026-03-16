# Ohmic Hot Vs Warm Queue Tier Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define the explicit state model that separates immediately claimable work from
near-term reserve work without losing queue truth or letting packet families
fall out of view.

## Core Rule

`ready` is not the whole queue.

The shared system should treat queue state as three related layers:

- `hot_ready`
- `warm_queued`
- `cold_queueable`

Each layer is truthful. They differ by promotion urgency, claimability, and
operator visibility.

## Tier Definitions

### 1. Hot Ready

Hot-ready tasks are immediately claimable.

Required properties:

- fully packeted
- not blocked
- bounded enough for one worker to start now
- visible in shared ready accounting

Examples:

- active implementation slices
- current verification packets
- next same-family follow-ons already needed this session

### 2. Warm Queued

Warm-queued tasks are near-term reserve packets.

Required properties:

- already identified and mostly packeted
- not currently blocked by missing design or missing truth
- held outside the hot lane until pressure or promotion rules fire

Examples:

- second-wave tasks for an active family
- follow-on cleanup packets already known to be next
- grouped packets prepared for burst promotion

### 3. Cold Queueable

Cold-queueable work is known future work that is not yet meant for immediate
promotion.

Required properties:

- coherent enough to preserve intent
- easy to promote into warm or hot tiers later
- allowed to stay grouped as parent packets or reserved stacks

Examples:

- parent packets waiting to split
- later wave documentation or modeling
- future cleanup slices that are real but not near-term

## Reporting Boundary

The shared board should report the tiers separately.

Minimum meaning:

- `ready/` = hot-ready surface
- warm reserve can live in grouped planning packets, reserve docs, or generated
  queue state until promoted
- cold queueable can stay in parent packets, stacks, or future-wave registry
  items

The system should never pretend that "not in ready" means "not known."

## Interaction With Other States

Blocked work is not hot or warm.

Rules:

- `blocked` items sit outside the tier ladder until unblocked
- `done` items leave the ladder entirely
- `active` claims consume hot-ready items
- promotion and demotion move only between hot, warm, and cold queueable

## Required Transition Rules

Minimum valid movements:

- `cold_queueable -> warm_queued`
- `warm_queued -> hot_ready`
- `hot_ready -> warm_queued`
- `warm_queued -> cold_queueable`

Invalid shortcuts:

- `blocked -> hot_ready` without explicit unblock
- `done -> warm_queued` without a new request or reopen event

## Truth Preservation Rule

One task should not appear as two separate live tasks just because it moved
tier.

Tier changes should preserve:

- stable task id
- original packet family
- promotion or demotion auditability

## Operator View Rule

Operators should see:

- the hot-ready count directly
- the warm reserve count directly
- family pressure indicators when a family is down to one hot-ready packet

Operators do not need the full cold queue on every board view, but the system
does need to track it.

## First Safe Implementation

The first implementation only needs:

- explicit tier names
- valid transition boundaries
- separate reporting for hot and warm counts
- preserved truth between tiers

That is enough to stop treating `ready` as the entire queue.
