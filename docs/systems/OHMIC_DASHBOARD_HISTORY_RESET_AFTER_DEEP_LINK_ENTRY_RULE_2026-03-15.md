# Ohmic Dashboard History Reset After Deep Link Entry Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether entering the dashboard through a deep link or direct entry should
start history in collapsed state regardless of prior local expansion state.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_STATE_RESET_BOUNDARY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_RESET_ON_NAVIGATION_RETURN_RULE_2026-03-15.md`

## Core Principle

Deep-link or direct entry should prefer a compact, predictable starting state
over restoring an expansion state that may no longer match the user's context.

## Recommended Rule

When the user enters the dashboard through a deep link or fresh direct entry:

- reset history to collapsed by default

Do this even if a previous local session had the history expanded.

## Why

- deep-link entry changes the user's context
- preserved expansion state can feel like leftover UI chrome from a different
  session or intent
- the compact default is easier to understand on first arrival

## What Counts As Deep Link Entry

Treat these as deep-link or fresh entry cases:

- opening the dashboard directly from a bookmark or typed URL
- landing on the dashboard from an external route or surface
- entering with URL state that bypasses ordinary in-app continuity

## What Does Not Count

Do not treat these as deep-link entry:

- ordinary in-app navigation back to the dashboard in the same active flow
- small rerenders
- routine refreshes

Those should follow the normal history persistence and navigation-return rules
instead.

## Compact Default Restoration

On deep-link entry:

- show the newest visible command(s)
- keep the hidden history collapsed
- allow the user to reopen history intentionally if needed

## Guardrails

- do not restore expanded history just because a stale local preference exists
- do not make deep-link entry feel random by sometimes expanding and sometimes
  collapsing
- do not collapse the newest visible command anchor out of view

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-reset-after-major-layout-change-rule`
- `define-dashboard-history-expansion-state-persistence-rule`
