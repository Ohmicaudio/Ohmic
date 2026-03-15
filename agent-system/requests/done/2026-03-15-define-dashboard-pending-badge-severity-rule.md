Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T142139Z-2ed2db1d

# Define Dashboard Pending Badge Severity Rule

## Goal

Define how the pending command badge should change emphasis across normal,
delayed, and possibly stale timeout tiers without implying false failure.

## Focus

- badge wording by tier
- visual severity progression
- relationship to pending warning copy

## Acceptance

- one bounded pending-badge packet exists
- it fits the timeout and warning-copy rules
- it stays lightweight and user-facing

## Outcome

Completed on 2026-03-15.

Result:

- defined a four-tier pending badge severity ladder that mirrors the timeout and
  warning-copy contract
- kept the badge distinct from blocked/error states while still escalating
  visibility as delay grows
- fixed short badge labels that work on compact surfaces without inventing new
  state names

## Artifact

- `docs/systems/OHMIC_DASHBOARD_PENDING_BADGE_SEVERITY_RULE_2026-03-15.md`
