# Ohmic Dashboard History Reset After Major Layout Change Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether significant layout-mode changes should reset expanded history
back to collapsed state for clarity and compactness.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_STATE_RESET_BOUNDARY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_RESET_ON_STALE_RECOVERY_RULE_2026-03-15.md`

## Core Principle

If the layout mode changes enough to alter how the history panel reads, the
dashboard should restore compact defaults instead of preserving an expansion
state that now fits poorly.

## Recommended Rule

Reset expanded history back to collapsed when a major layout change occurs.

Examples:

- desktop to compact/mobile layout
- wide multi-column to narrow stacked mode
- a layout shift that meaningfully changes the history pane height or placement

## Why

- preserved expansion state can become noisy or awkward after a major layout
  shift
- compact restoration is easier to understand than trying to preserve every
  expanded state across radically different shapes

## What Counts As A Major Layout Change

Treat these as major layout changes:

- crossing a real responsive breakpoint that changes the card stack or pane
  structure
- moving between layouts where the history area substantially shrinks
- layout mode changes that would cause the expanded history to dominate the
  visible space

## What Does Not Count

Do not reset history for:

- minor width changes within the same layout mode
- harmless rerenders
- small spacing or typography changes

Those are not significant enough to justify losing the user's expansion state.

## Reset Behavior

After a major layout change:

- restore history to collapsed
- keep the newest visible command anchor present
- allow the user to expand history again if they still want more context

## Relationship To Other Reset Rules

- deep-link entry resets for fresh context
- stale recovery resets for trust restoration
- major layout change resets for readability and compactness

These rules are different reasons for the same compact-default restoration.

## Guardrails

- do not reset history on every tiny resize event
- do not preserve expanded history when the new layout would make it dominate
  the card
- do not hide the newest visible command anchor during reset

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-scroll-height-mobile-threshold-rule`
- `define-dashboard-history-reset-after-deep-link-entry-rule`
