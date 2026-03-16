# Ohmic Worker Stack Overflow Spillback Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define what the system should do when a worker's routed stack exceeds its
preferred or allowed depth so overflow becomes bounded, reversible, and auditable.

## Core Rule

Overflow should not silently accumulate.

When a worker stack grows beyond its safe depth, excess items should be pushed
back toward global queue truth instead of lingering as hidden local clutter.

## Spillback Triggers

Spillback should be considered when any of these are true:

- stack depth exceeds preferred depth and pressure persists
- stack depth exceeds hard max
- several fallback items are stale or superseded
- queue refill inserted more local items than the worker can safely carry
- trust-tier or role-family caps tighten after review

## Spillback Order

Preferred spillback order:

1. stale or superseded local items
2. lowest-priority cross-family fallback
3. extra same-family reserve beyond policy
4. maintenance or documentation fallback that no longer fits

Items should not be removed in arbitrary order.

## Protection Rules

The system should protect:

- current primary task
- in-progress verification slot
- required maintenance slot if it is the only safe fallback
- operator-pinned local item

Protected items should not be spilled back unless an operator override says so.

## Spillback Destination

Spillback returns the item to queue truth, not to oblivion.

Default behavior:

- retain the task in the canonical queue
- clear it from the worker-local active stack
- preserve status truth
- emit spillback audit events

If the task was only a local routing choice, it should remain `ready` or
`queued` according to canonical queue rules.

## Soft Vs Hard Overflow

### Soft Overflow

Behavior:

- worker may carry the excess briefly
- queue or operator may allow temporary overage
- spillback should happen at the next safe transition

### Hard Overflow

Behavior:

- excess should be trimmed or spilled back immediately
- no new local additions should occur until depth is back in range
- audit should mark the overflow explicitly

## Trust And Role Effects

- lower-trust workers should spill back earlier
- reviewer/verifier stacks should hit hard overflow sooner
- trusted orchestrator-performer hybrids may tolerate slightly more temporary
  overage if queue repair is underway

Overflow policy should respect both:

- trust-tier caps
- role-family shape

## Safe Spillback Behavior

Spillback should:

- preserve canonical task existence
- preserve queue status truth
- avoid hidden task loss
- avoid dumping the primary task
- leave a reviewable audit trail

## Non-Goal

Spillback is not abandonment.

It is a routing correction that returns excess local planning back to a shared,
visible source of truth.

## Immediate Follow-On

This spillback model should feed:

1. worker stack spillback priority order
2. worker stack overflow audit event family
3. trust-tier stack overextension guard rules
4. worker stack reserve slot policy
