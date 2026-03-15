# Ohmic JSON Dashboard Render Surface

Date: 2026-03-15
Status: working contract

## Purpose

Define the first minimal user-facing surface for rendering the live JSON agent
loop without turning it into a full app rewrite.

## Core Principle

The first dashboard should be:

- small
- readable
- stateful enough to be useful
- honest about summary freshness

It should not try to replace the whole repo-backed system.

## First-Version Surface

Recommended first surface:

- one page
- four small status cards
- one command/input area
- one recent output/status area

## Recommended Panels

### 1. Session Card

Source:

- `agent_state.json.session`

Show:

- project
- mode
- active repo
- updated timestamp

### 2. Queue Health Card

Source:

- `agent_state.json.state`

Show:

- ready count
- active claim count
- board health
- queue floor met / not met if present

### 3. Current Action Card

Source:

- `agent_state.json.response`

Show:

- current status
- current message
- recommended next items

### 4. Input / Attention Card

Source:

- `agent_state.json.input`

Show:

- whether input is pending
- current message id
- current instruction text summary

### 5. Command Box

Source:

- writes to inbox path, not directly to state

Show:

- one text entry box
- submit button
- pending acknowledgement after submission

### 6. Recent Output Pane

Source:

- recent outbox entries or current `response`

Show:

- most recent status/result lines
- latest completion or blocked note

## What Should Stay JSON-Only In V1

Do not render everything.

Keep these as machine-facing or later-phase data:

- full inbox history
- full outbox history
- raw lease objects
- full runtime bookkeeping
- full queue listings copied inline from repo truth

## Recommended Layout

Simple order:

1. session card
2. queue health card
3. current action card
4. input/attention card
5. command box
6. recent output pane

This keeps:

- orientation first
- system health second
- action and input third

## Freshness Rule

The dashboard should visibly show whether the state summary is:

- fresh
- stale
- reconciling

It should not pretend the JSON summary is always current.

## Repo Truth Reminder

The dashboard is a renderer, not authority.

If a surface needs exact queue or claim truth, the wrapper should reconcile
that first instead of letting the dashboard improvise it.

## What V1 Should Not Do

- do not expose full raw JSON blobs by default
- do not implement a whole issue tracker UI
- do not replace Markdown docs or queue files
- do not become a second project-management system

## Minimal Example Mapping

```text
agent_state.json.session  -> session card
agent_state.json.state    -> queue health card
agent_state.json.response -> current action card
agent_state.json.input    -> input/attention card
agent_outbox.jsonl tail   -> recent output pane
```

## Follow-On Dependencies

This render surface should feed:

- `define-json-dashboard-input-writeback-flow`
- `define-dashboard-status-card-mapping`
- `define-dashboard-command-box-behavior`
- `define-dashboard-stale-state-indicator-behavior`
