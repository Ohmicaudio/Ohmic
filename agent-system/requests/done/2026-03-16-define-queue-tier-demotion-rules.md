Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094732Z-9a684b93

# Define Queue Tier Demotion Rules

## Goal

Define when hot-ready tasks should be demoted back to warm queued instead of
lingering forever.

## Focus

- stale ready tasks
- obsolete packet demotion
- family rebalance
- blocked-near-ready cases
- auditability

## Acceptance

- one demotion-rule packet is explicit
- hot-ready stays fresh instead of bloated with stale items

## Result

Done. Queue tier demotion rules now live in
`docs/systems/OHMIC_QUEUE_TIER_DEMOTION_RULES_2026-03-16.md`, defining stale
and overrepresented-family demotion conditions, warm-first destinations, and
explicit obsolete-versus-demoted handling.
