Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic

# Implement First Agent Inbox And Outbox JSON Files

## Goal

Create the first concrete inbox and outbox event files for the JSON loop so
commands and responses have a stable transport surface.

## Source

- `docs/systems/OHMIC_AGENT_INBOX_OUTBOX_EVENT_MODEL_2026-03-15.md`
- `docs/systems/OHMIC_JSON_AGENT_LOOP_MODEL_2026-03-15.md`

## Focus

- append-only event shape
- processing markers
- separation between user input and agent output
- safe initial examples

## Acceptance

- inbox and outbox files exist in a clear runtime location
- event fields are defined by real examples
- the files are ready for a wrapper loop to read and write
