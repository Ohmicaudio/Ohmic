# Ohmic Dashboard Status Card Mapping

Date: 2026-03-15
Status: working contract

## Purpose

Define how the live JSON agent loop should map into a small dashboard card set
without exposing raw internal detail everywhere.

This is a contract-first mapping, not a visual design system.

## Card Set

Use four first-version cards:

1. Summary card
2. Queue health card
3. Current action card
4. Blockers and risk card

These cards should summarize the system.

They should not try to expose every raw JSON field.

## Source Priority

For card content, use this source priority:

1. `agent_state.json`
2. generated summary exports like `ready_tasks.json` and `active_claims.json`
3. `agent_runtime.json`
4. append-only logs when a field is not already summarized elsewhere

If a summary file is stale, show that honestly instead of inventing freshness.

## 1. Summary Card

Purpose:

- orient the user quickly
- answer "what system am I looking at and is it awake?"

Primary source:

- `agent_state.json.session`

Supporting source:

- `agent_runtime.json.idle`

Show:

- project
- mode
- active repo
- last updated timestamp
- idle state badge

Recommended labels:

- `Project`
- `Mode`
- `Repo`
- `Updated`
- `Loop state`

Do not show:

- full session ids
- raw runtime counters
- raw filesystem paths beyond the active repo label

## 2. Queue Health Card

Purpose:

- summarize whether the work board is healthy enough to trust at a glance

Primary source:

- `agent_state.json.state`

Supporting sources:

- `ready_tasks.json`
- `active_claims.json`

Show:

- ready task count
- active claim count
- board health
- queue freshness badge

Recommended labels:

- `Ready`
- `Active`
- `Board health`
- `Summary freshness`

Fallback rule:

- if the generated summaries are stale or missing, still show the counts from
  `agent_state.json.state`
- mark freshness as `stale` or `unknown`

Do not show:

- full task titles for every ready item
- raw claim file paths
- full queue bodies

## 3. Current Action Card

Purpose:

- show what the agent is doing right now or most recently finished

Primary source:

- `agent_state.json.response`

Supporting source:

- `active_claims.json`

Show:

- response status
- current message
- first recommended next item if present
- active claim owner/task hint if it helps explain the current work

Recommended labels:

- `Status`
- `Current action`
- `Next`
- `Claim`

Display rule:

- if an active claim exists, prefer wording that reflects active work
- if no active claim exists, show the latest meaningful response status without
  pretending work is still in flight

Do not show:

- full outbox history
- full recommendation lists by default
- every claimed file path

## 4. Blockers And Risk Card

Purpose:

- answer "what is wrong, thin, stale, or waiting?"

Primary sources:

- `agent_state.json.state`
- `agent_runtime.json.health`

Supporting source:

- `recent_audits.jsonl` once that log shape is defined and present

Show:

- board health when it is `thin`, `stale`, or `blocked`
- stale state detected
- stale leases detected
- last runtime error if non-null
- one short risk or blocker summary

Recommended labels:

- `Risk`
- `Blocker`
- `State drift`
- `Runtime error`

Display rule:

- hide the card only when there is truly no meaningful risk and the system is
  healthy
- otherwise keep it visible, even if the message is short

Do not show:

- full stack traces
- raw lease payloads
- full audit logs

## Card Ordering

Recommended order on the page:

1. Summary
2. Queue health
3. Current action
4. Blockers and risk

Why:

- orientation first
- board trust second
- current movement third
- risk last but still visible

## Freshness Rule Across All Cards

Each card should be allowed to carry a small freshness or confidence badge.

Minimum states:

- `fresh`
- `stale`
- `unknown`

If the summary is stale:

- keep showing the last good data
- visually mark it stale
- do not upgrade stale summaries into confident claims

## Minimal Example Mapping

```text
agent_state.json.session        -> Summary card
agent_state.json.state          -> Queue health card
agent_state.json.response       -> Current action card
agent_runtime.json.health       -> Blockers and risk card
ready_tasks.json + active_claims.json -> small supporting counts and hints
```

## Guardrails

- do not make the cards depend on raw Markdown parsing in the browser
- do not duplicate full queue bodies into card content
- do not let one stale summary file poison all cards without a visible warning
- do not turn the dashboard into a second queue editor

## Follow-On Dependencies

This mapping should feed:

- `define-dashboard-stale-state-indicator-behavior`
- `define-dashboard-empty-and-no-work-state`
- `define-dashboard-recent-output-pane-behavior`
- `define-dashboard-command-box-behavior`
