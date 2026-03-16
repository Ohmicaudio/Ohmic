# Ohmic Agent Trust Tier Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define explicit trust tiers for agents and model routes so fresh agents are not
treated as fully trusted before they earn it through repeated live work.

## Core Rule

Trust is an operating permission model.

It is not a personality label, and it is not permanent.

The tier controls:

- what work can be taken by default
- what must escalate
- what level of ambiguity is acceptable
- what public or architectural surfaces are safe

## Recommended Tiers

### 1. `fresh`

Profile:

- new worker or route
- low sample size
- limited evidence of stable correctness

Default permissions:

- bounded docs
- bounded contract updates
- low-collision verification
- narrow queue-truth fixes

Default restrictions:

- no broad churn
- no independent public-trust changes
- no independent architecture shifts
- early escalation on ambiguity

### 2. `route_learning`

Profile:

- worker or model route is actively being evaluated in live traffic
- some evidence exists, but route behavior is still under observation

Default permissions:

- repeated bounded work in one or two families
- moderate implementation under tighter review
- explicit training packets

Default restrictions:

- no unsupervised high-trust public surfaces
- no wide multi-domain packets by default
- high-value ambiguity should still escalate

### 3. `trusted_performer`

Profile:

- repeated acceptable or strong outcomes
- low reopen rate
- good verification discipline

Default permissions:

- medium to broad bounded packets
- ambiguous but non-architectural work
- multi-file reconciliations
- higher-autonomy execution in known domains

Default restrictions:

- architectural boundary changes still need stronger trust or explicit operator
  direction
- highest-risk public trust lanes may still escalate

### 4. `trusted_orchestrator`

Profile:

- sustained high-quality performance across varied lanes
- strong context retention
- low chaos and low avoidable escalation

Default permissions:

- cross-cutting planning
- architecture-affecting direction within approved scope
- orchestration of broader objective slices
- guidance and fallback decisions for lower tiers

Default restrictions:

- still bound by explicit operator overrides
- still should not bypass audit or trust rules silently

## Trust Tier Dimensions

A tier should reflect more than raw completion count.

Important inputs:

- correctness distribution
- reopen and rework rate
- verification discipline
- scope adherence
- context retention
- escalation judgment
- operator override frequency

## Agent Versus Model Route

The same trust-tier model can apply to:

- human-facing worker identities
- model routes or route families

But the tier should be recorded separately for each.

Examples:

- worker `d` may be `trusted_orchestrator`
- model route `gemini-docs-eval` may still be `route_learning`

This prevents a strong operator or worker identity from laundering trust into a
new or weak model path.

## Permission Matrix

Suggested default matrix:

- `fresh`
  - narrow docs/support/verification only
- `route_learning`
  - bounded training packets and moderate repeated lanes
- `trusted_performer`
  - broader execution and moderate ambiguity
- `trusted_orchestrator`
  - cross-lane orchestration and architecture-adjacent routing

## Escalation Interaction

Lower tiers should escalate sooner.

Recommended defaults:

- `fresh`
  - escalate on public-trust, architecture, broad churn, or weak verification
- `route_learning`
  - escalate on cross-domain ambiguity or high-impact public changes
- `trusted_performer`
  - escalate on core architecture or system-wide coordination shifts
- `trusted_orchestrator`
  - escalate when operator intent or system policy is unclear

## Demotion Or Hold

Trust should be able to pause or move backward.

Triggers:

- rising reopen rate
- weak verification habit
- frequent scope drift
- repeated queue/claim hygiene failures
- repeated operator correction on supposedly autonomous work

Demotion is a safety control, not a moral judgment.

## Minimal Record Shape

Suggested object:

- `subject_kind`
  - `worker`
  - `model_route`
- `subject_id`
- `current_tier`
- `evidence_window`
- `promotion_candidate`
- `hold_reason`
- `last_reviewed_at`

## Example Shape

```json
{
  "subject_kind": "model_route",
  "subject_id": "gemini-docs-eval",
  "current_tier": "route_learning",
  "evidence_window": "last_20_tasks",
  "promotion_candidate": "trusted_performer",
  "hold_reason": "",
  "last_reviewed_at": "2026-03-16T03:08:00Z"
}
```

## Relationship To Other Rules

This tier model should govern:

- fresh-agent restrictions
- graduation checkpoints
- worker priority and fallback decisions
- worker registry fields

It is the shared permission vocabulary for those systems.

## Immediate Follow-On

This tier model should feed:

1. worker registry schema
2. Gemini evaluation packets
3. later route assignment automation
