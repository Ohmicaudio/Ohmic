Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Next Backend Post-Auth Router Safe Slice

## Goal

Define the next bounded backend slice that should follow the auth and policy
control-plane family once it lands.

## Focus

- pick one coherent router or endpoint family
- keep `index.ts`, storage, websocket, and broad backend noise out unless they
  are truly required
- identify the exact tests that would verify the slice honestly

## Acceptance

- one explicit backend follow-on packet exists
- scope is narrow enough to commit cleanly
- the backend queue stays ahead of execution
