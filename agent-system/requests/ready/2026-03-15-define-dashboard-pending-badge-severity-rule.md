Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Pending Badge Severity Rule

## Goal

Define how the pending command badge should change emphasis across normal,
delayed, and possibly stale timeout tiers without implying false failure.

## Focus

- badge wording by tier
- visual severity progression
- relationship to pending warning copy

## Acceptance

- one bounded pending-badge packet exists
- it fits the timeout and warning-copy rules
- it stays lightweight and user-facing
