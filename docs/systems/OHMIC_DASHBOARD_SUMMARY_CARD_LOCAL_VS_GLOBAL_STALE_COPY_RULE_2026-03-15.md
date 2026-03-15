# Ohmic Dashboard Summary Card Local Vs Global Stale Copy Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how card-level stale wording should differ from global stale wording so
users can tell whether an issue is local to one card or affects the whole
dashboard.

## Core Principle

Local stale copy should narrow scope.
Global stale copy should widen scope.

Users should be able to tell immediately whether only one card may be behind or
whether the dashboard as a whole is questionable.

## Recommended Copy Direction

Local stale examples:

- `This card may be stale`
- `Card data may be behind current state`

Global stale examples:

- `Dashboard state may be stale`
- `Live summary may be behind repo/runtime truth`

## Hierarchy Rule

Local stale wording should:

- stay narrower
- sound less sweeping
- avoid implying total dashboard failure

Global stale wording may:

- speak to broader system confidence
- justify stronger attention

## Severity Step Rule

If local stale conditions worsen materially:

- local wording may intensify
- but it still should not sound identical to global stale warnings unless the
  state truly became global

## Guardrails

- do not let local stale wording sound like whole-dashboard collapse
- do not understate true global stale conditions as if they were local-only
- do not make local and global copy so similar that users cannot distinguish
  them
- do not force every stale message into the same sentence template

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-copy-severity-step-rule`
- `define-dashboard-summary-card-stale-override-rule`
