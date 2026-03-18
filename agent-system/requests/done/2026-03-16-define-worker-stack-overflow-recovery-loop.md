Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
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
Claim ID: 20260316T101814Z-dc6366f5

## Result

Defined the bounded overflow recovery loop that trims stack depth before escalation.
