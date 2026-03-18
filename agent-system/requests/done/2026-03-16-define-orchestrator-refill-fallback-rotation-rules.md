Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Orchestrator Refill Fallback Rotation Rules

## Goal

Define how orchestrator-heavy stacks should rotate refill and rescue fallbacks
without starving execution entirely.

## Focus

- refill slot rotation
- rescue freshness
- execution interruption
- low-value refill eviction
- stable-state return

## Acceptance

- one refill-rotation packet is explicit
- queue-repair fallbacks stay fresh instead of fossilizing
Claim ID: 20260316T102420Z-587ce279

## Result

Defined how orchestrator-heavy stacks rotate refill fallbacks so rescue capacity stays fresh.
