# Ohmic Dashboard Summary Card Stale Copy Escalation Threshold Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define what level of local trust degradation should trigger movement from milder
stale copy to stronger local stale wording on a summary card.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_SEVERITY_STEP_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_TRANSITION_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_LOCAL_VS_GLOBAL_STALE_COPY_RULE_2026-03-15.md`

## Core Principle

Local stale wording should escalate only when the card has real evidence of
degraded trust, not just because a small amount of time passed.

## Mild Threshold

Stay at the mild local stale step when:

- the card may be somewhat behind
- the user can still treat the card as broadly informative
- no stronger mismatch or contradiction is visible

This is the default first caution layer.

## Moderate Threshold

Escalate from mild to moderate when one or more of these are true:

- the card age is materially older than nearby dashboard state
- the card conflicts with fresher adjacent summary signals
- the card is still visible in a trust-sensitive position but can no longer be
  treated as comfortably current

This threshold means:

- the card is still locally scoped
- but the user now needs a clearer caution than `May be stale`

## Strong Threshold

Escalate from moderate to strong only when local trust degradation is obvious.

Use the strong step when one or more of these are true:

- the card is no longer trustworthy for normal interpretation
- the divergence from nearby dashboard state is persistent or large
- the card would likely mislead a reasonable user if read without caution

Strong local wording is for clearly degraded card trust, not for every stale
moment.

## What Does Not Trigger Escalation By Itself

Do not escalate local stale wording only because:

- a few extra seconds passed
- the layout switched from long-form to short-form
- the user resized the dashboard
- the card moved position in the layout

Those are presentation or age details, not enough evidence for a stronger trust
warning by themselves.

## Relationship To Global Stale

Even the strong local threshold must remain below the global stale handoff.

If the problem is no longer local to the card:

- stop escalating local copy
- hand off to the global stale surfaces instead

## Practical Threshold Ladder

Use this decision order:

```text
slightly behind but still usable        -> mild
materially behind or locally conflicting -> moderate
locally untrustworthy for normal use     -> strong
no longer local                          -> global stale
```

## Guardrails

- do not escalate local wording on time alone
- do not skip directly from mild local caution to global stale copy
- do not let presentation changes impersonate trust changes
- do not overuse strong local stale wording for ordinary lag

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-copy-layout-switch-rule`
- `define-dashboard-summary-card-stale-copy-transition-rule`
