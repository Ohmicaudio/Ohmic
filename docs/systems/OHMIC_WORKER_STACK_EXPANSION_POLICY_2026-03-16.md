# Ohmic Worker Stack Expansion Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define when workers should carry deeper routed stacks and when they should stay
shallow, so stacked work remains a deliberate policy choice instead of a habit.

## Core Rule

Stack depth is a trust and pressure decision.

Deeper stacks are justified when they increase continuity without increasing
unforced error or starving the shared board.

## Base Guidance

Recommended starting ranges:

- fresh worker: `4-5`
- standard trusted worker: `6`
- proven trusted worker under active pressure: `7-8`
- normal hard ceiling: `10`

The system should treat anything beyond normal ceiling as exceptional and
temporary.

## Expansion Preconditions

Only expand a worker stack when all are true:

- the worker is not currently degraded or rework-heavy
- same-family reserve is still healthy after assignment
- verification or review slots are still preserved elsewhere
- the queue still meets the global hot-ready floor

If any of these are false, the stack should stay shallow.

## Trust Tier Rule

Suggested default by trust tier:

- fresh: no automatic expansion
- developing: expansion only when family reserve is strong
- trusted: normal expansion allowed
- high-trust: deeper expansion allowed during bursts or high-throughput lanes

Trust should influence expansion, not replace queue safety checks.

## Pressure Rule

Expansion is more justified when:

- one lane is moving quickly
- context carryover matters
- refill is healthy enough to support continued motion

Expansion is less justified when:

- the queue is near starvation
- many families are active at once
- verification backlog is rising

## Verification Slot Rule

At least one meaningful verification or correction slot should remain outside
the deepest forward stack.

This prevents a worker from carrying only production-forward tasks with no room
to absorb review or fix work.

## Reserve Protection Rule

No stack expansion should consume the last same-family hot or warm reserve
packet unless a refill burst is already queued.

The system should not deepen one worker stack by collapsing the whole family.

## First Safe Implementation

The first implementation only needs:

- trust-tier-dependent default ranges
- expansion preconditions
- verification slot protection
- reserve protection
- hard ceiling guidance

That is enough to make deeper stacks intentional and auditable.
