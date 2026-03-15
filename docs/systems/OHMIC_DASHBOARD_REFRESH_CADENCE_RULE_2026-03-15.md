# Ohmic Dashboard Refresh Cadence Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how often the dashboard should re-read live JSON state, when it should
refresh immediately, and when it should escalate into a stronger reconciliation
pass instead of a light visual poll.

## Core Principle

Refresh should feel live without turning the dashboard into a hot spin loop.

Use a light cadence for normal state polling, faster reactions for meaningful
events, and explicit reconciliation when summary truth may be stale.

## Three Refresh Levels

### `light_poll`

Normal dashboard refresh of the current JSON summary surfaces.

Use this for:

- routine idle watching
- status-card updates
- recent-output refresh
- command acknowledgement waiting states

### `immediate_refresh`

Fast one-off refresh triggered by a meaningful event.

Use this when:

- a command is submitted successfully
- a new outbox event appears
- a claim/lock transition is detected
- the dashboard regains focus after being backgrounded

### `reconciliation_refresh`

A stronger pass that rebuilds summary state from repo-backed queue, claims, and
live logs before repainting the dashboard.

Use this when:

- staleness indicators fire
- queue counts disagree with JSON summary
- active-claim counts disagree with JSON summary
- current input points at an already-handled event
- the wrapper resumes after crash or sleep

## Recommended Cadence

### Foreground active state

When the dashboard is visible and work is moving:

- light poll every `5` seconds

### Foreground quiet state

When the dashboard is visible but no meaningful events changed recently:

- light poll every `15` seconds

### Background or hidden state

When the page is not the active surface:

- reduce to `30-60` seconds
- do not run hot foreground polling

### Immediate event response

After a meaningful local or loop event:

- trigger one immediate refresh within `1` second
- then return to the normal cadence tier

## Cadence Selection Rule

Recommended selection order:

1. if reconciliation is required, do reconciliation refresh
2. else if a meaningful event just occurred, do immediate refresh
3. else if dashboard is foreground and active, use `5s`
4. else if dashboard is foreground but quiet, use `15s`
5. else use `30-60s`

## What Counts As A Meaningful Event

Meaningful events include:

- inbox append success
- new response in outbox
- response status transition
- lease/lock change
- ready-count or active-claim count change
- dashboard regaining focus

Do not treat simple hover, typing, or cosmetic animation as meaningful
refresh-trigger events.

## Relationship To Reconciliation

Normal refresh may read:

- `agent_state.json`
- lightweight ready/active summaries

Reconciliation refresh should rebuild those summaries from stronger sources
before the dashboard trusts them again.

So:

- polling keeps the page fresh
- reconciliation repairs truth drift

## Staleness Escalation Rule

Escalate from light poll to reconciliation refresh when:

- the stale-state indicator is active
- summary timestamps trail stronger sources materially
- counts or current ids disagree across surfaces
- crash recovery or runner restart just happened

Do not keep repeating light polls against clearly stale summary state.

## Dashboard UX Rule

Refresh should be noticeable in correctness, not in distracting motion.

Prefer:

- small timestamp/status updates
- quiet card refresh
- output-pane update on real events

Avoid:

- spinner flicker on every poll
- full-panel reload feel
- forcing the command box to lose focus

## Minimal Example

```text
dashboard visible -> poll every 5s while active
command submitted -> immediate refresh
outbox answer arrives -> immediate refresh
state mismatch detected -> reconciliation refresh
dashboard backgrounded -> drop to 30-60s
```

## Guardrails

- do not poll faster than needed just to feel busy
- do not rely on light polling when drift has already been detected
- do not let refresh cadence override stable-idle backoff logic in the runner
- do not make the dashboard appear frozen because it only waits for manual reload

## Follow-On Dependencies

This cadence rule should feed:

- `define-dashboard-immediate-refresh-trigger-rule`
- `define-dashboard-background-refresh-pause-rule`
- `define-dashboard-stale-state-indicator-behavior`
- `define-json-dashboard-render-surface`
