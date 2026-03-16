# Ohmic Worker Context And Token Budget Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define how expected context length, token budget, output reserve, and rolling
usage should be planned per worker so large tasks are split before they degrade
quality.

## Core Rule

Workers should budget context on purpose.

They should not wait until the window is nearly full before splitting work or
escalating.

## Budget Layers

Each worker should track four budget concepts:

### 1. Target Working Usage

The preferred steady-state budget where work remains comfortable and coherent.

Meaning:

- normal planning target
- where most tasks should operate

### 2. Soft Ceiling

The point where the worker should strongly prefer splitting, summarizing, or
finishing the current slice instead of widening scope.

Meaning:

- caution threshold
- rising quality risk

### 3. Hard Ceiling

The point where the worker should not keep loading new task context without a
deliberate split or escalation.

Meaning:

- stop widening
- finish, split, or escalate

### 4. Output Reserve

Tokens kept available for the actual response, patch explanation, or result
summary.

Meaning:

- prevent input greed from starving completion quality

## Recommended Planning Ratios

Use ratios rather than pretending every model and task has the same ideal
numbers.

Suggested defaults:

- target working usage: about 50% to 60% of available context
- soft ceiling: about 70%
- hard ceiling: about 80% to 85%
- output reserve: about 15% to 20%

If a worker approaches the hard ceiling, it should split work or escalate
instead of trying to squeeze one more broad task into the same window.

## Per-Task Input Expectations

Workers should estimate task shape before widening context.

Useful categories:

- `tiny`
  - one file or one short request
- `small`
  - one narrow slice with 2 to 5 directly related files
- `medium`
  - one bounded feature or contract packet
- `large`
  - multiple surfaces, many files, or mixed discovery and implementation
- `oversized`
  - should be split before execution

Large and oversized work should trigger early packeting, not heroic context
accumulation.

## Rolling Usage Tracking

Each worker should record rolling usage by:

- worker id
- task family
- project
- prompt/input volume
- output volume
- number of splits
- number of retries or rework cycles

This is more useful than one isolated token count because it shows whether a
worker is staying efficient across a lane of similar tasks.

## Efficiency Versus Correctness

Token efficiency is useful only if correctness holds.

Track at least:

- total usage for a task
- number of follow-up corrections
- number of reopen events
- number of avoidable escalations
- final accepted state

Low token use with high rework is not actually efficient.

## Split Triggers

Workers should split or summarize when any of these are true:

- the current slice would exceed the soft ceiling if widened further
- more than one unrelated domain is entering context
- large discovery and large implementation are mixing together
- many file reads are being carried forward with little reuse
- prior turns already required repeated recap to stay coherent

## Safe Split Actions

When a split is required, the worker may:

- close the current bounded task packet
- write a short reconciliation note
- queue the next packet
- escalate with a recommended next slice

The worker should not silently continue into overflow just because the task is
interesting.

## Per-Worker Policy Shape

Suggested tracked fields:

- `worker_id`
- `trust_tier`
- `preferred_task_families[]`
- `target_usage_ratio`
- `soft_ceiling_ratio`
- `hard_ceiling_ratio`
- `output_reserve_ratio`
- `recent_usage_window`
- `recent_rework_rate`

This lets the system adapt by worker role rather than pretending one budget
fits everything.

## Example Policy Shape

```json
{
  "worker_id": "worker_docs_01",
  "trust_tier": "experienced",
  "preferred_task_families": ["docs", "contracts", "queue-truth"],
  "target_usage_ratio": 0.55,
  "soft_ceiling_ratio": 0.7,
  "hard_ceiling_ratio": 0.85,
  "output_reserve_ratio": 0.18,
  "recent_usage_window": {
    "task_count": 12,
    "average_input_ratio": 0.48,
    "average_output_ratio": 0.12,
    "rework_rate": 0.08
  }
}
```

## Relationship To Worker Routing

Context and token budget policy feeds routing decisions directly.

Examples:

- if the next ready task would push the worker beyond soft ceiling, prefer a
  split
- if the active task is already near hard ceiling, do not widen into adjacent
  domains
- if repeated rework follows high usage, shrink future packet size

## Immediate Follow-On

This policy should feed:

1. task completion correctness report model
2. live task route training lane
3. agent and model performance report surface
