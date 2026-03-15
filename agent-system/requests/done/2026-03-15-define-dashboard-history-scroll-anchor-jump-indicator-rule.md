Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T152444Z-b25e3cf7

# Define Dashboard History Scroll Anchor Jump Indicator Rule

## Goal

Define whether the history scroll surface should show a small indicator or cue
when the user can jump back to the newest anchor after exploring older hidden
history.

## Focus

- jump-indicator behavior
- relationship to scroll return anchor rules
- compact dashboard readability

## Acceptance

- one bounded scroll-jump-indicator packet exists
- it fits the history scroll rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the conditions for showing a lightweight jump-back cue to the newest
  anchor
- kept the cue contextual instead of permanent chrome
- aligned the indicator with anchor visibility and return-anchor behavior

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_ANCHOR_JUMP_INDICATOR_RULE_2026-03-15.md`
