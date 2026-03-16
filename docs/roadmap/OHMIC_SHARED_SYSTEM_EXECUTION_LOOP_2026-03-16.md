Status: policy_packet
Date: 2026-03-16
Project: ohmic

# Ohmic Shared System Execution Loop

## Purpose

Lock in the rule that an active orchestrator must both keep the queue healthy
and continue completing real tasks while the queue remains above floor.

## Core Rule

Queue repair is not the end state.

Once the queue is healthy, the orchestrator should execute real work, then
re-check the board, then continue alternating between maintenance and
completion.

## Default Loop

1. measure the current ready depth
2. refill truthful tasks until the project queue floor is met
3. claim and complete one real task
4. re-check ready depth and active claims
5. refill again if the floor was lost
6. if still healthy, claim and complete the next real task

## Why This Exists

The system drifts if orchestration turns into:

- endless board grooming
- queue vanity metrics
- passive backlog gardening

The system also drifts if execution consumes the board without refreshing it.

The right loop is alternation:

- board ahead of work
- work ahead of stale planning

## Outcome Standard

An orchestrator is doing the job correctly only when:

- the queue stays above floor
- completed tasks keep happening
- new truthful follow-ons continue to appear
