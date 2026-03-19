status: blocked
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Worker Stack Overflow Spillback Rules

## Goal

Define what happens when a worker's routed stack exceeds the preferred or
allowed depth.

## Focus

- spillback to global queue
- reserve slot protection
- overflow ordering
- stale local stack trimming
- auditability

## Acceptance

- one spillback packet is explicit
- expanded worker stacks stay bounded and reversible

