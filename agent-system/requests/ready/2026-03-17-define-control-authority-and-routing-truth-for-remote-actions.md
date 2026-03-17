Status: ready
Priority: high
Date: 2026-03-17
Project: cyd-remote

# Define Control Authority And Routing Truth For Remote Actions

## Goal

Define who owns a control, how that is exposed to the user, and what actual
target path a handheld action is operating on.

## Source

- `docs/roadmap/OHMIC_REMOTE_OPERATOR_MODES_AND_CONTROL_AUTHORITY_WAVE_2026-03-17.md`

## Focus

- authority ownership
- control routing labels
- capability-gated actions

## Acceptance

- volume/mute/source/run-trigger authority is explicitly defined
- control routing is surfaced as truth, not implication
- unsupported targets reject cleanly instead of silently routing wrong

