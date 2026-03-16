Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Orchestrator Rescue Slot Protection Rules

## Goal

Define when rescue/refill slots in an orchestrator-heavy stack should be
protected from eviction or spillback.

## Focus

- rescue-slot protection
- starvation pressure
- execution override
- operator pinning
- stale rescue release

## Acceptance

- one rescue-slot-protection packet is explicit
- orchestrator rescue capacity gets a clear protection boundary
Claim ID: 20260316T103411Z-13ddc46f

## Result

Defined the protection rules that keep orchestrator rescue slots alive under pressure.
