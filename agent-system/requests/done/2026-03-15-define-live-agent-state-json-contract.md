Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic

# Define Live Agent State JSON Contract

## Goal

Define the first machine-readable `agent_state.json` contract for a UI-driven
agent loop.

## Focus

- current session state
- current mode
- current summary
- queue health
- current response payload

## Acceptance

- field list is explicit
- example packet exists
- clear distinction between durable Markdown authority and live JSON state

## Outcome

Completed on 2026-03-15.

Result:

- created the first concrete `agent_state.json` contract
- documented required and recommended top-level keys
- added minimal and extended example packets
- linked the concrete contract back into the broader JSON-loop model
