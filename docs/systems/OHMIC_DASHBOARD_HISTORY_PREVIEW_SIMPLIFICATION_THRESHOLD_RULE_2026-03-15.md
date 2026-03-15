# Ohmic Dashboard History Preview Simplification Threshold Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the point at which the history control should stop preserving richer
preview and fall back to a simpler compact presentation.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_COMPACTNESS_SCORE_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_HINT_VS_COUNT_BALANCE_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_PREVIEW_FALLBACK_ORDER_RULE_2026-03-15.md`

## Core Principle

Simplify preview when the control stops delivering quick context and starts
looking crowded.

## Recommended Simplification Threshold

Fall to a simpler preview state when any of these become true:

1. the preview no longer fits within the allowed word budget
2. the hidden-count token or primary label becomes harder to scan
3. the current hint requires truncation so aggressive that it stops helping

At that point, move to the next simpler preview form rather than trying to
preserve rich hinting at all costs.

## Why

- gives the control a clear point for leaving richer preview behind
- keeps simplification tied to real usability loss
- prevents over-preserving preview in situations where count-only or shorter
  hinting is cleaner

## Guardrails

- do not simplify purely because the preview is present
- do not wait until the control is visibly broken before simplifying
- do not ignore the existing fallback order once the threshold is crossed

## Relationship To Existing Preview Rules

The compactness score helps detect whether preview is still earning its space.

The hint-vs-count balance defines which element wins when space gets tight.

This threshold rule defines the moment that the preview must actually simplify.
