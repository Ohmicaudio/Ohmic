Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
