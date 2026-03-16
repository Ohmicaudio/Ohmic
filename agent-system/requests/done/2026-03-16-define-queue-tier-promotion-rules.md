Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094732Z-9a684b93

# Define Queue Tier Promotion Rules

## Goal

Define how tasks move from warm queued or cold backlog into the hot ready tier.

## Focus

- promotion criteria
- priority family effects
- active-worker pressure
- staleness promotion
- burst promotion

## Acceptance

- one promotion-rule packet is explicit
- hot-ready growth becomes predictable

## Result

Done. Queue tier promotion rules now live in
`docs/systems/OHMIC_QUEUE_TIER_PROMOTION_RULES_2026-03-16.md`, defining
promotion sources, criteria, bounded promotion limits, and audit requirements.
