Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T025534Z-1f4d07c6

# Define Fresh Agent Restriction And Escalation Rules

## Goal

Define what fresh agents should not touch yet, and when they must escalate
instead of freelancing into broad or ambiguous work.

## Focus

- broad churn restrictions
- public trust restrictions
- architecture decision restrictions
- escalation points

## Acceptance

- fresh-agent restrictions are explicit
- escalation rules are clear
- early-agent damage is reduced by design

## Result

- defined the restriction ladder in
  `docs/systems/OHMIC_FRESH_AGENT_RESTRICTION_AND_ESCALATION_RULES_2026-03-16.md`
- limited fresh agents to narrow, high-truth work while explicitly fencing off
  public-trust, architecture, and broad-churn surfaces
- made escalation a first-class expected behavior instead of a failure mode for
  early-stage workers
