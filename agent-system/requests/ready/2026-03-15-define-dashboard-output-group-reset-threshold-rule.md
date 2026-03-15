Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

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
