# Ohmic Burst Packet Generation Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how the system should generate coherent child packets in bursts when an
active lane is moving quickly and needs more than one replacement task at a
time.

## Core Rule

Fast lanes should be refilled in grouped bursts, not only one packet at a time.

Burst generation should preserve family shape and queue floor protection.

## Parent To Child Rule

Burst generation begins from one parent or reserve packet that already defines
a coherent family.

Required parent properties:

- one stable parent packet id
- one family label
- a bounded child generation surface
- no conflicting live children already occupying the same slice

The system should never invent a burst from unrelated loose tasks.

## Burst Size Guidance

Suggested first sizes:

- small refill: `2-3` children
- medium refill: `4-6` children
- heavy fast-lane refill: `6-8` children

Burst size should depend on:

- active worker count
- same-family pressure
- current warm reserve depth
- duplication risk

## Family Batching Rule

One burst should stay within one coherent family whenever possible.

Good examples:

- second-wave tuning graphics
- first-wave administrator shell modules
- same-source loudspeaker normalization slices

Avoid mixed bursts that combine unrelated initiatives just to inflate counts.

## Promotion Timing Rule

A generated burst does not need to promote every child into hot-ready
immediately.

Suggested default:

- generate full burst
- promote first `2-3` children into hot-ready
- keep the remainder in warm reserve

This keeps the hot lane fresh without bloating it.

## Duplication Guard Rule

Before child creation, the system should check for:

- existing hot-ready child packets from the same parent
- already-claimed siblings
- already-completed equivalent packets
- stale duplicate ready files

If duplication risk is real, the burst should shrink, skip those children, or
abort entirely.

## Queue Floor Protection

Burst generation should defend the queue floor, not drain reserve recklessly.

Required rule:

- never consume the last same-family reserve packet to generate one child if
  the parent can safely remain as reserve truth instead

The system should preserve one near-term reserve anchor for active families.

## Parent-Child Link Rule

Each child generated in a burst should carry:

- `parent_packet_id`
- `family_id`
- `burst_batch_id`
- `sibling_index`

That gives operators and audits enough truth to understand where the packet
came from and how it was grouped.

## First Safe Implementation

The first implementation only needs:

- stable parent packet requirement
- bounded burst sizes
- family-only batching
- duplication guards
- parent-child linkage fields

That is enough to make burst refill coherent instead of improvised.
