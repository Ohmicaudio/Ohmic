Status: active_handoff_board
Date: 2026-03-16
Project: ohmic

# Ohmic Worker Stack Governance Refill Burst

## Purpose

Refill the queue with governance-level worker-stack follow-ons so the stack
policy family does not starve as soon as the next few packets close.

## Focus

### 1. Slot Governance

- reserve slot priority
- maintenance slot eviction
- verification slot eviction

### 2. Family Balance

- cross-family cap rules
- fallback selection order
- local reconciliation checklist

### 3. Overflow Recovery

- overflow recovery loop
- post-spillback stabilization

## Outcome Standard

If this burst lands, the worker-stack family will have enough follow-on depth to
support another execution cycle without immediately collapsing.
