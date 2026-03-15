# Ohmic Dashboard History Toggle Count Compact Abbreviation Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether the hidden-count token should ever abbreviate on cramped
surfaces, and if so how to do it without losing clarity.

## Core Principle

Abbreviation is a fallback, not the default.

Only abbreviate when compactness materially helps and the resulting token still
remains obvious in context.

## Recommended Rule

Use compact abbreviation only when:

- space is genuinely tight
- full count presentation would crowd the action text
- the abbreviated form stays clearly interpretable inside the history toggle

## Relationship To Truncation

Prefer:

1. normal count
2. compact abbreviation when still clear
3. stronger truncation or simplification only when needed

## Guardrails

- do not abbreviate by default on roomy layouts
- do not invent abbreviation forms that become cryptic
- do not let abbreviation make the count easier to miss than to read
- do not use abbreviation if count-only suppression is clearer

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-compact-priority-rule`
- `define-dashboard-history-count-token-width-rule`
