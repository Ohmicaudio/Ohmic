# Ohmic Burst Generation Family Batching Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how burst generation should batch related packets into a coherent family
instead of spraying isolated singles.

## Batching Rules

- batch siblings by the same family or lane
- keep one parent packet that explains the wave
- prefer small packets that can be finished independently
- stop batching once the hot queue has enough headroom

## Rule

Burst generation should create a manageable family slice, not a new backlog
storm.
