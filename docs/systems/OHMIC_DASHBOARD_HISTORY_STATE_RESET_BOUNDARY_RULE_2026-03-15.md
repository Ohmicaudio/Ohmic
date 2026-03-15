# Ohmic Dashboard History State Reset Boundary Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define which kinds of navigation, focus, or stale-recovery changes should reset
history expansion back to collapsed state.

## Core Principle

Small continuity should preserve state.
Bigger context shifts should restore compact defaults.

## Recommended Reset Boundaries

Reset to collapsed when:

- the user navigates away from the dashboard and returns later
- a larger layout/context reset occurs
- stale recovery or reconciliation materially changes the command surface
- the dashboard returns after a long enough absence that preserved expansion
  would feel confusing

Do not reset on:

- small visual refresh
- immediate refresh bursts
- harmless local rerenders

## Focus Relationship

Short focus loss may preserve expansion state.

Longer return-from-sleep or stale-recovery paths may reset to collapsed.

## Guardrails

- do not collapse history on every ordinary refresh
- do not preserve expanded history through major context shifts by default
- do not make reset conditions invisible or random
- do not let reset behavior obscure the newest command anchor

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-reset-on-stale-recovery-rule`
- `define-dashboard-history-expansion-state-persistence-rule`
- `define-dashboard-focus-return-refresh-rule`
