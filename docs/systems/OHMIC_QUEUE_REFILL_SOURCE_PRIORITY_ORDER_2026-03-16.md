# Ohmic Queue Refill Source Priority Order

Date: 2026-03-16
Project: ohmic

## Purpose

Define the order in which the system should pull refill material from hot,
warm, and colder queue sources when the board needs more capacity.

## Core Rule

Refill should prefer the nearest truthful source first.

The system should avoid overpromoting cold backlog when warm same-family reserve
or prepared burst parents already exist.

## Priority Order

Suggested refill source order:

1. warm same-family reserve
2. warm cross-family reserve
3. prepared parent packet for same-family burst generation
4. prepared parent packet for adjacent family burst generation
5. colder backlog only after warm and parent sources are insufficient

## Same-Family Preference Rule

If an active family is below floor, same-family reserve should beat generic
global refill in almost all cases.

That keeps continuity and prevents lane collapse.

## Parent Packet Rule

When warm reserve is thin but a coherent parent packet exists, the system
should prefer promoting or splitting that parent instead of mining unrelated
backlog.

## Stale Ready Replacement Rule

When replacing stale or obsolete hot-ready tasks:

- first look for warm siblings
- then look for fresh same-family children
- only then use unrelated cross-family packets

## Manual Override Rule

Manual override may change source order when:

- one family is intentionally paused
- a cross-family emergency is more urgent than same-family continuity
- the operator explicitly wants broader diversity in hot-ready

## First Safe Implementation

The first implementation only needs:

- warm-before-cold priority
- same-family preference
- parent-packet preference
- documented override behavior

That is enough to make refill source selection consistent instead of
opportunistic.
