# Ohmic Dashboard Return From Sleep Reconciliation Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when a dashboard returning from a longer hidden, suspended, or sleeping
state should skip straight to reconciliation instead of trusting a lighter
refresh.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_FOCUS_RETURN_REFRESH_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_STALE_STATE_INDICATOR_BEHAVIOR_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_RELATIVE_TIME_ROLLOVER_RULE_2026-03-15.md`

## Core Principle

Short absences should feel quick.

Long absences should favor correctness over speed.

The dashboard should not pretend a lightly refreshed summary is trustworthy
after a substantial sleep gap.

## Three Return Classes

Classify return-from-sleep behavior into three bands:

1. short return
2. medium return
3. long return

## 1. Short Return

Treat absences under `2` minutes as short.

Behavior:

- trigger the normal immediate refresh
- keep the current summary visible
- do not escalate to reconciliation unless stronger stale signals already exist

Why:

- brief tab switches or window changes should stay lightweight

## 2. Medium Return

Treat absences from `2` minutes up to `15` minutes as medium.

Behavior:

- trigger immediate refresh first
- check stale-state inputs as soon as the refresh begins
- escalate to reconciliation if:
  - stale-state is already active
  - summary freshness is unknown
  - active command state conflicts with stronger sources

Why:

- medium gaps may still be recoverable with a normal refresh
- but they are old enough to justify a stricter trust check

## 3. Long Return

Treat absences over `15` minutes as long.

Behavior:

- enter reconciliation immediately
- keep the last visible summary on screen with clear caution labeling
- do not rely on a light refresh alone as the trust-restoring step

Why:

- after longer sleep or suspension gaps, local summary state is too likely to
  drift

## Escalation Triggers

Even below the long-gap threshold, escalate to reconciliation when any of these
are true:

- the stale-state indicator is already `stale`
- freshness is `unknown`
- runtime health reports stale state detected
- active claim or queue counts disagree with stronger sources
- command pending state appears older than the normal timeout ladder expects

## Visible Behavior Rule

When reconciliation starts after return from sleep:

- keep the last visible summary rendered
- show the freshness state as `reconciling` or `stale`
- avoid blanking the whole dashboard

Do not force the user through a cold-load experience if a last-known summary is
available.

## Message Rule

Use short, calm messaging.

Good:

- `Refreshing summary`
- `Rechecking after long sleep`
- `Summary may be out of date`

Bad:

- `System broken after sleep`
- `Dashboard lost all state`
- `Fatal wake failure`

## Pending Command Rule

If the dashboard returns while a command still looks pending:

- keep the pending command visible
- reconcile that command state promptly
- do not silently clear it just because the page was hidden

If reconciliation proves the command state is outdated, update it through the
normal command-state surfaces rather than dropping it abruptly.

## Minimal Decision Flow

```text
return from hidden/sleep
-> measure gap length
-> short gap: immediate refresh
-> medium gap: immediate refresh, escalate if stale signals exist
-> long gap: reconciliation immediately
```

## Guardrails

- do not force reconciliation on every minor focus change
- do not trust a light refresh after a long sleep gap
- do not blank the UI if last-known summary state is available
- do not confuse stale summary recovery with fatal runtime failure

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-summary-card-stale-override-rule`
- `define-dashboard-background-refresh-pause-rule`
- `define-dashboard-immediate-refresh-debounce-rule`
