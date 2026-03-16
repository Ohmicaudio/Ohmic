# Ohmic Agent And Model Performance Report Surface

Date: 2026-03-16
Project: ohmic

## Purpose

Define the reporting surface that summarizes agent and model performance based
on tasks assigned, tasks completed, correctness, and rework.

## Core Rule

Performance reporting should reward stable, correct work.

It should not reward raw closure count alone.

## Reporting Goals

The surface should help answer:

- who is taking on what kind of work
- who is completing work reliably
- which model routes are producing more rework
- where token spend is high relative to correctness
- which task families reopen or drift most often

## Non-Punitive Design Rule

The report surface should be diagnostic, not punitive.

That means it should:

- show quality and rework alongside throughput
- avoid ranking workers by closure count alone
- keep task difficulty visible
- highlight patterns worth investigation

It should not:

- shame workers for hard tasks
- optimize toward easy closures only
- collapse user-accepted weak work into "great performance"

## Recommended Report Axes

### Per-Agent Reporting

Track at least:

- tasks assigned
- tasks completed
- correctness grade mix
- reopen rate
- average scope drift
- average token usage
- rework count

### Per-Model Reporting

Where model route is known, track:

- tasks touched
- completion volume
- correctness mix
- reopen rate
- escalation rate
- average token usage
- average output reserve pressure

### Per-Task-Family Reporting

Track:

- docs
- code
- queue truth
- verification
- architecture
- cleanup

This prevents apples-to-oranges comparisons between very different work types.

## Minimal Report Objects

Suggested objects:

- `AgentPerformanceSummary`
- `ModelPerformanceSummary`
- `TaskFamilyPerformanceSummary`

Common fields:

- `period_start`
- `period_end`
- `tasks_assigned`
- `tasks_completed`
- `correctness_distribution`
- `reopen_rate`
- `rework_rate`
- `average_token_usage`
- `average_scope_adherence`

## Correctness Inputs

This surface should read from the correctness report model instead of inventing
its own idea of quality.

Important inputs:

- acceptance status
- verification evidence quality
- correctness grade
- reopen status
- scope adherence
- user acceptance state

That keeps performance reporting grounded in task outcomes rather than commit
count.

## Suggested Views

### 1. Agent Summary View

Purpose:

- show current and recent performance per worker

Useful fields:

- tasks in period
- strong versus acceptable versus uncertain closures
- reopen count
- average usage
- common task families

### 2. Model Route View

Purpose:

- compare how different model routes perform when they are used

Useful fields:

- task count
- rework rate
- average correctness
- escalation rate
- token cost per accepted task

### 3. Task Family View

Purpose:

- show where the system struggles most by work type

Useful fields:

- family
- reopen rate
- correctness mix
- scope drift
- average verification depth

### 4. Trend View

Purpose:

- show whether performance is improving or degrading over time

Useful fields:

- rolling seven-day or packet-level trend
- correctness movement
- rework movement
- token efficiency movement

## Safe Metrics

Recommended headline metrics:

- `completed_tasks`
- `strong_or_acceptable_rate`
- `reopen_rate`
- `rework_rate`
- `token_usage_per_completed_task`
- `token_usage_per_strong_task`

These show both volume and quality.

## Metrics To Treat Carefully

Use caution with:

- raw tasks completed
- raw token usage
- fastest closure time

These can easily be gamed or misread without difficulty and correctness
context.

## Minimal Example Shape

```json
{
  "agent_id": "worker_docs_01",
  "period_start": "2026-03-09T00:00:00Z",
  "period_end": "2026-03-16T00:00:00Z",
  "tasks_assigned": 18,
  "tasks_completed": 14,
  "correctness_distribution": {
    "strong": 5,
    "acceptable": 6,
    "uncertain": 3,
    "weak": 0
  },
  "reopen_rate": 0.07,
  "rework_rate": 0.14,
  "average_token_usage": 0.46,
  "average_scope_adherence": "clean"
}
```

## First Safe Implementation

The first implementation only needs:

1. one per-agent summary
2. one per-model summary where route is known
3. correctness and reopen rollups
4. token-usage rollup

That is enough to make the surface useful without pretending it is final HR
instrumentation.

## Immediate Follow-On

This report surface should feed:

1. agent graduation checkpoints
2. fresh agent restriction and escalation rules
3. Gemini initial correctness and rework review packets
