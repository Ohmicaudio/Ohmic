# Ohmic Queue Tier Promotion Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how tasks move from warm queued or colder reserve into the hot-ready
tier.

## Core Rule

Promotion should happen because clear conditions fired, not because someone
felt like grabbing a packet.

## Promotion Sources

Eligible sources:

- warm same-family reserve
- warm cross-family reserve
- child packets generated from a prepared parent
- colder queueable packets only when nearer reserves are insufficient

## Promotion Criteria

Promotion is justified when any of these are true:

- hot-ready is below floor
- same-family ready depth is at floor
- throughput trigger fires
- stale-board trigger fires
- manual override explicitly requests promotion

## Promotion Limits

Suggested first limits:

- do not promote more than needed to restore hot-ready toward target
- keep overflow in warm reserve when possible
- avoid promoting a whole cold wave just to fix a temporary dip

## Audit Rule

Every promotion should emit a queue refill or promotion audit event with:

- source tier
- promoted packet ids
- affected family
- trigger reason

## First Safe Implementation

The first implementation only needs:

- explicit promotion criteria
- source priority adherence
- bounded promotion count
- audit output

That is enough to make hot-ready growth predictable.
