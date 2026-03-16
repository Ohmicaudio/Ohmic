# Ohmic Queue Churn And Section Runway Refill Burst

Date: 2026-03-16
Project: ohmic

## Purpose

Close the current queue-churn and section-runway burst as one coherent policy
and reporting family instead of many unrelated singles.

## Why This Burst Exists

The board currently has a truth-gap problem:

- ready folder truth can diverge from generated `ready_tasks.json`
- active claim folder truth can diverge from generated `active_claims.json`
- workers need stable reporting shapes to interpret queue churn without guessing

## Packet Contents

This burst standardizes two connected surfaces:

- section runway and parallel family health
- queue churn, stale-ready intent, grouped wave intent, and system-created
  claim reporting

## Section Runway Outcome

The burst makes these rules explicit:

- healthy execution requires `2` parallel section families alive with runway
- one surviving family is `pressure`, not full health
- balanced runway is `1` active wave, `2` hot successors, and `1` staged
  successor wave
- successor staging starts before depletion
- successor pressure and drain prediction surface refill before collapse

## Queue Churn Outcome

The burst gives workers stable shapes for:

- refill during closeout
- intentionally stale or superseded ready items
- grouped wave intent
- system-created claim origin
- compact churn summary rows

## Next Lane

After this burst closes, the next refill should return to observable live work:

- real device candidate discovery truth
- phone/browser reachability and failure boundary
- exact live-link failure signature
- bounded phone-assisted AmpLab smoke rerun
