Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Global Vs Worker Queue Boundary

## Goal

Define the boundary between the canonical global queue and the worker-specific
task stack so assignment, reporting, and queue truth stay coherent.

## Focus

- global queue as canonical truth
- worker stack as routing view
- shared-objective vs worker-slice distinction
- claim boundary vs task boundary
- reporting and completion ownership

## Acceptance

- global queue and worker stacks are clearly separated
- the system can support several workers without losing one source of truth
- completion and reporting boundaries are explicit
