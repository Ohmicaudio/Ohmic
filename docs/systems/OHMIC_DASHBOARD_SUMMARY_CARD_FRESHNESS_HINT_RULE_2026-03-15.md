# Ohmic Dashboard Summary Card Freshness Hint Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether the dashboard summary card should show a lightweight freshness
hint so users can tell whether the high-level summary reflects newer or older
state.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_STATUS_CARD_MAPPING_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_STALE_STATE_INDICATOR_BEHAVIOR_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_RELATIVE_TIME_ROLLOVER_RULE_2026-03-15.md`

## Core Principle

The summary card should carry one small freshness hint, not a full freshness
subsystem.

Users need to know whether the headline card is current enough to trust at a
glance.

They do not need freshness badges attached to every field.

## Show A Freshness Hint

The summary card should show a lightweight freshness hint in V1.

Why:

- the summary card is the first trust surface on the page
- users need to distinguish current state from older-but-still-visible state
- the page-level stale indicator may not be enough on its own when users are
  scanning just the top card

## Hint Placement

Place the freshness hint in the summary card header area near:

- the `Updated` label
- or the summary card title line

Do not place separate freshness chips beside each field like:

- `Project`
- `Mode`
- `Repo`
- `Loop state`

## Hint Scope

The summary card freshness hint should describe the summary card as a whole.

It should not claim field-by-field precision.

Meaning:

- `fresh` means the summary card is current enough for normal trust
- `stale` means the summary card may lag behind stronger sources
- `unknown` means freshness cannot be confirmed

## Recommended States

Use the same lightweight states already defined for stale-state behavior:

- `fresh`
- `reconciling`
- `stale`
- `unknown`

If the page also shows a higher-level freshness chip, the summary card hint
should mirror that state instead of inventing a second freshness vocabulary.

## Recommended Wording

Keep the hint short.

Good:

- `Summary current`
- `Refreshing summary`
- `Summary may be out of date`
- `Summary freshness unknown`

Good compact alternative:

- `Current`
- `Refreshing`
- `Possibly stale`
- `Unknown`

Avoid:

- `This card is 83% trustworthy`
- `Data integrity compromised`
- `Project card cache invalid`

## Relationship To Updated Label

The freshness hint is not a replacement for the `Updated` label.

Use both:

- relative timestamp for age
- freshness hint for trust state

Example pairing:

- `Updated 8m ago`
- `Summary may be out of date`

That keeps age and trust distinct.

## When To Hide The Hint

The summary card hint may stay visually subtle, but it should not disappear
entirely while freshness matters.

Hide or de-emphasize only when:

- the summary is clearly `fresh`
- the card already shows a recent `Updated just now` or low-age label
- the design needs to reduce noise on small layouts

Even then, preserve at least one low-emphasis freshness signal in the card
header.

## Mobile And Tight Layout Rule

On tight layouts:

- allow the hint to collapse to a short chip or muted label
- keep the `Updated` line visible if possible

Do not remove both the hint and the updated timestamp at the same time.

## Guardrails

- do not add separate freshness badges to every summary field
- do not let the summary card freshness hint disagree with the shared stale
  indicator without explanation
- do not replace age text with vague trust wording alone
- do not make the hint visually louder than blocked or needs-input states

## Minimal Example

```text
Summary
Updated 12m ago
Summary may be out of date
```

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-freshness-suppression-rule`
- `define-dashboard-return-from-sleep-reconciliation-rule`
- `define-dashboard-last-updated-label-rule`
