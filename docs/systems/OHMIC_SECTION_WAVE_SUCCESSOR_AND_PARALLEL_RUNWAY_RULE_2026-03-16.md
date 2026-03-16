# Ohmic Section Wave Successor And Parallel Runway Rule

Date: 2026-03-16
Project: ohmic

## Purpose

Define how the queue should treat large coherent work sections so active work
does not hide the fact that the board is about to run empty.

## Core Rule

If a family is large enough to behave like one section, wave, service block, or
coherent action family, the system should stage successors ahead of completion.

Active work is not the same thing as reserve.

## Minimum Section Runway

For an active section family, aim to keep:

- `1` active section packet
- `1` hot-ready successor packet
- `1` additional warm or staged successor packet

This is the minimum healthy runway for a family that is currently being worked.

## Claimed Packets Do Not Count As Reserve

Rules:

- active packets do not satisfy hot-ready reserve
- claimed packets do not count as successor runway
- a board that only has currently claimed section packets is already starving

This prevents the system from mistaking visible activity for healthy depth.

## Parallel Family Rule

When practical, keep at least `2` parallel active section families alive with
runway behind them.

Meaning:

- Family A should have an active packet plus successors
- Family B should have an active or hot-ready packet plus successors

This gives the system:

- fallback if one family blocks
- smoother worker routing
- less sudden queue collapse

## Section Wave Bias

When many packets obviously belong to one coherent action or service family,
prefer:

- grouped section waves
- family bursts
- parent/child packet framing

over:

- isolated unrelated singles
- one-packet survival refills

This keeps the board more truthful and usually more coherent.

## Refill Timing Rule

Successor staging should happen:

- before the current section completes
- when the family runway drops toward its minimum
- when active workers are about to consume the last hot-ready sibling

Do not wait for depletion before creating the next section.

## Reporting Rule

Queue health should report:

- active section families
- hot-ready successors per family
- staged successors per family
- whether the two-family parallel runway rule is being met

## Non-Goal

This rule does not say every initiative needs giant bursts.

It says large coherent families should be treated like families, not like one
lonely task at a time.

## Immediate Follow-On

This rule should feed:

1. section wave successor staging rule
2. parallel section family floor rule
3. section runway depth target model
4. queue health reporting updates
