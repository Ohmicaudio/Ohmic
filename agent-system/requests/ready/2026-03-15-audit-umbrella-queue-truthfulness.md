Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic

# Audit Umbrella Queue Truthfulness

## Goal

Confirm the umbrella queue, done records, and active claims reflect reality.

## Why

This system breaks when the queue lies, even if the code is fine.

## Deliverable

A short queue-truth audit that checks:

- stale ready items
- stale active claims
- done records that never got moved
- queue moves left half-staged

## Constraints

- no broad planning rewrite
- accuracy only
