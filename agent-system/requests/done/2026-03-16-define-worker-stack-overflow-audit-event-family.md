Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Worker Stack Overflow Audit Event Family

## Goal

Define the audit events emitted when a worker stack exceeds preferred or maximum
depth and spillback or trimming happens.

## Focus

- overflow detection
- spillback action
- trimmed task ids
- actor attribution
- timestamping

## Acceptance

- one overflow-audit packet is explicit
- stack overflow handling stays reviewable later
Claim ID: 20260316T101814Z-dc6366f5

## Result

Defined the overflow audit event family so stack overextension and recovery can be explained later.
