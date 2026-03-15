# Ohmic Dashboard Summary Card Stale Copy Severity Step Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how local stale wording should step up in severity as card-level trust
degrades without collapsing into the same language as global stale state.

## Core Principle

Local stale messaging should escalate in measured steps.

It should become clearer as confidence drops, but still remain card-scoped until
the situation truly becomes a broader dashboard problem.

## Recommended Severity Steps

### `mild`

Use when:

- card freshness is a little behind
- trust is reduced but not sharply degraded

Examples:

- `May be slightly behind`
- `Card data may be older than current state`

### `moderate`

Use when:

- lag is material enough to affect interpretation
- the card may no longer be a reliable local summary

Examples:

- `This card may be stale`
- `Card data may be behind current state`

### `strong`

Use when:

- the card’s local trust is clearly degraded
- but the issue is still local, not whole-dashboard

Examples:

- `This card appears stale`
- `This card may not reflect current state`

## Handoff Boundary

Do not use severity escalation alone to imply global stale state.

If multiple cards or system summaries share the same problem:

- hand off to global stale wording
- do not keep intensifying local card copy past its scope

## Guardrails

- do not let mild local stale copy sound like system failure
- do not let strong local stale copy become indistinguishable from global stale
  warnings
- do not skip straight from neutral to maximum alarm without evidence
- do not make every card use the same strongest wording by default

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-copy-transition-rule`
- `define-dashboard-summary-card-local-vs-global-stale-copy-rule`
