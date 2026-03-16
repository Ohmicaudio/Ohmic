# Ohmic Administrator Vs Orchestrator Stack Variance Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define the specific stack-shape differences between administrator-heavy and
orchestrator-heavy workers so the system can distinguish two similar hybrids
without pretending they are the same operating mode.

## Core Rule

Administrators and orchestrators both touch policy, routing, and queue truth,
but they do not carry the same local stack emphasis.

The difference is not whether they can both do coordination.

The difference is what kind of coordination their local stack should prefer.

## Administrator-Heavy Stack Bias

Administrator-heavy workers should prefer:

- adjacent policy clustering
- filing and routing continuity
- note/tag/annotation adjacency
- intake-state follow-ons
- projection or shell-seam fallback over broad queue-repair loops

Recommended bias:

- `1` primary admin packet
- `2-3` adjacent policy or routing follow-ons
- `1` filing, queue-truth, or annotation fallback
- `1` projection or shell-seam fallback

Reason:

- administrators benefit from keeping one operational desk thread coherent
- too much queue-repair spread can dilute intake/admin continuity

## Orchestrator-Heavy Stack Bias

Orchestrator-heavy workers should prefer:

- queue-repair fallback slots
- refill and board-shaping continuity
- family reserve packaging
- stale-lane recovery
- execution fallback only after queue truth is stabilized

Recommended bias:

- `1` primary execution or queue-repair packet
- `2` near-term execution or policy follow-ons
- `2` queue-refill or board-shaping fallbacks
- `1` maintenance, verification, or documentation fallback

Reason:

- orchestrators need enough local reserve to stop the board from starving
- they should be able to pivot between execution and refill without going empty

## Documentation Fallback Difference

Administrator-heavy workers:

- may keep documentation that is tightly coupled to the active admin family
- should avoid broad generic doc clutter

Orchestrator-heavy workers:

- may keep one low-risk documentation fallback that preserves queue truth
- should not let documentation fallbacks crowd out refill or rescue slots

## Overload Trim Difference

When stacks are overloaded:

- administrator-heavy workers should trim the most distant policy branch first
- orchestrator-heavy workers should trim low-priority documentation or extra
  execution follow-ons before refill reserve

This keeps each role aligned to its real operating need.

## Spillback Difference

Administrator-heavy workers should spill back:

1. distant cross-family policy packet
2. duplicate annotation or filing fallback
3. extra projection fallback

Orchestrator-heavy workers should spill back:

1. low-priority execution follow-on
2. extra same-family reserve beyond policy
3. documentation fallback that is not preserving queue truth

## Repair Vs Continuity Balance

Administrator-heavy workers optimize for:

- continuity of one admin family

Orchestrator-heavy workers optimize for:

- continuity of the board itself

That means:

- administrator-heavy stacks should cluster more tightly
- orchestrator-heavy stacks should keep more rescue/refill elasticity

## Non-Goal

This policy does not say one worker can never act like the other.

It says the routed stack should reveal which operating mode is dominant right
now.

## Immediate Follow-On

This variance model should feed:

1. administrator adjacent policy cluster rules
2. orchestrator queue-repair reserve rules
3. hybrid documentation fallback boundary
4. admin-vs-orchestrator stack audit diff model
