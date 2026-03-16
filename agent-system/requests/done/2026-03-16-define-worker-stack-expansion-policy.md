Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094242Z-d330879d

# Define Worker Stack Expansion Policy

## Goal

Define when workers should carry deeper routed stacks and when they should stay
shallow.

## Focus

- trusted versus fresh worker depth
- project pressure
- same-family reserve depth
- verification slot rules
- max stack limits

## Acceptance

- one stack-expansion packet is explicit
- deeper stacks become a policy choice instead of improvisation

## Result

Done. Worker stack expansion policy now lives in
`docs/systems/OHMIC_WORKER_STACK_EXPANSION_POLICY_2026-03-16.md`, defining
trust-tier ranges, expansion preconditions, reserve protection, verification
slot rules, and hard ceiling guidance.
