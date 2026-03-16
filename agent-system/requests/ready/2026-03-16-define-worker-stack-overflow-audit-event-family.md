Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
