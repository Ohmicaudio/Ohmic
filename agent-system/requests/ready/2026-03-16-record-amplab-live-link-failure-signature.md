Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Record AmpLab Live Link Failure Signature

## Goal

Record the exact live-link failure signature so future reruns can distinguish
real regression from the already-known failure mode.

## Focus

- user-visible failure
- candidate state at failure
- reachable endpoint state
- exact mismatch between discovery and link outcome

## Acceptance

- one stable failure signature is recorded
- later reruns can compare against the same shape
