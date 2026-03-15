# Ohmic Dashboard History Count Token Truncation Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the hidden-count token should truncate or simplify itself when count
presentation would otherwise overrun the compact history toggle.

## Core Principle

Truncation is the last-resort compact fallback.

It should preserve the fact that hidden history exists without letting a long
count representation deform the whole control.

## Recommended Rule

If width pressure remains after normal compact presentation:

- simplify the count token first
- truncate only when that still is not enough

Keep the token recognizable as a count indicator rather than arbitrary clipped
text.

## Guardrails

- do not truncate before trying clearer compact alternatives
- do not truncate into meaningless fragments
- do not let truncation obscure that hidden history still exists
- do not use truncation when suppressing the token or simplifying the control
  would be clearer

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-overflow-fallback-rule`
- `define-dashboard-history-count-token-width-rule`
