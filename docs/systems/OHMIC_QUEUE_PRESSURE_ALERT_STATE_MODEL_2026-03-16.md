# Ohmic Queue Pressure Alert State Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable alert-state vocabulary used by queue-pressure shell surfaces.

## Alert States

- `cleared`
  No pressure rows are present and the runtime is fresh.
- `open_watch`
  Pressure is visible, but still in watch territory.
- `open_pressure`
  The queue needs refill attention soon.
- `open_critical`
  The queue is at or below safe operating floor.
- `stale`
  Inputs are stale enough that the alert surface should not be trusted.

## Escalation Hint

Pair each state with one of:

- `none`
- `watch_queue`
- `refill_now`

This hint is for shell messaging, not for automatic queue mutation.
