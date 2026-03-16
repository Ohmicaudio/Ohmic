Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
