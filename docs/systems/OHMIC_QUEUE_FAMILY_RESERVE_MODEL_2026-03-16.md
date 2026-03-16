# Ohmic Queue Family Reserve Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define how much near-term reserve each active work family should keep so fast
lanes do not consume their final follow-on packet and collapse into starvation.

## Core Rule

Reserve should be measured per active family, not only globally.

The board can look healthy overall while one high-throughput family is already
out of runway.

## Reserve Layers

Suggested family reserve layers:

- `hot_same_family`
- `warm_same_family`
- `cold_family_backup`

Meaning:

- hot same-family = immediately claimable siblings
- warm same-family = near-term reserve ready for fast promotion
- cold family backup = parent packets or future grouped packets held below warm

## Minimum Guidance

Suggested starting minimums for active families:

- hot same-family floor: `2`
- warm same-family reserve: `3-5`
- cold family backup: at least `1` coherent parent or grouped reserve packet

For high-throughput or bursty families:

- hot same-family floor: `3`
- warm same-family reserve: `4-6`

## Priority Rule

Family reserve depth should depend on:

- current worker count in that family
- recent throughput
- refill latency
- cost of context-switching away from that lane

The reserve model is allowed to be asymmetric across families.

## Cross-Family Balance Rule

The system should not hoard reserve in one family while other active families
have no runway at all.

When reserve is scarce:

- protect at least one reserve anchor for every active family
- only deepen one family after the other active families have a survival floor

## Reserve Consumption Rule

A family should be considered under pressure when either is true:

- hot same-family count is at floor
- warm same-family reserve is down to `1`

At that point the system should prioritize family refill over unrelated
optional expansion.

## First Safe Implementation

The first implementation only needs:

- per-family hot floor
- per-family warm reserve count
- one backup parent/group packet expectation
- cross-family balance guidance

That is enough to stop active lanes from consuming their last coherent reserve.
