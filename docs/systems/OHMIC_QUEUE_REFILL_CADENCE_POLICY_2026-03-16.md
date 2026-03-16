# Ohmic Queue Refill Cadence Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define how often the system should perform refill checks and when refill should
happen immediately instead of waiting for the next normal cadence.

## Core Rule

Queue refill should run on both cadence and event pressure.

Time alone is not enough, and manual feel should not be the primary trigger.

## Baseline Cadence

Suggested first cadence:

- lightweight board check every `15 minutes`
- stronger refill review every `45 minutes`
- mandatory stale-board escalation at `90 minutes`

These checks may be manual, scripted, or dashboard-driven, but the cadence
should remain visible.

## Immediate Refill Conditions

Refill should happen immediately when:

- hot-ready count breaches floor
- same-family floor breaches
- three or more tasks close in one family without replacement
- active worker count shifts upward sharply
- warm reserve drops under survival minimum

## Completion-Count Cadence

Independent of wall time, the board should trigger refill review after:

- every `5` completed tasks globally
- every `3` completed tasks in one active family

This keeps the cadence responsive during bursts.

## Manual Override Rule

Operators may force refill early when:

- a trusted active lane is accelerating
- context-sensitive work benefits from deeper same-family continuity
- a stale-board warning is likely but has not fired yet

Manual override should emit a refill audit event.

## First Safe Implementation

The first implementation only needs:

- one normal cadence
- one stronger stale-board check
- immediate refill conditions
- completion-count cadence
- manual override allowance

That is enough to make refill timing deliberate and explainable.
