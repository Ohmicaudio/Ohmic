Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094732Z-9a684b93

# Define Queue Family Reserve Model

## Goal

Define how many near-term packets each active work family should keep in reserve.

## Focus

- family reserve minimums
- same-family pressure
- cross-family balancing
- active-initiative reserves
- refill priorities

## Acceptance

- one family-reserve packet is explicit
- fast lanes stop consuming their last same-family packet too easily

## Result

Done. The family reserve model now lives in
`docs/systems/OHMIC_QUEUE_FAMILY_RESERVE_MODEL_2026-03-16.md`, covering
per-family hot, warm, and cold reserve layers, minimums, cross-family balance,
and reserve-consumption pressure rules.
