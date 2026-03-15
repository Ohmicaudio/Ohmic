Status: working_plan
Date: 2026-03-15
Project: ohmic

# Ohmic Shared System Repair Queue

## Purpose

Turn the shared-system consistency audit into one ordered repair queue instead
of a loose collection of system chores.

## Priority Rule

This repair queue is important, but it does not outrank the current top
`ohmic-audio-labs` implementation slices unless coordination defects are
actively blocking safe work.

That means:

- claim/schema repair can jump sooner if overlap safety is compromised
- snapshot repair can jump sooner if generated state is causing active routing
  mistakes
- broader simplification stays below current app completion pressure

## Repair Order

### 1. Normalize shared claim file schema and repair live claims

Task:

- `2026-03-15-normalize-shared-claim-file-schema-and-repair-live-claims`

Why first:

- mixed live claim schemas undermine overlap detection
- this is the most direct coordination-safety defect

### 2. Repair generated agent-state freshness and staleness detection

Task:

- `2026-03-15-repair-generated-agent-state-freshness-and-staleness-detection`

Why second:

- stale generated state makes the queue and claim picture misleading
- fixing claim parsing without freshness repair still leaves false dashboards

### 3. Build shared agent-system validator

Task:

- `2026-03-15-build-shared-agent-system-validator`

Why third:

- once the core schema and snapshot issues are repaired, the validator helps
  keep them repaired

### 4. Design the cross-platform agent-system CLI path

Task:

- `2026-03-15-design-cross-platform-agent-system-cli-path`

Why fourth:

- the current system is too dependent on PowerShell-only happy paths
- this is the structural fix, but not the first emergency fix

### 5. Reduce shared-system control-surface duplication

Task:

- `2026-03-15-reduce-shared-system-control-surface-duplication`

Why fifth:

- simplification matters
- but it should follow correctness and tooling repair

## Done Condition

The shared system repair queue can be considered meaningfully complete when:

- active claims use one schema only
- generated state is either fresh or visibly stale
- one validator can catch the main integrity failures
- there is a concrete cross-platform tooling path
- the system no longer depends on informal board duplication for routine truth
