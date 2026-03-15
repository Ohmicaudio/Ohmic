# Ohmic Dashboard Command History Expansion Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how hidden older commands should expand, collapse, and present
themselves once the main history surface has reached its default visibility
limit.

## Core Principle

Expansion is secondary access, not the primary way to understand the current
command state.

The default dashboard should stay compact, while expansion provides a controlled
look at older commands when the user asks for it.

## Default Collapsed Rule

When history exceeds the visible command rows:

- keep the current/default visible rows
- collapse older commands behind one small expansion affordance

Do not show a long open stack by default.

## Expansion Affordance Rule

Use a compact affordance such as:

- `Show older commands`
- `View recent command history`

It should clearly imply:

- hidden older entries exist
- the current view is intentionally condensed

## Expanded State Rule

When expanded:

- show the hidden recent commands in chronological or reverse-chronological
  order consistent with the main history surface
- keep the current newest command context clear
- avoid turning the whole dashboard into a transcript pane

## Collapse Return Rule

Allow the user to collapse the history again easily.

On collapse:

- restore the compact default state
- keep the current command row prominent

## Mobile / Tight Layout Rule

On smaller surfaces:

- expansion should remain compact
- hidden history should not blow out the current command area
- consider shorter previews or stronger truncation in expanded mode

## Guardrails

- do not require expansion to understand the current pending/answered command
- do not make expanded history feel like a separate full-page transcript
- do not lose the visible anchor of the newest command when expansion opens
- do not leave hidden history inaccessible or ambiguous

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-expansion-toggle-rule`
- `define-dashboard-history-collapsed-preview-rule`
- `define-dashboard-command-history-visibility-rule`
