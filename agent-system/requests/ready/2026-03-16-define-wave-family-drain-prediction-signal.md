Status: active
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

# Define Wave Family Drain Prediction Signal

## Goal

Define a signal that predicts when an active wave family is likely to drain
before the next refill.

## Focus

- active worker count
- hot successor count
- staged successor count
- completion rate
- refill age

## Acceptance

- one family-drain prediction packet is explicit
- the board can warn earlier than actual collapse
