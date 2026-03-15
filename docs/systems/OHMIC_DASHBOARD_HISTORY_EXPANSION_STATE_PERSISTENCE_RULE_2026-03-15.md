# Ohmic Dashboard History Expansion State Persistence Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether the dashboard should remember command-history expanded/collapsed
state across small refreshes, focus changes, and navigation returns.

## Core Principle

Short-lived UI state may persist briefly, but compactness remains the default.

The dashboard should avoid collapsing immediately on harmless refreshes, while
still resetting to a sane compact default across larger context changes.

## Recommended Persistence Rule

Preserve expanded/collapsed state across:

- light refreshes
- immediate refreshes
- small local UI rerenders

Do not treat normal dashboard activity as a reason to reset history state.

## Reset Boundary Rule

Reset history expansion to collapsed when:

- a larger navigation/context change occurs
- a stronger layout reset happens
- the user returns after a sufficiently long absence if persistence would feel
  confusing

## Focus Return Rule

Short background/focus changes may preserve the current history state.

Longer return-from-sleep or major stale recovery may choose to reset to compact
collapsed state.

## Guardrails

- do not collapse history on every tiny refresh
- do not persist expansion so aggressively that the dashboard stops feeling
  compact on return
- do not make persistence rules unpredictable or invisible
- do not let state persistence hide the newest command anchor

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-state-reset-boundary-rule`
- `define-dashboard-focus-return-refresh-rule`
- `define-dashboard-history-expansion-toggle-rule`
