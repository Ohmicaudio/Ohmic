Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T152444Z-b25e3cf7

# Define Dashboard History Scroll Threshold Desktop Override Rule

## Goal

Define how desktop-class layouts may relax the history scroll-height threshold
without letting expanded history dominate the page.

## Focus

- desktop override behavior
- relation to mobile threshold
- compact dashboard preservation

## Acceptance

- one bounded desktop-threshold packet exists
- it fits the history scroll height rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined a desktop-only relaxation of the mobile scroll-height threshold
- kept a firm cap so expanded history stays secondary to the main dashboard
- aligned the override with anchor visibility and return behavior after scroll

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_THRESHOLD_DESKTOP_OVERRIDE_RULE_2026-03-15.md`
