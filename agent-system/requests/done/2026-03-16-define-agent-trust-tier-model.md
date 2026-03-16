Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T030811Z-2cbb8723

# Define Agent Trust Tier Model

## Goal

Define explicit trust tiers for agents and models so fresh agents are not
treated as fully trusted before they earn it in live work.

## Focus

- fresh tier
- route-learning tier
- trusted performer tier
- trusted orchestrator tier

## Acceptance

- trust tiers are explicit
- permissions and expectations differ by tier
- the system stops assuming every fresh agent starts trustworthy

## Result

- defined the shared permission ladder in
  `docs/systems/OHMIC_AGENT_TRUST_TIER_MODEL_2026-03-16.md`
- separated `fresh`, `route_learning`, `trusted_performer`, and
  `trusted_orchestrator` into explicit operating tiers with different allowed
  work and escalation expectations
- made the tier model apply independently to workers and model routes so trust
  does not leak from one surface to another
