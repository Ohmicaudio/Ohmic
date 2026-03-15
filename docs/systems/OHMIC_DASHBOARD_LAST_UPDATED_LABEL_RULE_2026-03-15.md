# Ohmic Dashboard Last Updated Label Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the dashboard should show the freshness of its current summary state
without turning timestamps into noisy chrome or forcing users to decode raw
timing details.

## Core Principle

Freshness should be visible at a glance and precise only when needed.

Show a simple relative freshness label by default, with more exact timing
available in lower-emphasis form or on demand.

## Recommended Placement

Primary placement:

- near the top of the dashboard summary or status area

Secondary placement:

- optional smaller freshness hint near the recent-output area

Do not repeat full timestamps in every card.

## Recommended Default Format

Use short relative language by default:

- `Updated just now`
- `Updated 12s ago`
- `Updated 2m ago`

This keeps the state readable without timestamp clutter.

## Exact Time Rule

Exact timestamp may appear:

- on hover
- in a secondary detail row
- or inside an expanded debug/details view

Do not make the primary label a long raw timestamp string.

## Stale-State Reaction

When stale-state indicators are active:

- the freshness label should shift from neutral to cautionary wording

Examples:

- `Updated 4m ago`
- `State may be stale`

If reconciliation later repairs the state:

- return the label to the normal freshness language

## Hidden / Background Rule

If the dashboard was hidden and has not yet refreshed on return:

- do not pretend the last update is current
- allow the label to honestly show older age until the return refresh runs

## Command Relationship Rule

The last-updated label should summarize dashboard freshness, not command status.

Do not replace pending/delayed command messaging with only a freshness stamp.

## Guardrails

- do not spam exact timestamps everywhere
- do not hide stale age behind overly cheerful copy
- do not force users to infer freshness only from output order
- do not let the label outrank blocked or needs-input state

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-freshness-timestamp-format-rule`
- `define-dashboard-stale-state-indicator-behavior`
- `define-json-dashboard-render-surface`
