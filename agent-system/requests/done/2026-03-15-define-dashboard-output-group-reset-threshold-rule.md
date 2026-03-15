Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T144234Z-cdd2d887

# Define Dashboard Output Group Reset Threshold Rule

## Goal

Define when a repeated-event group should reset into a new group instead of
continuing to accumulate count forever.

## Focus

- time-gap reset behavior
- event-family change reset
- interruption by higher-priority events

## Acceptance

- one bounded group-reset packet exists
- it fits the repeated-event grouping rule
- it stays lightweight and operational

## Outcome

Completed on 2026-03-15.

Result:

- defined reset boundaries for grouped routine output across event-family
  changes, higher-priority interruptions, and longer quiet gaps
- recommended a five-minute default gap threshold so group counts represent one
  recent burst instead of a lifetime accumulator
- kept freshness and repeat counts local to each new group after reset

## Artifact

- `docs/systems/OHMIC_DASHBOARD_OUTPUT_GROUP_RESET_THRESHOLD_RULE_2026-03-15.md`
