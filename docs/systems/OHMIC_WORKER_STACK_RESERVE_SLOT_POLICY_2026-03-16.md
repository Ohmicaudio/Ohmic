# Ohmic Worker Stack Reserve Slot Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define which reserve slots a worker stack should keep available.

## Default Reserve Slots

- `1` fallback slot
- `0-1` verification slot
- `0-1` maintenance slot

The worker should not keep several hidden reserve items in each class.

## Rule

Reserve slots exist to keep progress smooth when the primary blocks, not to
quietly hold extra objectives.
