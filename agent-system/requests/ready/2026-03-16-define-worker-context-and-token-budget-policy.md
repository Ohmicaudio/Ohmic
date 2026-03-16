Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Worker Context And Token Budget Policy

## Goal

Define how expected context length, token budget, output reserve, and rolling
usage should be planned per worker so large tasks are split before they blow up
quality.

## Focus

- target context usage
- hard context ceiling
- reserved completion tokens
- expected task input size
- rolling usage by worker and task family
- efficiency vs correctness tracking

## Acceptance

- per-worker context and token budgets are explicit
- tasks can be split before context overflow
- token usage can be compared against correctness and rework
