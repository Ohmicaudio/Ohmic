Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define State Reconciliation Pass Between Repo Truth And JSON Summary

## Goal

Define the pass that refreshes `agent_state.json` from repo-backed queue, claim,
and memory truth so the live dashboard does not drift from the real system.

## Focus

- what sources must be reread each cycle
- what can be summarized vs copied directly
- when stale JSON should be considered invalid

## Acceptance

- one explicit reconciliation step exists
- it keeps Markdown/repo truth above JSON convenience
- it fits the wrapper cycle without becoming too heavy

## Outcome

Completed on 2026-03-15.

Result:

- defined the authority order for rebuilding `agent_state.json`
- listed the repo-backed and JSON sources the wrapper must re-read each cycle
- documented when stale JSON summary should be discarded and rebuilt
