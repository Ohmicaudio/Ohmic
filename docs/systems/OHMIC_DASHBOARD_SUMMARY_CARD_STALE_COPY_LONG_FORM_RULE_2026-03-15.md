# Ohmic Dashboard Summary Card Stale Copy Long Form Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the fuller local stale wording variant for summary cards when space
allows more explicit caution than the short-form copy.

## Core Principle

Long-form stale copy should clarify scope and consequence, not just add words.

Use it on larger cards where the UI can support a fuller warning without making
the card feel alarmist or bloated.

## Recommended Use

Use long-form copy when:

- the card has enough space
- the stale condition is important enough to deserve more clarity
- the user benefits from knowing this is local card trust degradation

## Recommended Long-Form Direction

Examples:

- `This card may be behind current state and should be treated cautiously.`
- `Card data may not reflect the latest dashboard state.`

Keep the tone factual, scoped, and readable.

## Relationship To Short Form

Long-form copy should:

- expand on the same meaning as short-form copy
- remain clearly local in scope
- not introduce new alarm levels that short-form copy lacks

## Guardrails

- do not let long-form local copy sound like whole-dashboard collapse
- do not add explanation so long that it dominates the card
- do not use long-form wording where short-form would clearly fit better
- do not make long-form and short-form communicate contradictory severity

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-copy-layout-switch-rule`
- `define-dashboard-summary-card-local-vs-global-stale-copy-rule`
