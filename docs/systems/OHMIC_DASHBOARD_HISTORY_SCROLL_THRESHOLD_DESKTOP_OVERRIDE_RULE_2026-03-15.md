# Ohmic Dashboard History Scroll Threshold Desktop Override Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how desktop-class layouts may relax the history scroll-height threshold
without letting expanded history dominate the page.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_HEIGHT_MOBILE_THRESHOLD_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_ANCHOR_VISIBILITY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_RETURN_ANCHOR_RULE_2026-03-15.md`

## Core Principle

Desktop layouts may tolerate a taller history region, but they should not let
history consume the whole workspace just because more pixels exist.

## Recommended Desktop Override Rule

On desktop-class layouts:

1. allow a taller pre-scroll history region than mobile
2. keep a visible cap so the expanded region still feels secondary to the main
   dashboard work
3. preserve anchor cues and return behavior once scrolling begins

## Why

- desktop has more room for context before scroll is necessary
- a moderate override reduces needless scrolling on larger screens
- keeping a cap preserves the dashboard-first layout hierarchy

## Guardrails

- do not mirror mobile thresholds exactly if desktop readability clearly
  supports more height
- do not remove the cap entirely on wide screens
- do not let desktop override break the anchor visibility and return rules
