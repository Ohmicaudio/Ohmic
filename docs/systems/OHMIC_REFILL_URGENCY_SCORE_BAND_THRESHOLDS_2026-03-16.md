# Ohmic Refill Urgency Score Band Thresholds

Date: 2026-03-16
Project: ohmic

## Purpose

Define the score thresholds that map refill urgency into reusable bands.

## Thresholds

- `healthy`: `0-29`
- `watch`: `30-54`
- `pressure`: `55-79`
- `critical`: `80-100`

## Rule

These thresholds should stay stable across:

- queue-health runtime snapshots
- dashboard card mapping
- pressure alert shell surfaces

The first queue-health evaluator should emit the threshold set alongside the
current score so downstream consumers can render consistently.
