Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Agent Runtime JSON Contract

## Goal

Define the minimal `agent_runtime.json` contract for live loop bookkeeping that
does not belong in `agent_state.json`.

## Focus

- runner metadata
- loop counters
- last wake/sleep timestamps
- last stable idle state

## Acceptance

- one explicit runtime packet shape exists
- it stays distinct from live render state and append-only event logs
- it fits the existing JSON-loop contract family

## Outcome

Completed on 2026-03-15.

Result:

- created the first explicit runtime bookkeeping contract
- separated loop bookkeeping from render-facing state
- linked the runtime contract back into the wrapper-cycle packet
