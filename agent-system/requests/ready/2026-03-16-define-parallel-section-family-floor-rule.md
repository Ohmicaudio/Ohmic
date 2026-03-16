Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
