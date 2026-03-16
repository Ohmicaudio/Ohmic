# Ohmic Worker Stack Primary To Fallback Promotion Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define when a fallback task becomes the new primary task.

## Promotion Rule

Promote the fallback only when:

- the current primary is blocked or completed
- the fallback is still eligible
- no newer same-family follow-on outranks it

## After Promotion

When the fallback becomes primary:

- recalculate the stack
- choose a new fallback if needed
- drop any stale follow-on entries that no longer make sense

## Non-Goal

Promotion should be explicit, not an invisible drift where the worker silently
starts doing something else.
