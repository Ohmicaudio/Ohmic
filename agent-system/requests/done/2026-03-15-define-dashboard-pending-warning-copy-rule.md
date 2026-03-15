Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T141858Z-e8a4710b

# Define Dashboard Pending Warning Copy Rule

## Goal

Define the exact wording tone and severity progression for pending-delay
messages so timeout states stay clear without sounding like false failure.

## Focus

- wording by delay tier
- calm vs urgent phrasing
- relationship to stale-state copy

## Acceptance

- one bounded pending-copy packet exists
- it fits the timeout and stale-state rules
- it stays lightweight and user-facing

## Outcome

Completed on 2026-03-15.

Result:

- defined pending-delay wording for four severity tiers from calm wait through
  possible staleness
- kept refresh advice out of the early tiers and avoided false-failure wording
- aligned the copy to the timeout and stale-summary rules already in place

## Artifact

- `docs/systems/OHMIC_DASHBOARD_PENDING_WARNING_COPY_RULE_2026-03-15.md`
