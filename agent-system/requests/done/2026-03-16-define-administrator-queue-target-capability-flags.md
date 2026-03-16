Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T045427Z-e61b34ed

# Define Administrator Queue Target Capability Flags

## Goal

Define optional capability flags that distinguish queue targets beyond their
labels and allowed actions.

## Focus

- user-visible capability hints
- internal-only targets
- escalation-capable targets
- approval-gated targets
- future multi-operator visibility hints

## Acceptance

- one capability-flag packet is explicit
- queue targets can grow richer without rewriting the base registry

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_QUEUE_TARGET_CAPABILITY_FLAGS_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_QUEUE_TARGET_CAPABILITY_FLAGS_2026-03-16.md) with the first stable capability flag vocabulary for route targets.
