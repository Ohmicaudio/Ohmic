# Ohmic Same-Family Ready Floor Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define the minimum hot-ready depth each active family should keep before that
lane is considered at risk.

## Core Rule

One remaining ready task is not a healthy active lane.

The system should treat same-family hot-ready depth as a primary operating
signal, not a nice-to-have metric.

## Suggested Floors

Default starting guidance:

- inactive family: no required floor
- active family with one worker: `2`
- active family with two workers: `3`
- active family with three or more workers: `4`

Higher-risk or burst-heavy families may justify a floor above the default.

## Warning Bands

Suggested status bands:

- `healthy`: family ready depth above floor by `2+`
- `watch`: family ready depth is `floor + 1`
- `pressure`: family ready depth equals floor
- `critical`: family ready depth below floor

## Family Emergency Rule

If a family hits `critical`, the system should:

- stop treating unrelated refill as higher priority
- promote warm same-family packets first
- generate a burst only if duplication guards and reserve rules allow it

## Exception Rule

A family may temporarily run below normal floor only when:

- the family is intentionally winding down
- the last packet is blocked on external truth
- a refill burst is already accepted and pending

That exception should still be auditable.

## First Safe Implementation

The first implementation only needs:

- floor by active worker count
- warning bands
- emergency refill expectation
- auditable exceptions

That is enough to stop same-family starvation from being mistaken for normal.
