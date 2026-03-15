# Ohmic Dashboard Freshness Timestamp Format Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when the dashboard should use relative freshness text versus exact
timestamp detail in its last-updated surfaces.

## Core Principle

Relative time is best for primary readability.
Exact time is best for secondary precision.

Use each where it helps instead of forcing one format everywhere.

## Primary Format Rule

Use relative freshness in primary visible labels:

- `Updated just now`
- `Updated 18s ago`
- `Updated 3m ago`

This should be the main default presentation.

## Secondary Format Rule

Use exact timestamp detail only in lower-emphasis contexts:

- hover
- expanded details
- debug/inspection views

Do not make the primary label a full raw timestamp string.

## Rollover Rule

Relative time should roll over naturally:

- seconds -> minutes
- minutes -> hours

Keep the display simple rather than over-precise.

## Stale-State Rule

When stale-state is active:

- retain the freshness age
- allow wording to become cautionary

Examples:

- `Updated 6m ago`
- `State may be stale`

## Guardrails

- do not force users to parse long timestamps in the main view
- do not hide exact timing entirely when inspection needs it
- do not make freshness formatting louder than blocked or needs-input state
- do not over-update wording so fast that it flickers distractingly

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-relative-time-rollover-rule`
- `define-dashboard-last-updated-label-rule`
- `define-dashboard-summary-card-freshness-hint-rule`
