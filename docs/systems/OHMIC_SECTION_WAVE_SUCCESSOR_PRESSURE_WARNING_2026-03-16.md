# Ohmic Section Wave Successor Pressure Warning

Date: 2026-03-16
Project: ohmic

## Purpose

Define the warning emitted when an active section family is running out of hot
or staged successors.

## Warning Shape

`section_wave_successor_pressure_warning`

Required fields:

- `family_id`
- `hot_successor_count`
- `staged_successor_count`
- `warning_level`
- `refill_trigger_required`
- `reported_at`

## Threshold Rule

Emit `warning` when either is true:

- `hot_successor_count` is `2`
- `staged_successor_count` is `0`

Emit `critical` when either is true:

- `hot_successor_count` is `1`
- the family is predicted to drain before the next refill pass

## Refill Rule

`refill_trigger_required` should be `true` in `critical` state and may already
be `true` in `warning` state when the family is the only surviving active lane
or a staged successor is missing.

## Worker Visibility

Workers should be able to tell at a glance:

- whether the family is at runway floor
- whether staged reserve has already collapsed
- whether the warning is only visibility or already requires refill action
