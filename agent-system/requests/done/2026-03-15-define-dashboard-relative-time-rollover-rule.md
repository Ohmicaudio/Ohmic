Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T142945Z-91c4a0f2

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

## Outcome

Completed on 2026-03-15.

Result:

- defined simple second, minute, and hour rollover thresholds for the primary
  freshness label
- kept refresh cadence tied to the visible unit so the label stays low-flicker
- separated stale-state warning language from the relative-age wording so the
  dashboard stays readable under delay

## Artifact

- `docs/systems/OHMIC_DASHBOARD_RELATIVE_TIME_ROLLOVER_RULE_2026-03-15.md`
