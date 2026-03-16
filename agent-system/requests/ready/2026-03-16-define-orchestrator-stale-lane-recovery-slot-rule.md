Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Orchestrator Stale Lane Recovery Slot Rule

## Goal

Define when an orchestrator-heavy stack should reserve a slot for stale-lane
recovery work.

## Focus

- stale-lane rescue
- starvation prevention
- active-family exceptions
- execution tradeoff
- operator override

## Acceptance

- one stale-lane-recovery packet is explicit
- orchestrator stacks get a clearer rescue-slot rule
