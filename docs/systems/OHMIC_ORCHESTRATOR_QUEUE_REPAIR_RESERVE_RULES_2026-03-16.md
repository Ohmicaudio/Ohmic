# Ohmic Orchestrator Queue Repair Reserve Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how much queue-repair or refill-rescue capacity an orchestrator-heavy
stack should keep.

## Rule

An orchestrator-heavy stack should keep:

- one refill or starvation-rescue reserve slot
- one execution slot that is not sacrificed unless pressure warrants it

This preserves queue elasticity without turning the whole stack into repair
work.
