Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
