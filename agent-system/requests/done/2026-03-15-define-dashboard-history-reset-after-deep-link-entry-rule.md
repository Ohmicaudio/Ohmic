Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T150034Z-bd495269

# Define Dashboard History Reset After Deep Link Entry Rule

## Goal

Define whether entering the dashboard through a deep link or direct entry should
start history in collapsed state regardless of prior local expansion state.

## Focus

- deep-link entry behavior
- relationship to navigation-return resets
- default compact-state restoration

## Acceptance

- one bounded deep-link reset packet exists
- it fits the history reset rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined deep-link and fresh direct entry as compact-default cases that reset
  history to collapsed
- kept ordinary in-app continuity separate from deep-link context changes
- preserved the newest visible command anchor while still preferring a clean
  entry state

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_RESET_AFTER_DEEP_LINK_ENTRY_RULE_2026-03-15.md`
