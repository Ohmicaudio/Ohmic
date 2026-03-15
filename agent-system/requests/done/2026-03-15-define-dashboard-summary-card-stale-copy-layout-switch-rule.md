Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T145410Z-fdbd8ca1

# Define Dashboard Summary Card Stale Copy Layout Switch Rule

## Goal

Define when the dashboard should switch between short-form and long-form local
stale copy based on available card space and layout density.

## Focus

- short vs long form selection
- cramped-layout thresholds
- relationship to card density and readability

## Acceptance

- one bounded stale-copy-layout packet exists
- it fits the long-form and short-form stale copy rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the switch between long-form and short-form local stale copy as a
  layout-fit decision rather than a severity change
- tied the switch to card width, title-row crowding, and metadata-line pressure
- preserved the same local stale meaning across both copy lengths

## Artifact

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_LAYOUT_SWITCH_RULE_2026-03-15.md`
