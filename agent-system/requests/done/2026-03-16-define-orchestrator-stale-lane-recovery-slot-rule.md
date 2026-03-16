Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
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
Claim ID: 20260316T103411Z-13ddc46f

## Result

Defined when orchestrator-heavy stacks may carry one stale-lane recovery slot.
