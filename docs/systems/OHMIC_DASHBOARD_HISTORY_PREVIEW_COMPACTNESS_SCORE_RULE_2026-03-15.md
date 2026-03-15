# Ohmic Dashboard History Preview Compactness Score Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define a simple compactness heuristic for deciding when history preview is still
helpful versus when it has become too dense for the control.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_DENSITY_THRESHOLD_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_WORD_BUDGET_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_SIMPLIFICATION_THRESHOLD_RULE_2026-03-15.md`

## Core Principle

Preview should earn its space by adding quick context without turning the
control into a cramped sentence fragment.

## Recommended Compactness Heuristic

Treat preview as compact enough to keep when it satisfies most of these:

1. it fits within the current word budget without crowding the count token
2. it still reads as one short idea instead of multiple competing fragments
3. it does not force the control into awkward wrapping or visual imbalance

If those conditions stop being true, the preview has become too dense.

## Why

- gives the control a simple keep-or-simplify checkpoint
- keeps preview usefulness tied to real readability rather than raw character
  count alone
- aligns preview decisions with the rest of the compact-history rules

## Guardrails

- do not treat every short string as automatically compact enough
- do not keep preview when the count or action label becomes harder to scan
- do not overfit the heuristic into a complicated scoring system

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-hint-vs-count-balance-rule`
