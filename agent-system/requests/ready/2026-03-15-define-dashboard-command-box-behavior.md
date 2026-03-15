Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Command Box Behavior

## Goal

Define the minimal UX and state behavior for a dashboard command/input box that
writes into the JSON inbox safely.

## Focus

- submit behavior
- pending state
- duplicate submit prevention
- visible acknowledgement after handling

## Acceptance

- one bounded command-box behavior packet exists
- it matches the inbox/outbox and writeback flow contracts
- it stays implementation-ready without becoming a full UI spec
