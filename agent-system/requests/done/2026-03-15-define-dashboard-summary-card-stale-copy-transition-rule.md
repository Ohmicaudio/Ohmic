Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T145609Z-ab9455eb

# Define Dashboard Summary Card Stale Copy Transition Rule

## Goal

Define when local stale copy should move between mild, moderate, and strong
severity wording as card trust degrades.

## Focus

- severity transition triggers
- copy handoff between steps
- relationship to global stale escalation

## Acceptance

- one bounded stale-copy-transition packet exists
- it fits the stale-copy severity rule
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined a three-step local stale wording ladder from mild to strong without
  collapsing into global stale language
- separated layout-driven short/long form changes from actual severity changes
- documented the handoff point where local stale messaging should yield to the
  global stale state

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_TRANSITION_RULE_2026-03-15.md`
