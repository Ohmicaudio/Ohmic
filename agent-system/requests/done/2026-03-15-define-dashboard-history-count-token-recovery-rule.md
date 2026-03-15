Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T151942Z-d1783e6b

# Define Dashboard History Count Token Recovery Rule

## Goal

Define how the hidden-count token should return from stronger compact fallback
back toward fuller presentation once space pressure eases.

## Focus

- recovery progression
- readability restoration
- relationship to overflow fallback and compact priority

## Acceptance

- one bounded count-recovery packet exists
- it fits the history count token rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined recovery as the reverse of collapse, one readability tier at a time
- restored abbreviation before full form instead of jumping straight from heavy
  compression to the widest token
- aligned recovery with overflow fallback so the control behaves predictably in
  both directions

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_RECOVERY_RULE_2026-03-15.md`
