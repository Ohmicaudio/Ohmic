Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094732Z-9a684b93

# Define Queue Refill Cadence Policy

## Goal

Define how often the system should perform queue refill checks and when refill
must happen immediately.

## Focus

- time-based cadence
- completion-count cadence
- family-pressure cadence
- manual override
- stale-board warnings

## Acceptance

- one refill-cadence packet is explicit
- queue refill timing becomes deliberate instead of ad hoc

## Result

Done. The refill cadence policy now lives in
`docs/systems/OHMIC_QUEUE_REFILL_CADENCE_POLICY_2026-03-16.md`, defining
baseline time cadence, completion-count cadence, immediate refill conditions,
and manual override behavior.
