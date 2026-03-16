# Ohmic Agent Model Evaluation And Reporting Model

Date: 2026-03-16
Status: working design

## Purpose

Define the evaluation and reporting layer for agents and models so task
completion is not judged only by “something changed,” but also by correctness,
sanity, and operational quality.

## Required Evaluation Families

### 1. Sanity Checks

Purpose:

- catch obvious broken states early

Examples:

- expected files exist
- required output shape is valid
- queue/task transitions are legal
- claimed task was actually moved/recorded correctly

### 2. Error Checks

Purpose:

- detect explicit failure conditions and missing verification

Examples:

- tests/builds failed
- command exited nonzero
- required verification was skipped
- outputs conflict with declared result

### 3. Task Correctness Checks

Purpose:

- measure whether a completed task is actually correct, not just completed

Examples:

- acceptance criteria mapped to verifiable checks
- result agrees with scope
- no unrelated surfaces were silently altered

### 4. Agent And Model Performance Reports

Purpose:

- measure how well agents and models are performing over time

Examples:

- tasks completed
- tasks later corrected or reopened
- verification pass rate
- blocker quality
- false-positive completion rate
- average queue replenishment contribution

## Design Rule

Reports should be tied to tasks and outcomes, not vibes.

The system should prefer:

- measurable completion
- measurable correctness
- measurable rework

over generic impressions.

## Reporting Surfaces

Recommended outputs:

- per-task correctness record
- per-agent performance rollup
- per-model rollup where model identity matters
- recent sanity/error failures log

## Relationship To Existing System

This layer should plug into:

- shared queue/tasks
- claim completion
- verification notes
- JSON dashboard/runtime summaries
- administrator/orchestrator reporting surfaces

## Immediate Next Tasks

1. define task-completion correctness report model
2. define agent sanity and error-check hook layer
3. define agent and model performance report surface
