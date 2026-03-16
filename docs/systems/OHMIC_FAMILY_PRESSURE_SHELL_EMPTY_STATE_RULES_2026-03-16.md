# Ohmic Family Pressure Shell Empty State Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how the family-pressure shell should behave when there is nothing urgent
to show.

## Empty Variants

### `healthy_clear`

Use when the queue is fresh, no pressured families are present, and headroom is
above the current floor.

Display:

- title: `No queue pressure alerts`
- body: explain that the queue currently has enough headroom

### `no_active_family`

Use when there is no meaningful focus family in the runtime snapshot.

Display:

- title: `No active family focus`
- body: explain that the runtime can still show global headroom even without a
  current family lane

### `stale`

Use when any queue-health input summary is stale.

Display:

- title: `Queue pressure may be stale`
- body: ask for a refresh before trusting the empty result

## Non-Goal

The shell should not render a blank panel just because there are no alert rows.
Empty-safe states are part of the contract.
