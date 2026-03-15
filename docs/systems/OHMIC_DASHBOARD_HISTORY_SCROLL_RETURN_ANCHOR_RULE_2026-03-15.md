# Ohmic Dashboard History Scroll Return Anchor Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define where the user should land when expanded history must abandon a stored
scroll position and return to a safer default anchor.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_ANCHOR_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_RESTORE_POSITION_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_ANCHOR_VISIBILITY_RULE_2026-03-15.md`

## Core Principle

When restoration fails or becomes unsafe, return the user to the newest stable
anchor instead of a random midpoint.

## Recommended Return Anchor

If a stored scroll position cannot be restored safely, return to:

1. the newest visible command group anchor
2. if that is unavailable, the top of the newest retained history segment

Do not return to an arbitrary middle position.

## Why

- restores context fast
- anchors the user near the most relevant recent activity
- avoids disorientation after layout changes or stale restores

## Guardrails

- do not return to a spot that lacks a clear contextual marker
- do not prioritize historical exactness over reorientation
- do not treat old off-screen content as a better fallback than the newest
  stable anchor
