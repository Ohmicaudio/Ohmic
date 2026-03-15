# Ohmic Dashboard Focus Return Refresh Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define what should happen when the dashboard regains focus after being
backgrounded so the visible state becomes trustworthy again without requiring
manual reload.

## Core Principle

Focus return should feel like a fast rejoin, not a cold restart.

The dashboard should quickly refresh on return and escalate to reconciliation if
there are signs that its summary state may be stale.

## Default Focus Return Behavior

On focus return:

- trigger one immediate refresh
- keep the current visible state in place while refresh begins
- avoid blanking the dashboard just because the tab became active again

## Escalation Rule

Escalate from immediate refresh to reconciliation when:

- the stale-state indicator is active
- last-updated age is materially old
- current command state conflicts with stronger sources
- the background gap was long enough to make summary drift likely

## Background Gap Heuristic

Short background gap:

- immediate refresh is usually enough

Long background gap:

- immediate refresh may still run first
- but reconciliation should be favored sooner

The exact time threshold can stay implementation-defined, but the behavior
should bias toward correctness after long absence.

## User Experience Rule

On focus return:

- keep the interaction calm
- avoid full-screen loading chrome
- show freshness recovery through small status changes rather than disruptive
  panel resets

## Command Relationship Rule

If a command was pending before backgrounding:

- keep that command visible on return
- refresh its state quickly
- do not silently discard the pending context

## Guardrails

- do not require manual reload after focus return
- do not force reconciliation on every tiny tab switch if the state is already
  fresh
- do not pretend stale data is current after long background gaps
- do not wipe the visible surface while refresh is still in flight

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-return-from-sleep-reconciliation-rule`
- `define-dashboard-background-refresh-pause-rule`
- `define-dashboard-immediate-refresh-trigger-rule`
