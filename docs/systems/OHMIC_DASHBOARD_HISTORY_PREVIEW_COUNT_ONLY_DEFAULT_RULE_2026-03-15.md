# Ohmic Dashboard History Preview Count Only Default Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when collapsed history should prefer a count-only control by default
instead of attempting to show any hidden-command preview text.

## Core Principle

Count-only is the safest compact default when preview adds more noise than value.

The control should favor fast comprehension over richer hinting when the history
surface is meant to stay secondary.

## Recommended Default Conditions

Prefer count-only by default when:

- layout is tight
- command texts tend to be long
- the current command row already carries enough context
- preview text would not add much decision value

## Relationship To Mobile Suppression

Mobile suppression is one strong reason to fall back to count-only.

But count-only may also be the default on larger layouts when the product wants
maximum compactness.

## Guardrails

- do not force preview text when count-only is clearer
- do not remove preview on layouts where a very short hint materially helps
- do not let count-only mode become ambiguous about hidden history
- do not make preview/default behavior vary randomly between similar states

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-fallback-order-rule`
- `define-dashboard-history-hidden-count-copy-rule`
