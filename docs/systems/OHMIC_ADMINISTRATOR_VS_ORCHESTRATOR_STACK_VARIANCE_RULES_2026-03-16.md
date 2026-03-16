# Ohmic Administrator Vs Orchestrator Stack Variance Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stack-shape differences between administrator-heavy and
orchestrator-heavy workers.

## Administrator Heavy

Administrator-heavy workers should bias toward:

- adjacent policy and routing continuity
- filing and review support
- controlled policy-cluster spillback

## Orchestrator Heavy

Orchestrator-heavy workers should bias toward:

- queue-repair reserve capacity
- refill and starvation rescue rotation
- balancing queue repair against active execution

## Shared Rule

Both are hybrid workers, but they should not optimize for the same local stack
composition.
