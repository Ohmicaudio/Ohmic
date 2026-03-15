Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T143428Z-02be03f6

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

## Outcome

Completed on 2026-03-15.

Result:

- defined short, medium, and long sleep-gap bands with clear escalation from
  immediate refresh to reconciliation
- kept the last visible summary on screen during reconciliation instead of
  blanking the dashboard
- tied the return behavior back to stale-state, freshness confidence, and
  pending command trust

## Artifact

- `docs/systems/OHMIC_DASHBOARD_RETURN_FROM_SLEEP_RECONCILIATION_RULE_2026-03-15.md`
