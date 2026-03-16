# Ohmic Queue Refill Urgency Score Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define a compact urgency score that expresses how badly a queue or family needs
refill attention.

## Core Rule

Urgency should compress multiple pressure signals into one sortable output.

## Suggested Inputs

- global floor pressure
- same-family floor breach
- refill age
- active-worker imbalance
- warm reserve exhaustion
- operator override

## Suggested Output

Minimum fields:

- `urgency_score` (`0-100`)
- `urgency_band`
- `primary_reason`
- `scope` (`global` or `family`)

## First Safe Implementation

The first implementation only needs:

- score from a small weighted input set
- mapped urgency band
- one primary reason

That is enough to rank refill attention coherently.
