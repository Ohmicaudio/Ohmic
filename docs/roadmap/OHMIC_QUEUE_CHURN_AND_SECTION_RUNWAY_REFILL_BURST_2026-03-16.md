Status: active_handoff_board
Date: 2026-03-16
Project: ohmic

# Ohmic Queue Churn And Section Runway Refill Burst

## Purpose

Refill the queue around worker-facing churn reports and section-runway policy so
the system can explain drain, refill, and successor pressure without collapsing
back to a tiny board.

## Focus

### 1. Worker Churn Visibility

- closeout refill notice payload
- stale-ready intent reasons
- system claim origin types
- worker-facing churn summary row

### 2. Section Runway Visibility

- section-wave intent flag shape
- successor pressure warning
- parallel section family availability report
- runway shortfall audit event family
- family drain prediction signal

## Outcome Standard

If this burst lands, the queue regains runway in the exact family that explains
why underfoot churn is happening.
