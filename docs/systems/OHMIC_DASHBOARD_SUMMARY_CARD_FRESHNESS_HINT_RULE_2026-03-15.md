# Ohmic Dashboard Summary Card Freshness Hint Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether summary cards should show a lightweight freshness hint so users
can tell which high-level dashboard areas reflect newer or older state.

## Core Principle

Card-level freshness hints are optional clarity, not a second global clock.

Use them only when they improve local understanding of a card’s state without
repeating the same timing information everywhere.

## Recommended Default

Summary cards may show a small freshness hint when:

- the card summarizes a state slice that can meaningfully age independently
- the main dashboard freshness label is too far away to help local reading
- the card’s content can look stale without a local cue

Examples:

- a card summarizing queue state
- a card summarizing runtime or lock state

## Recommended Format

Keep the hint lightweight:

- small relative text
- low-emphasis freshness badge
- or a subtle `updated` line

Do not turn each card into a timestamp panel.

## Scope Rule

Card freshness hints should summarize only that card’s meaningful data surface.

Do not imply that the whole dashboard is equally fresh just because one card
updated recently.

## Usefulness Rule

Prefer card-level hints when:

- cards can age at different rates
- users need local trust cues
- the card can be misunderstood without freshness context

Avoid them when:

- the global last-updated label already gives enough signal
- every card would show the same time anyway
- the card is already visually dense

## Relationship To Stale State

If a card’s underlying data looks especially stale relative to the rest of the
dashboard:

- the card hint may become cautionary
- but it should not outrank blocked or needs-input system state

## Guardrails

- do not put full timestamps on every card
- do not duplicate identical freshness hints across the whole screen
- do not imply a stronger trust guarantee than the underlying data deserves
- do not let local card hints compete with global stale-state warnings

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-freshness-placement-rule`
- `define-dashboard-summary-card-stale-override-rule`
- `define-dashboard-summary-card-freshness-density-rule`
