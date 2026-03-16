# Ohmic Same Family Pressure Rollup Projection

Date: 2026-03-16
Project: ohmic

## Purpose

Define the projection shape that rolls same-family queue pressure into a
compact runtime and dashboard-friendly record.

## Suggested Row

`SameFamilyPressureRollup`

Minimum fields:

- `family_id`
- `same_family_ready_count`
- `warm_family_reserve_count`
- `active_worker_count`
- `active_worker_to_same_family_ratio`
- `status_band`
- `derived_flags[]`

## First Safe Implementation

The first implementation only needs one compact row per active family with
count, ratio, band, and flags.
