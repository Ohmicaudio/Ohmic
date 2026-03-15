Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T152444Z-b25e3cf7

# Define Dashboard History Scroll Return Anchor Rule

## Goal

Define where the user should land when expanded history must abandon a stored
scroll position and return to a safer default anchor.

## Focus

- return-anchor target
- relationship to newest visible command
- restored-context clarity

## Acceptance

- one bounded scroll-return-anchor packet exists
- it fits the history scroll restore position rule
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the newest stable anchor as the fallback landing point when restore
  position fails
- avoided arbitrary midpoint returns that would disorient the user
- aligned the fallback anchor with the broader anchor-visibility model

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_RETURN_ANCHOR_RULE_2026-03-15.md`
