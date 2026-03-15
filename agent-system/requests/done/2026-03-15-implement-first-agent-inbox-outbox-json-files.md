Status: done
Priority: high
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T175156Z-3244d41e

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

## Outcome

Completed on 2026-03-15.

Result:

- seeded `agent_inbox.jsonl` and `agent_outbox.jsonl` under one runtime
  directory in `generated/agent-work`
- used one handled instruction/result example pair to make the event shape real
  instead of abstract
- documented the append-only bootstrap rules so later wrappers extend the files
  instead of replacing them

## Artifact

- `B:\ohmic\generated\agent-work\runtime\agent_inbox.jsonl`
- `B:\ohmic\generated\agent-work\runtime\agent_outbox.jsonl`
- `B:\ohmic\docs\systems\OHMIC_AGENT_JSON_RUNTIME_BOOTSTRAP_2026-03-15.md`
