Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T023806Z-dd277d51

# Define User Intervention And Override Rules

## Goal

Define how the user or operator can pause, redirect, reprioritize, reopen, or
accept work so intervention is first-class and auditable without turning normal
operation into chaos.

## Focus

- pause and resume
- reroute and reassign
- force fallback
- reopen and accept-as-is
- override audit depth
- operator authority boundary
- override event logging

## Acceptance

- user intervention paths are explicit
- override events are auditable
- operator steering can coexist with worker autonomy

## Result

- defined the intervention model in
  `docs/systems/OHMIC_USER_INTERVENTION_AND_OVERRIDE_RULES_2026-03-16.md`
- made pause, resume, reroute, reassign, fallback, reopen, accept-as-is, and
  audit-depth overrides explicit and auditable
- set the authority boundary so operator steering wins cleanly without erasing
  worker autonomy or queue truth
