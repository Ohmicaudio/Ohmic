# Ohmic Worker Stack Spillback Priority Order

Date: 2026-03-16
Project: ohmic

## Purpose

Define which local stack entries should be returned to the queue first when the
stack is too deep.

## Spillback Order

1. stale maintenance slice
2. stale verification slice
3. lowest-value follow-on
4. fallback that is no longer adjacent

## Protected Entries

Do not spill back:

- the current primary task
- the only safe fallback
- a verification slice still needed to validate the just-touched surface

## Rule

Spillback should reduce confusion, not remove the worker's only safe next move.
