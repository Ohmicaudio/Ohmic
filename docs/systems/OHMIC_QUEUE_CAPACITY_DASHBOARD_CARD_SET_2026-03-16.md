# Ohmic Queue Capacity Dashboard Card Set

Date: 2026-03-16
Project: ohmic

## Purpose

Define the minimum shared card set that should expose queue-capacity health in
administrator or shared-runtime dashboards.

## Core Rule

The first dashboard should show a small coherent card family instead of a long
pile of unrelated queue numbers.

## Required Cards

### 1. Headroom Card

Fields:

- hot-ready count
- warm reserve count
- status band

### 2. Family Pressure Card

Fields:

- most pressured family
- same-family ready count
- warm reserve count
- family status band

### 3. Refill Cadence Card

Fields:

- last refill time
- refill age minutes
- refill urgency band

### 4. Worker Load Card

Fields:

- active claims
- active-worker-to-ready ratio
- active-worker-to-same-family ratio

## Card Ordering

Suggested first order:

1. headroom
2. family pressure
3. refill cadence
4. worker load

## First Safe Implementation

The first implementation only needs:

- four cards
- shared status-band propagation
- no deep drilldowns

That is enough to expose queue-capacity health coherently.
