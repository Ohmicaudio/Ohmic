Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Multi-Worker Shared Objective Fan-Out Rules

## Goal

Define how several workers can support the same larger initiative without
duplicate effort, hidden overlap, or claim collisions.

## Focus

- parent objective vs child worker slices
- same-objective parallelism
- file-claim boundary
- coordination notes
- completion rollup

## Acceptance

- one larger objective can split cleanly across workers
- worker slices are explicit
- same-task parallelism no longer means accidental duplication
