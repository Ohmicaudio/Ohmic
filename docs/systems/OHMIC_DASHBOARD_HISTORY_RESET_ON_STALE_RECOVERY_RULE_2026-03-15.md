# Ohmic Dashboard History Reset On Stale Recovery Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether a major stale-state recovery or reconciliation pass should reset
expanded history back to collapsed state for clarity.

## Core Principle

Large truth repair should favor clarity over preserving every transient view
state.

If reconciliation materially changes what the dashboard believes is current,
collapsing expanded history may help users re-anchor on the repaired state.

## Recommended Rule

When stale recovery or reconciliation materially changes command-state truth:

- reset expanded history to collapsed
- re-anchor the dashboard on the current visible command context

If recovery is minor and does not materially change what the user sees:

- preserving history expansion may still be acceptable

## Material Change Definition

Examples of material change:

- current command status changes meaningfully
- pending/answered state is corrected
- hidden/visible history ordering must be recomputed

## Guardrails

- do not collapse history on every tiny reconciliation tick
- do not preserve expanded state when it would now frame outdated context
- do not make stale recovery feel random or disruptive
- do not let reset hide the current repaired command state

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-state-reset-boundary-rule`
- `define-dashboard-focus-return-refresh-rule`
