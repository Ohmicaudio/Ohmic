# Ohmic Dashboard History Count Token Recovery Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the hidden-count token should return from stronger compact fallback
back toward fuller presentation once space pressure eases.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_COLLAPSE_THRESHOLD_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_FULL_FORM_RETURN_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_OVERFLOW_FALLBACK_RULE_2026-03-15.md`

## Core Principle

Recovery should happen in the reverse direction of collapse, one readability
step at a time.

## Recommended Recovery Progression

When the layout recovers from pressure:

1. keep truncation only until abbreviation would clearly fit
2. move from truncation back to the compact abbreviation form
3. move from abbreviation back to the full token only after stable room has
   returned

## Why

- mirrors the fallback order and makes the control behavior predictable
- avoids abrupt jumps from a heavily compressed badge straight to the widest
  form
- preserves readability while still restoring richer information when possible

## Guardrails

- do not recover faster than the layout can support
- do not skip intermediate readable states unless the control now has abundant
  room
- do not let recovery behave differently for the same count under the same
  layout conditions

## Relationship To Return Rule

The return rule defines when fuller states may come back.

The recovery rule defines the order in which they come back.
