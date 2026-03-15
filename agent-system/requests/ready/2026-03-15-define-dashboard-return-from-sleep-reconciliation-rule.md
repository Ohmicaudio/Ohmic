Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Return From Sleep Reconciliation Rule

## Goal

Define when a dashboard returning from a longer hidden or suspended state should
skip straight to reconciliation instead of trusting a lighter refresh.

## Focus

- long-gap thresholds
- stale-state escalation
- relationship to focus-return behavior

## Acceptance

- one bounded return-from-sleep packet exists
- it fits the focus-return and stale-state rules
- it stays lightweight and operational
