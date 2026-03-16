# Ohmic Queue Headroom Card Priority Order

Date: 2026-03-16
Project: ohmic

## Purpose

Define the default card order for the queue-health dashboard slice.

## Priority Order

1. `queue_headroom`
2. `family_pressure`
3. `refill_urgency`
4. `queue_reconciliation`

## Rule

The dashboard should show global usable capacity first, then the currently
pressured family story, then refill pressure, and only then the reconciliation
diagnostics.

This keeps the cards ordered by operator urgency instead of raw implementation
details.
