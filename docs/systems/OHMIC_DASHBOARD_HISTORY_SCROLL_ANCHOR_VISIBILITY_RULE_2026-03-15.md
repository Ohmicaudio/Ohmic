# Ohmic Dashboard History Scroll Anchor Visibility Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the current history scroll anchor should remain visually recoverable
when the expanded history region becomes long or heavily scrolled.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_ANCHOR_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_RESTORE_POSITION_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_SCROLL_ANCHOR_JUMP_INDICATOR_RULE_2026-03-15.md`

## Core Principle

Users should be able to recover where "now" is without re-reading the whole
history block.

## Recommended Visibility Rule

Keep the current anchor recoverable by:

1. preserving a clear newest-anchor marker at the boundary of the latest group
2. allowing that marker to reappear as a cue when it scrolls off screen
3. keeping the cue lightweight enough that it does not turn into a second
   header

## Why

- helps users maintain orientation inside long expanded history
- supports quick return to current context
- prevents the history surface from feeling like an unbounded transcript

## Guardrails

- do not rely on subtle styling that disappears inside dense history
- do not duplicate the anchor marker so heavily that the UI feels noisy
- do not make anchor visibility cues stronger than the actual newest content
