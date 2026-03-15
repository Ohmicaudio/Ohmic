# Ohmic Dashboard Summary Card Stale Copy Transition Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when local stale copy should move between mild, moderate, and strong
severity wording as card trust degrades.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_LOCAL_VS_GLOBAL_STALE_COPY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_SHORT_FORM_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_SUMMARY_CARD_STALE_COPY_LONG_FORM_RULE_2026-03-15.md`

## Core Principle

Local stale wording may intensify as trust degrades, but it must remain clearly
local until the state truly becomes a global stale condition.

## Three Local Severity Steps

Use three local stale copy steps:

1. mild
2. moderate
3. strong

These are local presentation steps, not new global health states.

## 1. Mild Local Stale Copy

Use mild wording when:

- the card may be slightly behind
- the card is still broadly usable
- there is no sign that the whole dashboard is compromised

Recommended wording direction:

- `Card may be stale`
- `May be stale`

Tone:

- cautionary
- compact
- non-alarmist

## 2. Moderate Local Stale Copy

Use moderate wording when:

- the card looks materially older than nearby dashboard state
- freshness confidence is weakening enough to affect interpretation
- the card should still stay clearly local in scope

Recommended wording direction:

- `Card data may be behind current state`
- `This card may be behind current state`

Tone:

- clearer
- more explicit
- still local

## 3. Strong Local Stale Copy

Use strong wording when:

- the card is no longer trustworthy for normal interpretation
- local card drift is obvious and persistent
- the issue is still local to the card rather than global to the page

Recommended wording direction:

- `Card data may not reflect current state`
- `This card should be treated cautiously`

Tone:

- firm
- scoped
- not catastrophic

## Transition Order

Move through the wording steps in one direction:

```text
mild -> moderate -> strong
```

Do not skip straight from mild local wording to global stale wording unless the
state truly widened beyond the card.

## Layout Interaction

Severity and layout should work together, not replace each other.

Meaning:

- a cramped layout may use short-form wording for a given step
- a spacious layout may use long-form wording for that same step

The layout switch should not change the underlying severity step by itself.

## Handoff To Global Stale

If the stale condition is no longer local:

- stop using local card stale transitions as the primary message
- hand off to the global stale surfaces and wording

Do not let the strongest local copy become indistinguishable from global stale
state before that handoff.

## What To Avoid

Do not:

- jump from `May be stale` to `Dashboard state may be stale` on the same card
- use `Broken`, `Invalid`, or `Fatal` as local stale transitions
- let local stale copy imply the whole dashboard collapsed

## Compact Example

```text
mild     -> Card may be stale
moderate -> Card data may be behind current state
strong   -> Card data may not reflect current state
global   -> Dashboard state may be stale
```

## Guardrails

- keep each step clearly local until the global handoff is warranted
- do not treat layout-driven shorter copy as a severity downgrade
- do not escalate wording faster than the actual trust loss
- do not reuse the exact same phrase for both local and global stale states

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-copy-escalation-threshold-rule`
- `define-dashboard-summary-card-stale-copy-layout-switch-rule`
