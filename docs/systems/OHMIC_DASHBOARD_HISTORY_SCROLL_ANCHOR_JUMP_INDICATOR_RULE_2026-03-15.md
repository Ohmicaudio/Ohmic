# Ohmic Dashboard History Scroll Anchor Jump Indicator Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether the history scroll surface should show a small indicator or cue
when the user can jump back to the newest anchor after exploring older hidden
history.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_ANCHOR_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_RETURN_ANCHOR_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_RESTORE_POSITION_RULE_2026-03-15.md`

## Core Principle

The user should not have to guess whether a fast return to the newest anchor is
available.

## Recommended Jump Indicator Rule

Show a lightweight jump-back cue only when:

1. the expanded history has moved away from the newest anchor
2. the newest anchor is no longer comfortably visible
3. returning would materially reduce navigation work

Hide the cue when the newest anchor is already obvious on screen.

## Why

- gives users a quick way back without forcing manual re-scroll
- keeps the indicator contextual instead of ever-present chrome
- supports long hidden-history sessions without losing orientation

## Guardrails

- do not show the cue when the newest anchor is already visible
- do not style the cue like a high-severity alert
- do not let the indicator compete with the main command controls
