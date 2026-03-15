Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Repeated Event Grouping Rule

## Goal

Define how repeated similar output events should be grouped into one readable
summary instead of appearing as a noisy stack of near-duplicates.

## Focus

- similarity criteria
- grouping summary wording
- reset behavior when the event family changes

## Acceptance

- one bounded repeated-grouping packet exists
- it fits the output-collapse and output-priority rules
- it stays lightweight and dashboard-focused
