# Ohmic Dashboard History Expanded Scroll Boundary Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how far expanded command history may grow before it should become a
bounded scroll region instead of pushing the whole dashboard downward.

## Core Principle

Expanded history should remain reviewable without taking over the page.

Once hidden history exceeds a reasonable vertical footprint, the history region
should scroll internally instead of forcing the whole dashboard to become a long
stack.

## Recommended Boundary

Use a bounded vertical region once expanded history grows beyond a moderate
height threshold.

Recommended default:

- approximately `30-40%` of the dashboard viewport area
- or the point where the current command anchor would otherwise be pushed too
  far away

## Small-Surface Rule

On smaller layouts:

- trigger the bounded scroll region sooner
- keep the current command and summary context visible without long page travel

## Large-Surface Rule

On larger layouts:

- allow a little more visible history before internal scrolling begins
- but still preserve the compact dashboard feel

## Relationship To Scroll Anchor

When the history becomes scrollable:

- keep the newest visible command context easy to recover
- do not force the user to hunt for the current anchor

## Guardrails

- do not let expanded history take over the full dashboard by default
- do not create a scroll box so small that history becomes frustrating to inspect
- do not vary the threshold so much that behavior feels random
- do not lose the current command anchor when switching into scroll mode

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-scroll-anchor-rule`
- `define-dashboard-history-scroll-height-mobile-threshold-rule`
- `define-dashboard-history-expanded-scroll-boundary-rule`
