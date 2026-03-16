Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T031450Z-b32733d7

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

## Result

- defined the boundary in
  `docs/systems/OHMIC_GLOBAL_VS_WORKER_QUEUE_BOUNDARY_2026-03-16.md`
- made the global queue the canonical lifecycle source while the worker stack
  remains a local execution view
- separated task truth, claim protection, and worker-local selection so
  completion and reporting can reconcile cleanly across several workers
