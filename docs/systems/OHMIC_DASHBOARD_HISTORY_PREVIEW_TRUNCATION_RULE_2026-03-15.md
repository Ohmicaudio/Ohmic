# Ohmic Dashboard History Preview Truncation Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how collapsed history preview text should be truncated so it hints at
hidden content without becoming a bulky second command row.

## Core Principle

Preview should preserve hint value, not replay the hidden command in full.

Truncation should keep the control compact and readable while still signaling
what kind of older content is hidden.

## Recommended Rule

If preview text is shown:

- keep it to a short semantic fragment
- truncate before it becomes row-like
- prefer meaning over literal full command text

## Mobile Rule

On smaller surfaces:

- truncate more aggressively
- or suppress preview entirely if count-only is clearer

## Guardrails

- do not let preview text become longer than the control itself
- do not show multiple hidden commands in the collapsed preview
- do not truncate so oddly that the preview becomes meaningless
- do not let preview compete with the current visible command

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-mobile-suppression-rule`
- `define-dashboard-history-collapsed-preview-rule`
