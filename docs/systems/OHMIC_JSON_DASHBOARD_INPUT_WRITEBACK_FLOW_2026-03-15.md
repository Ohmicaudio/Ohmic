# Ohmic JSON Dashboard Input Writeback Flow

Date: 2026-03-15
Status: working contract

## Purpose

Define how a dashboard command/input box should write commands into the live
JSON loop safely and how the matching agent response should be written back for
display.

## Core Rule

The dashboard should write to inbox truth, not directly to `agent_state.json`.

So the flow is:

1. dashboard writes a new inbox event
2. wrapper/agent loop processes it
3. loop writes outbox response
4. reconciliation updates `agent_state.json`
5. dashboard renders the updated summary and recent output

## Input Write Path

Recommended write target:

- `agent_inbox.jsonl`

Recommended event type:

- `instruction`

Minimal payload:

```json
{
  "event_id": "evt_20260315_0201",
  "created_at": "2026-03-15T20:40:00Z",
  "actor": "ui",
  "event_type": "instruction",
  "payload": {
    "text": "continue with highest priority"
  },
  "handled": false
}
```

## Dashboard Submit Sequence

Recommended sequence:

1. user enters text
2. dashboard creates a new inbox event id
3. dashboard appends the event to `agent_inbox.jsonl`
4. dashboard switches local UI to pending state
5. wrapper detects the new unhandled event
6. agent processes it
7. loop marks the inbox event handled
8. loop writes a matching outbox status/result
9. dashboard updates from reconciled state and recent outbox

## Pending State Rule

After submit, the dashboard should show:

- command accepted
- awaiting agent processing

It should not falsely claim the command already completed.

## Duplicate Prevention Rule

Minimum duplicate safeguards:

- disable repeated submit while the exact current command is still pending
- generate a unique `event_id` per submit
- optionally use a `dedupe_key` for accidental repeated clicks

Do not dedupe so aggressively that intentional repeated commands disappear.

## Response Writeback Source

The dashboard should not invent its own response text.

Primary response sources:

- latest matching `agent_outbox.jsonl` event
- reconciled `agent_state.json.response`

Recommended display pattern:

- use `agent_state.json.response` for the main visible status
- use recent outbox items for more detailed recent history

## Matching Inbox To Outbox

Preferred link:

- inbox event `result_event_id`

If that is unavailable, fall back to:

- most recent relevant outbox event after the submit time

## Error Handling

If the dashboard cannot append the inbox event:

- do not show the command as pending
- show a local submission error

If the event is appended but no response arrives yet:

- keep pending state
- rely on reconciliation and outbox updates

## Minimal UI States

Recommended states:

- `idle`
- `submitting`
- `pending`
- `answered`
- `submit_error`

## What Not To Do

- do not write user commands directly into `agent_state.json.input`
- do not overwrite old inbox events
- do not let the dashboard bypass the append-only input history
- do not show synthetic success before an actual outbox/state update exists

## Minimal End-To-End Example

```text
command box submit
-> append inbox event
-> wrapper cycle wakes
-> agent handles event
-> outbox event written
-> state reconciled
-> dashboard shows updated response
```

## Follow-On Dependencies

This writeback flow should feed:

- `define-dashboard-command-box-behavior`
- `define-dashboard-recent-output-pane-behavior`
- `define-dashboard-empty-and-no-work-state`
