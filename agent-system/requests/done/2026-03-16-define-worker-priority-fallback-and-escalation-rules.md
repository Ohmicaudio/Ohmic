Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T024055Z-3b5d4a97

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

## Result

- defined the worker decision ladder in
  `docs/systems/OHMIC_WORKER_PRIORITY_FALLBACK_AND_ESCALATION_RULES_2026-03-16.md`
- made active work, same-lane ready work, adjacent support work, safe
  maintenance, and escalation a clear ordered stack
- tied the rules to trust tiers, claims, blocked-task behavior, and operator
  overrides so fallback stays useful instead of random
