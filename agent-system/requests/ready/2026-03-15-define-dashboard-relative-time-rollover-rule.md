Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Relative Time Rollover Rule

## Goal

Define how freshness labels should roll from seconds to minutes to hours so the
timing stays readable without flicker or awkward over-precision.

## Focus

- rollover thresholds
- wording simplification
- relationship to stale-state wording

## Acceptance

- one bounded rollover packet exists
- it fits the timestamp-format and last-updated rules
- it stays lightweight and user-facing
