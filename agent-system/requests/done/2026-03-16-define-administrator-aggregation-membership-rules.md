Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T050448Z-41e10cda

# Define Administrator Aggregation Membership Rules

## Goal

Define how intake items qualify for inclusion in one aggregation bundle.

## Focus

- source correlation
- time-window rules
- attachment grouping
- duplicate membership prevention
- cross-source grouping boundaries

## Acceptance

- one aggregation-membership packet is explicit
- bundle membership stops depending on vague operator guesswork

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_AGGREGATION_MEMBERSHIP_RULES_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_AGGREGATION_MEMBERSHIP_RULES_2026-03-16.md) with explicit thread, burst, packet, and operator-forced membership rules plus duplicate-membership protection.
