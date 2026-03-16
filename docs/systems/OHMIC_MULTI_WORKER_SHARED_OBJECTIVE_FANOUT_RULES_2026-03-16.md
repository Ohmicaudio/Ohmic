# Ohmic Multi-Worker Shared Objective Fanout Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how several workers can support the same larger initiative without
duplicate effort, hidden overlap, or claim collisions.

## Core Rule

One shared objective may fan out into several worker slices.

It should not become one infinitely shared task.

## Parent Objective Versus Child Slice

The shared objective is the parent coordination unit.

Worker-executable slices are the child units.

Rules:

- the parent objective tracks the common goal
- child slices track what each worker is actually doing
- workers should claim and report on child slices, not on the whole objective

## Why Fanout Needs Rules

Without explicit fanout rules:

- several workers grab overlapping work
- claim boundaries look random
- progress is duplicated instead of additive
- completion rollup becomes impossible to trust

The system needs one shape for parallel support that is not just "everyone edit
everything."

## Fanout Conditions

Fanout is appropriate when:

- the objective naturally splits by surface or file boundary
- slices can be verified independently
- workers can proceed with low overlap risk
- the coordination cost is lower than serial execution

Fanout is not appropriate when:

- the work is one tightly coupled edit surface
- the slices cannot be verified independently
- the same files would remain under overlapping claims

## Child Slice Requirements

Every child slice should declare:

- `parent_objective_ref`
- `slice_id`
- `owned_surface`
- `expected_output`
- `completion_condition`
- `coordination_note_ref` if needed

This makes it clear what is shared and what is worker-local.

## File-Claim Boundary

Claims should attach to the child slice's owned surface, not the whole parent
objective.

Meaning:

- each worker protects only its actual paths
- the parent objective is never used as a blanket claim
- collisions remain visible at the file or packet level

## Coordination Notes

Shared objectives should allow a lightweight coordination note so workers can
see:

- which slices already exist
- what is blocked
- what still needs split
- what assumptions are shared

This note should not replace the queue or the claims. It is a coordination aid,
not the source of truth.

## Completion Rollup

Parent objective completion should depend on child slice rollup.

Suggested states:

- `not_started`
- `in_progress`
- `partially_complete`
- `ready_for_rollup`
- `complete`

Rules:

- child slices may complete independently
- the parent objective closes only after required child slices reconcile
- one finished child does not imply the whole objective is done

## Example Fanout

```text
parent objective
-> define multi-worker queue model

child slice A
-> queue boundary contract

child slice B
-> worker stack model

child slice C
-> shared-objective fanout rules
```

This gives parallel motion without pretending all three workers share one task.

## Reporting Boundary

Reports should distinguish:

- parent objective progress
- child slice throughput
- child slice correctness

This avoids inflating performance by counting one shared objective as many full
independent wins.

## First Safe Implementation

The first implementation only needs:

1. parent objective record
2. child slice references
3. child-owned claim boundaries
4. completion rollup rule

That is enough to support safe parallelism.

## Immediate Follow-On

These rules should feed:

1. live task route training lane
2. later runtime objective/stack projections
3. remote-to-DSP planning packets when those split into control and audio lanes
