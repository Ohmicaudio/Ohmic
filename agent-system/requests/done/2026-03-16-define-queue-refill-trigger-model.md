Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094242Z-d330879d

# Define Queue Refill Trigger Model

## Goal

Define the explicit triggers that should force queue refill before the board
starves.

## Focus

- count-based triggers
- throughput-based triggers
- family-pressure triggers
- stale-refill triggers
- worker-count triggers

## Acceptance

- one refill-trigger packet is explicit
- queue refill stops depending on gut feel

## Result

Done. The refill trigger model now lives in
`docs/systems/OHMIC_QUEUE_REFILL_TRIGGER_MODEL_2026-03-16.md`, defining count,
same-family, throughput, refill-age, worker-ratio, and warm-reserve triggers
plus structured trigger output and de-dupe behavior.
