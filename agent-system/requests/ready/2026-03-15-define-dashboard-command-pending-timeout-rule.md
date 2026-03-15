Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Command Pending Timeout Rule

## Goal

Define what the dashboard should do when a command stays in accepted/pending
state longer than expected.

## Focus

- when to warn
- when to keep waiting quietly
- how to avoid implying failure too early

## Acceptance

- one bounded timeout rule exists
- it fits the acknowledgement and stale-state work
- it stays lightweight and user-facing
