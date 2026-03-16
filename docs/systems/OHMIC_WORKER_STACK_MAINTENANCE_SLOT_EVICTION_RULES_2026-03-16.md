# Ohmic Worker Stack Maintenance Slot Eviction Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define when the maintenance slot should be dropped from a worker stack.

## Eviction Triggers

- a stronger same-family follow-on appears
- the worker hits stack pressure
- the maintenance slice is no longer adjacent to the active lane
- the maintenance slice has gone stale or redundant

## Rule

The maintenance slot is the first reserve slot to evict when the stack needs to
tighten.
