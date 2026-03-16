Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Family Refill During Closeout Report

## Goal

Define the worker-facing report emitted when a task family is refilled during
closeout of a packet in that same family.

## Focus

- family id
- closing task id
- refill event linkage
- actor attribution
- timestamping

## Acceptance

- one closeout-refill report packet is explicit
- workers can tell healthy refill from random underfoot churn
