# Ohmic Worker Stack Depth By Role Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define how routed stack depth should vary by worker role family so the system
stops treating every worker like it should carry the same local queue shape.

## Core Rule

Stack depth should follow worker behavior.

Different role families need different amounts of:

- near-term follow-ons
- same-family reserve
- maintenance slots
- verification slots
- queue-truth fallback

## Recommended Depth By Role Family

### 1. Performer

Recommended live stack:

- `1` primary
- `3` near-term follow-ons
- `1-2` same-family fallbacks
- `1` maintenance or verification slot

Recommended depth:

- preferred: `5-7`
- max normal: `8`

Reason:

- performers burn through execution packets quickly
- they need same-family runway without carrying an overloaded local stack

### 2. Orchestrator-Performer Hybrid

Recommended live stack:

- `1` primary
- `2-3` near-term execution tasks
- `2` queue-refill or board-shaping fallbacks
- `1` maintenance or verification slot
- `1` low-risk documentation fallback

Recommended depth:

- preferred: `6-8`
- max normal: `9-10`

Reason:

- hybrids need a little more board-repair headroom than pure performers
- they still should not carry an infinite planning blob

### 3. Administrator

Recommended live stack:

- `1` primary intake/admin packet
- `2-3` adjacent policy or routing follow-ons
- `1-2` queue-truth or filing fallbacks
- `1` projection or shell-seam fallback

Recommended depth:

- preferred: `5-7`
- max normal: `8`

Reason:

- administrators often work families of related packets
- they benefit from clustered policy surfaces more than deep mixed stacks

### 4. Reviewer

Recommended live stack:

- `1` primary review
- `1-2` adjacent reviews in the same family
- `1` verification fallback
- `1` reporting fallback

Recommended depth:

- preferred: `4-5`
- max normal: `6`

Reason:

- reviewers need a narrow, high-attention stack
- too much stack depth harms review quality

### 5. Verifier

Recommended live stack:

- `1` primary verification target
- `1-2` same-wave verification follow-ons
- `1` reporting or correctness packet

Recommended depth:

- preferred: `3-5`
- max normal: `6`

Reason:

- verifier work depends on honest result handling
- short stacks reduce blur between verification surfaces

### 6. Hybrid Specialist

Recommended live stack:

- role-dependent primary
- `2-3` same-family follow-ons
- `1` maintenance slot
- `1` queue-truth or documentation fallback

Recommended depth:

- preferred: `5-7`
- max normal: `8`

Reason:

- specialists should inherit stack shape from their dominant operating mode
- they may flex deeper only when trust and context budget allow it

## Reserve Slot Guidance

Role-family reserve emphasis:

- performer: same-family reserve matters most
- orchestrator-performer: queue-refill reserve matters most
- administrator: adjacent-policy reserve matters most
- reviewer/verifier: reserve should stay minimal and focused

## Escalation Boundary

Reduce or trim stack depth when:

- claim conflicts keep firing
- verification is unavailable
- context pressure rises above budget
- reopen/rework rate suggests overload
- the worker is drifting between unrelated families

## Non-Goal

This policy does not replace trust-tier limits.

It only says role family should influence depth before one-size-fits-all stack
rules kick in.

## Immediate Follow-On

This role-family model should feed:

1. administrator vs orchestrator stack variance rules
2. worker stack reserve slot policy
3. worker stack overflow spillback rules
4. worker stack depth by trust tier
