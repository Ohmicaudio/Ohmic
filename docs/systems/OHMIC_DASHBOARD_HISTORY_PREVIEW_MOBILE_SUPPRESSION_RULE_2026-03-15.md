# Ohmic Dashboard History Preview Mobile Suppression Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when collapsed history preview should disappear entirely on small
surfaces instead of competing with count and action text.

## Core Principle

On cramped layouts, clarity beats extra hinting.

If preview text makes the control harder to read or pushes out more important
signals, suppress it and fall back to a simpler count-first control.

## Recommended Rule

Suppress preview text on smaller surfaces when:

- the control becomes crowded
- preview would compete with count and action text
- current visible command context is already space-constrained

In those cases:

- use count-only or action-plus-count form

## Relationship To Truncation

Truncation is the first containment tool.
Suppression is the fallback when truncation still leaves the control too noisy.

## Guardrails

- do not keep preview text on mobile just because it technically fits once
- do not suppress preview if the control still remains clearly readable and helpful
- do not let suppression remove the count when hidden history still exists
- do not make suppression conditions unpredictable across similar small layouts

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-count-only-default-rule`
- `define-dashboard-history-preview-density-threshold-rule`
