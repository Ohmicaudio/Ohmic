Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic

# Implement JSON Dashboard Command Writeback Prototype

## Goal

Create the first writeback path from a dashboard command box into the inbox
event model so UI input can feed the loop cleanly.

## Source

- `docs/systems/OHMIC_AGENT_INBOX_OUTBOX_EVENT_MODEL_2026-03-15.md`
- `docs/systems/OHMIC_RUNNER_WRAPPER_CYCLE_FOR_JSON_AGENT_LOOP_2026-03-15.md`

## Focus

- command submission shape
- pending and handled markers
- duplicate suppression
- failure-safe write behavior

## Acceptance

- one prototype writeback path exists
- a dashboard command can become a valid inbox event
- writeback failure modes are handled or documented
