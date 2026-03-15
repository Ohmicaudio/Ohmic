Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard History Count Token Collapse Threshold Rule

## Goal

Define the point at which the hidden-count token should stop trying to preserve
its fuller compact forms and step into stronger overflow fallback.

## Focus

- collapse threshold
- readability breakpoints
- relationship to overflow fallback rules

## Acceptance

- one bounded count-collapse-threshold packet exists
- it fits the history count token rules
- it stays lightweight and dashboard-focused
