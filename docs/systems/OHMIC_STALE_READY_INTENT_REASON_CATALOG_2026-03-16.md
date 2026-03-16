# Ohmic Stale Ready Intent Reason Catalog

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable reason catalog used when a ready item is intentionally stale
or superseded.

## Catalog

- `superseded_by_grouped_wave`
- `intentionally_stale_until_promotion`
- `demotion_pending`
- `active_family_reserve_protection`
- `operator_hold`

## Use Rule

The catalog should be reused by:

- intentionally stale or superseded ready reports
- worker-facing churn summaries
- later queue-truth reconciliation

## Non-Goal

This catalog does not explain every possible queue anomaly.

It only covers deliberate stale-ready states.
