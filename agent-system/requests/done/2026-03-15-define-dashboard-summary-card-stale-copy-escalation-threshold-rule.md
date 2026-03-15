Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T145809Z-9694fb89

# Define Dashboard Summary Card Stale Copy Escalation Threshold Rule

## Goal

Define what level of local trust degradation should trigger movement from milder
stale copy to stronger local stale wording on a summary card.

## Focus

- escalation threshold
- evidence needed for stronger wording
- relationship to global stale handoff

## Acceptance

- one bounded stale-escalation-threshold packet exists
- it fits the stale-copy severity and transition rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined evidence-based thresholds for mild, moderate, and strong local stale
  wording on summary cards
- kept layout changes and small age drift from triggering stronger copy by
  themselves
- preserved a clear handoff boundary between strong local stale wording and
  true global stale state

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_ESCALATION_THRESHOLD_RULE_2026-03-15.md`
