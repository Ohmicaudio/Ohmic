# Ohmic Section Wave Successor Staging Rule

Date: 2026-03-16
Project: ohmic

## Purpose

Define when successor packets should be staged behind an active section wave so
the family does not collapse before the next refill.

## Core Rule

Successor staging starts before depletion, not after collapse.

## Trigger Conditions

Stage the next successor wave when either is true:

- the family is down to its final `2` hot-ready successors
- recent throughput suggests the remaining hot layer can be consumed before the
  next refill pass

## Minimum Successor Posture

Every active family should try to preserve:

- at least `1` hot-ready successor packet
- at least `1` staged successor wave

## High-Throughput Adjustment

High-throughput families should stage additional reserve earlier instead of
waiting for the balanced floor to be consumed.

## Exceptions

Defer staging only when:

- the family is intentionally closing out
- all reasonable successor work is blocked
- `single_family_emergency_mode` is active and the board is protecting a
  surviving lane rather than expanding it

## Relationship To Refill

Staging a successor does not replace refill.

It is the minimum continuity action that should happen before the family falls
to one remaining hot-ready packet.
