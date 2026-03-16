# Ohmic Queue Pressure Status Band Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define one shared status-band vocabulary for queue headroom, family pressure,
refill urgency, and dashboard surfaces.

## Core Rule

Queue-health surfaces should reuse the same band labels.

They should not invent local severities for the same underlying pressure
state.

## Shared Bands

Suggested first shared bands:

- `healthy`
- `watch`
- `pressure`
- `critical`

## Global Meaning

### `healthy`

- hot-ready is above floor and near target
- same-family floors are met
- refill age is within normal cadence

### `watch`

- hot-ready is below target but above floor
- or one family is narrowing toward floor

### `pressure`

- hot-ready is at or near floor
- or one active family is at floor with limited warm reserve

### `critical`

- hot-ready breaches floor hard
- or same-family ready is below floor with no fast refill path

## Threshold Ownership

Band assignment should come from queue-health evaluation logic, not from
individual cards or shell modules.

Cards and shell modules should consume:

- `status_band`
- `derived_flags[]`

## Scope Rule

The same band vocabulary should work for:

- global board health
- same-family pressure
- refill urgency summaries
- queue-capacity dashboard cards

## First Safe Implementation

The first implementation only needs:

- one shared band vocabulary
- one evaluation owner
- reuse across global and family contexts

That is enough to stop queue-health surfaces from drifting semantically.
