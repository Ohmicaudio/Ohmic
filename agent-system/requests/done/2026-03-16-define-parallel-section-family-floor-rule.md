Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

# Define Parallel Section Family Floor Rule

## Goal

Define the minimum number of parallel section families that should stay alive on
the board during active execution.

## Focus

- two-family minimum
- blocked-family exception
- single-family emergency mode
- worker routing effects
- queue health reporting

## Acceptance

- one parallel-family-floor packet is explicit
- queue health stops treating one surviving family as fully healthy

## Result

- defined the floor rule in
  `docs/systems/OHMIC_PARALLEL_SECTION_FAMILY_FLOOR_RULE_2026-03-16.md`
- locked healthy parallel execution to two live section families with explicit
  emergency and blocked-family exceptions
