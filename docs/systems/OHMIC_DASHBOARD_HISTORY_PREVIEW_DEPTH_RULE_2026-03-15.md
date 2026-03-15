# Ohmic Dashboard History Preview Depth Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define exactly how much hidden-command text, if any, may appear in collapsed
history preview before the control stops feeling compact.

## Core Principle

Preview should hint at hidden content, not become hidden content.

Keep collapsed history compact enough that expansion still serves a real purpose.

## Recommended Depth

Default recommendation:

- preview at most one hidden command
- show only a short truncated fragment if preview is enabled at all

Count-only is still acceptable and often preferable.

## Truncation Rule

If preview text is shown:

- truncate early
- prefer a short semantic fragment
- avoid long literal command replay

## Mobile Rule

On tight layouts:

- prefer no preview or extremely short preview
- hidden count alone is often enough

## Guardrails

- do not preview multiple hidden commands in collapsed state
- do not let preview exceed the width or importance of the current command row
- do not make collapsed history feel almost expanded
- do not rely on preview when count-only control is clearer

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-truncation-rule`
- `define-dashboard-history-collapsed-preview-rule`
