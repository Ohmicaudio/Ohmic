Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T031246Z-cdb54d7d

# Define Per-Worker Task Stack Model

## Goal

Define how each worker should hold its own bounded stack so a global queue can
feed several workers without context overload or hidden duplication.

## Focus

- primary task
- near-term follow-ons
- fallback task
- maintenance or verification slot
- preferred vs maximum stack depth
- same-objective multi-worker fan-out shape

## Acceptance

- per-worker stack structure is explicit
- stack depth is bounded
- same-objective work can split across workers without pretending one task is
  infinitely shareable

## Result

- defined the bounded local stack in
  `docs/systems/OHMIC_PER_WORKER_TASK_STACK_MODEL_2026-03-16.md`
- separated primary work, near-term follow-ons, fallback, and maintenance into
  explicit worker-local slots instead of hidden backlog carry
- made same-objective fanout compatible with bounded worker stacks so shared
  objectives stop pretending to be infinitely shareable tasks
