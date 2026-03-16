Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Worker Priority Fallback And Escalation Rules

## Goal

Define how workers should pick primary work, fall back when blocked, and
escalate when scope, trust, or budget boundaries are exceeded.

## Focus

- worker priority classes
- preferred task families
- fallback ordering
- escalation thresholds
- trust-tier restrictions
- collision and blocked-task behavior

## Acceptance

- worker priority and fallback order are explicit
- escalation triggers are explicit
- blocked workers can continue usefully without random thrash
