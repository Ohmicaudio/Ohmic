Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Worker Stack Overflow Recovery Loop

## Goal

Define the steps that should happen after stack overflow is detected until the
worker returns to a stable in-range stack.

## Focus

- detection
- spillback
- protected-slot check
- local reconciliation
- stable-state confirmation

## Acceptance

- one overflow-recovery packet is explicit
- overflow handling gets a repeatable recovery loop
