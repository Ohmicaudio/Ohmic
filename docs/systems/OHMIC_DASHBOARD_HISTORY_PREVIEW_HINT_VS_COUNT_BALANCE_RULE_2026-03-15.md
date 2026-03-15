# Ohmic Dashboard History Preview Hint Vs Count Balance Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the history control should balance hint richness against hidden-count
clarity when both cannot be emphasized equally in compact space.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_FALLBACK_ORDER_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_PRIORITY_ORDER_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_COMPACTNESS_SCORE_RULE_2026-03-15.md`

## Core Principle

When the control is under pressure, hidden-count clarity beats hint richness.

## Recommended Balance Rule

When both elements cannot stay equally legible:

1. keep the hidden-count readable
2. keep only as much preview hint as still fits cleanly beside it
3. simplify or remove preview before sacrificing count clarity

## Why

- the count tells the user how much hidden history exists
- the preview is helpful context, but it is secondary when the control is tight
- this keeps the control's compact meaning stable across crowded states

## Guardrails

- do not let preview text crowd the count into ambiguity
- do not drop to count-only too early if a short helpful hint still fits
- do not favor decorative hint wording over a readable numeric signal

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-simplification-threshold-rule`
