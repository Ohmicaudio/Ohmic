# Ohmic Active Vs Ready Folder Reconciliation Rule

Date: 2026-03-16
Project: ohmic

## Purpose

Define how the system reconciles task status with physical folder placement
when active packets remain in `ready/`.

## Core Rule

Status truth beats folder path.

A packet stored in `ready/` but marked active under claim should not be treated
as available headroom.

## Reconciliation Priority

Suggested priority order:

1. explicit request status metadata
2. active claim linkage
3. folder path as secondary signal

Folder path alone should not override a more specific active-state signal.

## First Safe Implementation

The first implementation only needs:

- status precedence over folder path
- active-claim override
- reconciliation visibility for mismatches

That is enough to keep runtime truth aligned with operator interpretation.
