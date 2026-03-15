# Ohmic Dashboard Panel Priority Order Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define which dashboard panels should remain visually dominant when the surface
is crowded or viewed on smaller layouts.

This is a content-priority rule, not a pixel-perfect responsive spec.

## Core Principle

When space gets tight, preserve:

1. orientation
2. board trust
3. current movement
4. immediate risk

Only then compress or collapse secondary interaction/history surfaces.

## Panel Priority Order

Use this order from highest priority to lowest priority:

1. Summary card
2. Queue health card
3. Current action card
4. Blockers and risk card
5. Command box
6. Recent output pane

## Why This Order

### 1. Summary card

Keep this visible first because the user needs immediate orientation:

- what system this is
- what mode it is in
- whether the summary looks current enough to trust

Without this card, the rest of the dashboard loses context.

### 2. Queue health card

Keep this visible second because users need to know:

- whether work exists
- whether claims are active
- whether the board looks healthy or thin

This is the main trust-and-activity card.

### 3. Current action card

Keep this visible third because it answers:

- what is happening right now
- what the agent is doing or just did

This is more important than history, but slightly less foundational than
orientation and board health.

### 4. Blockers and risk card

Keep this visible whenever it contains meaningful warnings.

If it is empty or quiet, it may compress earlier.

If it contains:

- blocked state
- stale state drift
- runtime error
- active risk

then it should jump above the current action card visually if needed.

So its baseline order is fourth, but its alert state may temporarily elevate it.

### 5. Command box

Keep the command box available, but it can collapse behind a smaller input row
or secondary section before the four main cards disappear.

Why:

- input matters
- but passive understanding of the system comes first

### 6. Recent output pane

Collapse this first on tight layouts.

Why:

- it is useful context
- but it is the most replaceable surface because the current action card already
  carries the highest-value live summary

## Tight Layout Behavior

### Full layout

Show:

- all four cards
- command box
- recent output pane

### Medium layout

Show:

- all four cards
- command box in reduced form
- recent output pane shortened or clipped

### Tight layout

Show:

- summary card
- queue health card
- current action card
- blockers/risk card only if meaningful
- command box collapsed into a minimal action row

Hide or defer:

- recent output pane

### Very tight or embedded layout

Show at minimum:

- summary card
- queue health card
- one merged action/risk card if necessary

Keep the command box accessible through a secondary expansion if the surface is
still interactive.

## Collapse Rules

### Collapse first

- recent output pane

### Collapse second

- command box expands/collapses into a smaller row or drawer

### Collapse only if truly necessary

- blockers and risk card when it has no meaningful warning content

### Do not collapse early

- summary card
- queue health card

## Alert Override Rule

If the blockers/risk card contains meaningful warning content, it may override
the default order and sit immediately after queue health.

Recommended temporary order during active risk:

1. Summary
2. Queue health
3. Blockers and risk
4. Current action
5. Command box
6. Recent output

This keeps the user from missing real trouble just because the normal layout is
optimized for calm operation.

## No-Work And Idle Interaction

When the empty/no-work state is active:

- the empty-state treatment may replace the lower-priority surfaces
- but the summary freshness badge and core orientation should remain visible

That means:

- recent output can disappear
- command box can shrink
- but orientation and trust should still anchor the view

## Guardrails

- do not hide the summary freshness signal on tight layouts
- do not let recent output outrank current action
- do not demote blockers below routine history when risk is active
- do not make the command box visually dominate the page when the system state
  is unclear

## Minimal Example

```text
normal: summary -> health -> action -> risk -> command -> output
tight:  summary -> health -> action -> risk -> command
alert:  summary -> health -> risk -> action -> command -> output
```

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-output-priority-visibility-rule`
- `define-dashboard-background-refresh-pause-rule`
- `define-dashboard-last-updated-label-rule`
