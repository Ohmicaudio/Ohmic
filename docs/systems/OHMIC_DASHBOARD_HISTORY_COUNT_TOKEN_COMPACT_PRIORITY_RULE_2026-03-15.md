# Ohmic Dashboard History Count Token Compact Priority Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define which compact count presentation should be preferred first when the
history toggle needs to save horizontal space.

## Core Principle

Prefer the compact form that preserves clarity with the least visual cost.

Compactness is not the only goal; the user still needs to understand that the
token is a hidden-count signal.

## Recommended Priority Order

1. normal compact count
2. slightly simplified compact count
3. abbreviated compact count if still obvious in context
4. stronger fallback only if compact options are no longer clear

## Relationship To Abbreviation

Abbreviation should be later than simple compact presentation, not the first
step by default.

## Guardrails

- do not abbreviate before a clearer compact form has been tried
- do not choose the shortest format if it becomes cryptic
- do not let compact priority override the action label’s readability
- do not make compact ordering depend only on cosmetic preference

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-collapse-threshold-rule`
- `define-dashboard-history-toggle-count-compact-abbreviation-rule`
