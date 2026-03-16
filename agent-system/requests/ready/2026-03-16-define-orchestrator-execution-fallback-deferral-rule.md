Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Orchestrator Execution Fallback Deferral Rule

## Goal

Define when an orchestrator-heavy stack should defer execution fallbacks in favor
of queue repair.

## Focus

- pressure-based deferral
- refill-first thresholds
- execution resumption
- protected execution cases
- operator override

## Acceptance

- one execution-deferral packet is explicit
- orchestrator stacks get a cleaner refill-first rule
