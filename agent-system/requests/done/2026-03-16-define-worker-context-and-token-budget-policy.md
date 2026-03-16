Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T024342Z-6996bc9a

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

## Result

- defined the budget model in
  `docs/systems/OHMIC_WORKER_CONTEXT_AND_TOKEN_BUDGET_POLICY_2026-03-16.md`
- set target usage, soft ceiling, hard ceiling, and output reserve as explicit
  worker planning layers instead of ad hoc guesswork
- tied token usage to split triggers, rolling rework, and correctness so
  bigger context stops masquerading as better work by default
