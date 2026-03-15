Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic

# Define Runner Wrapper Cycle For JSON Agent Loop

## Goal

Define the external wrapper cycle that invokes the agent against the live JSON
mailbox/state model.

## Focus

- read input
- invoke agent
- write output
- re-check queue and claims
- backoff or continue

## Acceptance

- one explicit cycle description
- clear external responsibilities vs agent responsibilities
- suitable as the first implementation packet for a future UI/runner
