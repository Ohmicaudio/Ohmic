Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard History Reset On Stale Recovery Rule

## Goal

Define whether a major stale-state recovery or reconciliation pass should reset
expanded history back to collapsed state for clarity.

## Focus

- stale-recovery reset behavior
- relationship to state persistence
- user clarity after larger truth repairs

## Acceptance

- one bounded stale-recovery reset packet exists
- it fits the history state reset boundary rule
- it stays lightweight and dashboard-focused
