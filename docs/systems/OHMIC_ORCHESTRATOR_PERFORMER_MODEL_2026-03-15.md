# Ohmic Orchestrator Performer Model

Date: 2026-03-15
Status: active working rule

## Purpose

Define the minimum distinction between orchestration and execution so the system
does not end up with everyone planning or everyone freelancing.

## Core Model

### Orchestrator

The orchestrator keeps the system navigable:

- queue stays populated
- priorities stay current
- handoff surfaces stay truthful
- new work gets split into usable next slices

There should only be one active orchestrator at a time.

### Performer

The performer keeps the system moving:

- claims a bounded task
- completes it
- verifies it
- reports what the task exposed next

There can be many performers at the same time.

### Mixed Mode

One agent may orchestrate and perform at the same time when the system is thin
or no separate orchestrator is active.

This is valid.
It is often necessary.

## Decision Rule

### If no orchestration is visible

Do this:

1. restore board health
2. refresh priorities
3. seed the next real tasks
4. then return to execution

### If orchestration is already visible

Do this:

1. trust the existing board unless it is clearly stale or misleading
2. default to execution
3. feed follow-on work back into the queue instead of rewriting the whole plan

## Visible Signs Of Active Orchestration

Treat orchestration as active when at least one of these is true:

- the ready queue is populated and current
- handoff/priority boards were updated recently enough to match queue reality
- the next work wave is already staged behind the current one
- active claims and queue state are not obviously drifting apart

If those signs are missing, orchestration is probably not active enough.

## Worker Audit Cadence

After every `3` meaningful task completions in the same work wave, a performer
should produce a short audit-and-suggestion report.

Minimum contents:

- tasks completed
- tasks newly exposed
- stale priorities or stale queue items
- blockers or risks that should be surfaced

Acceptable destinations:

- a ready-task replenishment pass
- a handoff board refresh
- a short audit note in the umbrella repo

## Anti-Patterns

Do not:

- have multiple agents all reshaping the board at once
- keep executing for a long time without feeding the queue
- hide new follow-on work only in chat
- treat orchestration as a substitute for execution
- treat execution as an excuse to ignore stale board state

## Outcome Standard

A healthy system should usually look like this:

- one visible orchestrator, or one agent temporarily covering that role
- multiple performers executing real work
- periodic worker audits feeding back into the board
- the queue staying slightly ahead of the work instead of lagging behind it
