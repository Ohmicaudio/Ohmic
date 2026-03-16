Status: active_handoff_board
Date: 2026-03-16
Project: ohmic

# Ohmic Master Administrator Queue Floor Recovery

## Purpose

Recover the administrator ready queue back above floor after a heavy completion
wave consumed most of the second-rung tasks faster than expected.

## Current Pressure

The queue is now concentrated in:

- aggregation family
- preview family
- status history family
- reopen and audit family

That means the fastest truthful refill is to deepen those same families instead
of inventing unrelated packets.

## Recovery Additions

### Aggregation

- aggregation summary projection
- aggregation audit event family
- aggregation recommended action policy

### Preview

- attachment preview reference projection
- preview failure reason catalog

### Status History

- status history projection shape
- status transition audit family

### Reopen And Visibility

- reopen audit event family
- inactive intake filter preset model

## Outcome Standard

If this recovery packet lands, the queue returns above floor while staying
inside the same truthful administrator execution lane rather than drifting into
low-signal filler.
