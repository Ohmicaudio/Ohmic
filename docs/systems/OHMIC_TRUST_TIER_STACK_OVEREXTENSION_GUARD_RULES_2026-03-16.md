# Ohmic Trust Tier Stack Overextension Guard Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define when a worker stack has grown beyond what its trust tier should safely
carry.

## Core Rule

Lower-trust workers should carry shallower, tighter stacks than higher-trust
workers.

## Guard Levels

### Soft Breach

Use when a worker is above its preferred stack depth but still inside the hard
maximum.

Response:

- stop adding new follow-ons
- prefer same-family completion or fallback trimming

### Hard Breach

Use when a worker is above its hard maximum or is mixing too many unrelated
families.

Response:

- do not add more queue work
- spill work back to the queue
- escalate if trimming would hide active intent

## Trust-Tier Guidance

- fresh tiers: keep stacks narrow and mostly single-family
- mid tiers: may hold one bounded cross-family fallback
- high tiers: may carry one cross-cutting maintenance or reconciliation slot

## Non-Goal

This is not an excuse for infinite personal backlog. The stack is a local
execution frame, not a private queue.
