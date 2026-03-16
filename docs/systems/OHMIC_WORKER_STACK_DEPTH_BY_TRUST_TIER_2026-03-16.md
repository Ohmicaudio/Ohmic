# Ohmic Worker Stack Depth By Trust Tier

Date: 2026-03-16
Project: ohmic

## Purpose

Define how routed stack depth should vary by trust tier so worker-local planning
matches proven reliability instead of assuming every worker can safely carry the
same amount of near-term work.

## Core Rule

Trust tier should shape stack depth before convenience does.

Higher-trust workers may carry a deeper local stack because they are more likely
to:

- preserve lane boundaries
- reconcile completion honestly
- choose safe fallbacks
- avoid broad freelancing

Lower-trust workers should carry less because overextension creates confusion
faster than it creates throughput.

## Recommended Depth By Trust Tier

### 1. Fresh Or Unproven

Recommended live stack:

- `1` primary
- `1-2` near-term follow-ons
- `1` low-risk fallback
- optional `1` verification or documentation fallback

Recommended depth:

- preferred: `3-4`
- max normal: `5-6`

Reason:

- fresh workers need bounded context
- short stacks make review and correction easier
- route training works better with narrower local planning

### 2. Guarded Trusted

Recommended live stack:

- `1` primary
- `2-3` near-term follow-ons
- `1-2` same-family fallbacks
- `1` maintenance or verification slot

Recommended depth:

- preferred: `5-6`
- max normal: `7`

Reason:

- this tier can handle a useful local runway
- it still benefits from tighter caps than a fully trusted worker

### 3. Trusted Performer

Recommended live stack:

- `1` primary
- `3` near-term follow-ons
- `2` same-family fallbacks
- `1` maintenance or verification slot

Recommended depth:

- preferred: `6-7`
- max normal: `8`

Reason:

- trusted workers should not starve after every completion
- deeper same-family carry becomes productive instead of risky

### 4. Trusted Hybrid Or Orchestrator

Recommended live stack:

- `1` primary
- `2-3` execution follow-ons
- `2` queue or refill fallbacks
- `1` maintenance or verification slot
- `1` queue-truth or documentation fallback

Recommended depth:

- preferred: `7-8`
- max normal: `9-10`

Reason:

- hybrids need enough stack to switch between execution and board repair
- this depth is only safe if trust is already proven

## Override Boundary

Trust-tier guidance may be tightened when:

- a worker enters a new project overlay
- the family is unusually risky
- verification is weak or unavailable
- recent reopen or correction rates rise

Trust-tier guidance may be loosened only when:

- correctness is consistently strong
- lane discipline is stable
- context handling stays clean
- operator overrides allow it

## Relationship To Role Family

Role family answers:

- what kinds of slots the worker needs

Trust tier answers:

- how deep those slots may safely go

The system should combine both:

- role family shapes the stack
- trust tier caps or expands that shape

## Warning Signs Of Overextension

Reduce trust-tier stack depth when:

- the worker skips claimed boundaries
- results need frequent reopen or correction
- queue status reconciliation gets sloppy
- fallback choice quality degrades
- summaries stop matching actual edits

## Non-Goal

This policy does not decide whether a worker is trusted.

It only says how stack depth should respond once a trust tier exists.

## Immediate Follow-On

This trust-tier model should feed:

1. trust-tier stack overextension guard rules
2. worker stack overflow spillback rules
3. worker stack reserve slot policy
4. fresh-agent restriction and escalation rules
