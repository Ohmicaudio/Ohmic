Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T112206Z-b79199f9

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

## Result

Completed on 2026-03-16.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_AMPLAB_LIVE_LINK_FAILURE_SIGNATURE_2026-03-16.md`

Outcome:

- the live-link failure signature is now locked to the mismatch between a live
  direct device, alias-only live storage, and a browser candidate list that
  still omits the real AP/LAN identities
