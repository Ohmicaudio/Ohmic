# Ohmic Section Runway Depth Target Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define the target runway depth for an active section family across active,
hot-ready, and staged successor layers.

## Balanced Profile

Balanced runway per active family is:

- `1` active wave
- `2` hot-ready same-family successors
- `1` staged successor wave

This is the minimum healthy runnable runway, not a luxury surplus.

## High-Throughput Adjustment

High-throughput families may raise their runway to:

- `1` active wave
- `3` hot-ready same-family successors
- `2` staged successor waves

Use the higher target when recent throughput suggests the balanced runway can
be consumed before the next refill pass.

## Pressure Interpretation

Balanced runway should still emit a warning when it is merely being preserved.

Warning state begins when either is true:

- `hot_successor_count` is `2`
- `staged_successor_count` is `0`

Refill-required begins when either is true:

- `hot_successor_count` is `1`
- drain prediction says the family will run out before the next refill pass

## Target Fields

The model should be expressible with:

- `active_wave_target`
- `hot_successor_target`
- `staged_successor_target`
- `hot_successor_warning_threshold`
- `hot_successor_refill_required_threshold`
- `staged_successor_warning_threshold`

## Cross-Doc Consistency

This target model is intentionally aligned with:

- queue family reserve floors
- same-family refill trigger thresholds
- section successor staging rules

## First Safe Interpretation

If a family only has the balanced minimum runway, the board is still runnable,
but the system should already be preparing or surfacing refill pressure.
