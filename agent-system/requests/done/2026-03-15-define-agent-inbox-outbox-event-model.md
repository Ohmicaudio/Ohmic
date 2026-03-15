Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic

# Define Agent Inbox Outbox Event Model

## Goal

Define the append-only event model for user input and agent output in the live
JSON loop.

## Focus

- inbox events
- outbox events
- handled status
- dedupe and replay safety

## Acceptance

- one explicit event shape
- clear rule for processed vs pending events
- clear reason to prefer append-only logs over one mutable input field

## Outcome

Completed on 2026-03-15.

Result:

- created the first explicit append-only event contract for inbox and outbox
- defined required fields, recommended fields, and processed-event rules
- documented why the mutable `agent_state.json` input summary should not replace
  inbox truth
