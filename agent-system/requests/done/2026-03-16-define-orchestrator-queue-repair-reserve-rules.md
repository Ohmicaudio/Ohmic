Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Orchestrator Queue Repair Reserve Rules

## Goal

Define how many queue-repair or refill-rescue slots an orchestrator-heavy stack
should reserve.

## Focus

- refill reserve minimum
- starvation rescue slots
- execution tradeoff
- active-family exceptions
- operator override

## Acceptance

- one queue-repair-reserve packet is explicit
- orchestrator-heavy stacks keep enough refill elasticity
Claim ID: 20260316T102420Z-587ce279

## Result

Defined the queue-repair reserve rules so orchestrator-heavy stacks keep refill elasticity without becoming repair-only.
