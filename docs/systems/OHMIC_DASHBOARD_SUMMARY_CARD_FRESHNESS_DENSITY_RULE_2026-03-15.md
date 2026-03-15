# Ohmic Dashboard Summary Card Freshness Density Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how many summary cards may show freshness hints at once before the page
starts repeating itself and losing readability.

## Core Principle

Freshness hints are useful in moderation.

Too many simultaneous hints turn one trust signal into wallpaper.

## Recommended Density Rule

At any given time:

- only a minority of summary cards should show freshness hints by default

Recommended default:

- `1` to `3` cards depending on dashboard density

Not every card should display freshness at once.

## Selection Priority Rule

Prefer freshness hints on cards where:

- data can age independently
- local trust matters materially
- stale reading could cause wrong interpretation

Lower priority for hints:

- cards whose freshness always mirrors the global label
- cards already carrying stronger priority/status messaging

## Small-Surface Rule

On smaller layouts:

- show fewer card freshness hints
- favor the most trust-critical card only

## Global Relationship Rule

If the main dashboard last-updated label already gives sufficient trust context:

- reduce the number of active card-level freshness hints

If a global stale/blocked condition dominates:

- card-level density should drop further

## Guardrails

- do not let every card show a freshness hint simultaneously
- do not hide all local trust cues when a few would genuinely help
- do not use density rules to suppress the one card where staleness matters most
- do not make density depend on arbitrary symmetry instead of usefulness

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-freshness-priority-order-rule`
- `define-dashboard-summary-card-freshness-suppression-rule`
- `define-dashboard-summary-card-freshness-hint-rule`
