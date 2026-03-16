# Ohmic Wave Family Drain Prediction Signal

Date: 2026-03-16
Project: ohmic

## Purpose

Define the signal that predicts when an active wave family is likely to drain
before the next refill arrives.

## Signal Shape

`wave_family_drain_prediction_signal`

Required fields:

- `family_id`
- `active_worker_count`
- `hot_successor_count`
- `staged_successor_count`
- `completion_rate_window`
- `refill_age_minutes`
- `predicted_drain_minutes`
- `risk_band`
- `generated_at`

## Interpretation Rule

The signal should treat drain risk as a combination of:

- current same-family hot depth
- staged reserve depth
- recent task completion pace
- time since last meaningful refill

## Risk Bands

Suggested first values:

- `stable`
- `warning`
- `critical`

`critical` applies when predicted drain happens before the next refill window
or when only one hot successor remains.

## Use Rule

This signal exists to warn earlier than actual collapse.

It should feed successor-pressure warnings and refill-required decisions rather
than replacing them.
