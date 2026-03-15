Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T150034Z-bd495269

# Define Dashboard History Reset After Major Layout Change Rule

## Goal

Define whether significant layout-mode changes should reset expanded history
back to collapsed state for clarity and compactness.

## Focus

- layout-change reset behavior
- relationship to navigation and stale recovery
- compact default restoration

## Acceptance

- one bounded layout-change reset packet exists
- it fits the history reset rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined major layout changes as another compact-default reset boundary for
  expanded history
- separated major responsive shifts from harmless resizes and rerenders
- kept the newest command anchor visible while resetting oversized history state

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_RESET_AFTER_MAJOR_LAYOUT_CHANGE_RULE_2026-03-15.md`
