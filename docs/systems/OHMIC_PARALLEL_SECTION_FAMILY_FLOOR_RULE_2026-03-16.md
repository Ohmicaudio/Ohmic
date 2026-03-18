# Ohmic Parallel Section Family Floor Rule

Date: 2026-03-16
Project: ohmic

## Purpose

Define the minimum number of parallel section families that must stay alive
with runway before the board can be treated as healthy.

## Core Rule

Healthy execution requires `2` parallel section families alive with runway.

One surviving family is a pressure state, not a healthy steady state.

## Definitions

- `parallel_section_family_floor` = `2`
- `single_family_emergency_mode` = explicit mode used only when the board is
  intentionally operating with one surviving family
- `blocked_parallel_family_count` = number of candidate sibling families that
  cannot currently provide runway because they are blocked

## Availability Rule

A family counts as alive with runway when either is true:

- it has at least the balanced minimum runway
- it is protected by an explicit blocked-family or emergency-mode exception

Balanced minimum runway means:

- `1` active wave
- `2` hot-ready same-family successors
- `1` staged successor wave

## Exception Rule

One-family execution is allowed only when:

- `single_family_emergency_mode` is explicit
- or all other candidate parallel families are blocked

Neither exception should be reported as fully healthy.

## Routing Effect

When the floor is broken:

- route refill and promotion toward restoring the missing family first
- avoid expanding unrelated optional families
- treat one-family survival as continuity protection, not normal capacity

## Reporting Fields

The floor rule should be reported with:

- `parallel_section_family_count`
- `parallel_section_family_floor`
- `parallel_section_family_floor_met`
- `single_family_emergency_mode`
- `blocked_parallel_family_count`
- `reported_at`

## First Safe Interpretation

This rule is descriptive first.

It makes the difference between healthy parallel execution and one-family
survival explicit so the board stops treating both states as equivalent.
