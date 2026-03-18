Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Worker Stack Maintenance Slot Behavior

## Goal

Define what the maintenance slot in a worker stack is allowed to hold and when
it should rotate out.

## Focus

- maintenance slot scope
- queue-truth fallback
- cleanup eligibility
- rotation triggers
- starvation protection

## Acceptance

- one maintenance-slot packet is explicit
- maintenance fallbacks become deliberate instead of vague
Claim ID: 20260316T101814Z-dc6366f5

## Result

Defined what the maintenance slot may and may not do inside a worker stack.
