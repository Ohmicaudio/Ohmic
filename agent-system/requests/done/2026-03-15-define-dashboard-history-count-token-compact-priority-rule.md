Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T151434Z-c05493ba

# Define Dashboard History Count Token Compact Priority Rule

## Goal

Define which compact count presentation should be preferred first when the
history toggle needs to save horizontal space.

## Focus

- compact presentation ordering
- abbreviation vs simplification preference
- readability priorities

## Acceptance

- one bounded count-compact-priority packet exists
- it fits the history count token rules
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the preferred compacting order as normal token, compact abbreviation,
  then truncation
- anchored the compact path to readability instead of arbitrary layout whims
- aligned the rule to the earlier width, abbreviation, and truncation packet

## Artifact

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_COMPACT_PRIORITY_RULE_2026-03-15.md`
