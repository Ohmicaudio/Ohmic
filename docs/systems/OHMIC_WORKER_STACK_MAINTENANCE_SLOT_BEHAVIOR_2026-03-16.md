# Ohmic Worker Stack Maintenance Slot Behavior

Date: 2026-03-16
Project: ohmic

## Purpose

Define what the maintenance slot is allowed to do inside a worker stack.

## Allowed Maintenance Work

- bounded queue-truth cleanup
- bounded docs-truth cleanup
- narrow runtime-truth verification

## Disallowed Maintenance Work

- broad backlog exploration
- unrelated cleanup that becomes a second objective
- permanent occupation of the stack while higher-value lane work exists

## Rule

The maintenance slot is a safe landing place, not a long-term home.
