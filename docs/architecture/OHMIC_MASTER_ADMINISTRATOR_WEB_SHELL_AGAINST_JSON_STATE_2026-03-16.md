# Ohmic Master Administrator Web Shell Against JSON State

Date: 2026-03-16
Project: ohmic

## Purpose

Define the first actual Master Administrator browser shell using the current
shared JSON runtime and dashboard/writeback concepts as the initial backing
model.

## Core Rule

The first shell should read reconciled truth and submit bounded administrator
commands.

It should not pretend to be:

- a provider console
- an orchestrator UI
- a worker execution surface

## Why JSON State Is Enough For The First Shell

The repo already has a seeded runtime model in:

- `generated/agent-work/runtime/agent_state.json`
- `generated/agent-work/runtime/agent_inbox.jsonl`
- `generated/agent-work/runtime/agent_outbox.jsonl`
- `generated/agent-work/runtime/agent_locks.json`

That is enough to scaffold:

- list/detail reads
- simple status summaries
- recent action history
- command submission and reconciliation feedback

Without waiting for a final database or provider-complete backend.

## Shell Layout

The first shell should have five bounded panels.

### 1. Intake Queue Panel

Purpose:

- show normalized intake items ready for administrator review

Minimum fields:

- title
- intake kind
- received time
- trust hint
- current status
- routing target
- tags

Behavior:

- select one item to drive the detail and routing panels
- allow filter chips later, but do not require them in the first shell

### 2. Aggregation Queue Panel

Purpose:

- show grouped or cross-related intake packets that should be handled as a
  bundle instead of isolated single items

Examples:

- multiple attachments from the same sender
- repeated provider follow-up on the same topic
- imported data drops that should become one packet

Minimum fields:

- aggregation id
- member count
- summary label
- recommended next action

This panel can start read-only.

### 3. Routing Desk Panel

Purpose:

- expose the bounded administrator routing actions for the selected intake item

Minimum actions:

- route to orchestrator
- hold
- archive
- request approval
- waiting on provider
- waiting on human
- add note
- tag item

This panel should render only actions allowed by the project overlay.

### 4. Audit And Recent Actions Panel

Purpose:

- show the last accepted command results and recent administrator activity

Minimum fields:

- command id
- action
- target intake id
- accepted or rejected
- resulting status
- timestamp

The first shell can populate this from JSON-backed reconciled result state.

### 5. Command/Input Surface

Purpose:

- submit the selected routing action with any needed note, tag, or queue target

Minimum fields:

- action picker or action buttons
- note input
- tag input
- optional target queue field when routing

This surface should post administrator intent, not provider-specific payloads.

## Data Sources

The first shell can read from a reconciled JSON projection that combines:

- provider-agnostic intake envelopes
- administrator intake items
- project overlay labels and allowed actions
- recent command result summaries

The browser should not read raw provider payloads directly.

## Safe Backing Shapes

Suggested first JSON projections:

- `administrator_intake_queue.json`
- `administrator_aggregation_queue.json`
- `administrator_recent_actions.json`
- `administrator_overlay_view.json`

These can be generated from the stronger repo/runtime truth until a fuller
backend API is in place.

## Browser To Backend Contract

Read flow:

1. browser requests or reads reconciled admin JSON view state
2. browser renders queue, detail, and recent actions

Write flow:

1. browser submits administrator command intent
2. backend validates against routing rules and overlay policy
3. backend writes reconciled command result state
4. browser refreshes view state

This keeps provider credentials and provider-specific logic behind the backend
boundary already defined in the administrator architecture packet.

## Project Overlay Use

The shell should consume overlay-provided values for:

- account labels
- intake kind labels
- routing target display names
- destination labels
- custom project tags

The shell should not embed Ohmic-only strings as core logic defaults.

## First Safe UI Sequence

Recommended first user path:

1. open shell
2. see intake queue and recent actions
3. select one intake item
4. inspect detail summary
5. submit one routing command
6. see reconciled result in audit panel

If that path works, the first shell is real enough to extend.

## What Can Stay Out Of Scope

The first shell does not need:

- live provider inbox sync
- attachment preview rendering for every type
- multi-user collaboration
- orchestrator task editing
- background polling sophistication
- final auth or session policy

## Minimal Example Screen Contract

```json
{
  "selected_intake_id": "intake_20260316_001",
  "queue_items": [
    {
      "intake_id": "intake_20260316_001",
      "title": "Fold live device smoke still fails discovery",
      "intake_kind": "support_request",
      "status": "triaged",
      "routing_target": "administrator_hold",
      "trust_hint": "known-operator",
      "received_at": "2026-03-16T02:20:00Z",
      "tags": ["handset", "amplab", "smoke"]
    }
  ],
  "recent_actions": [
    {
      "command_id": "cmd_20260316_001",
      "action": "hold",
      "intake_id": "intake_20260316_001",
      "accepted": true,
      "updated_status": "triaged",
      "updated_routing_target": "administrator_hold",
      "completed_at": "2026-03-16T02:31:00Z"
    }
  ]
}
```

## Immediate Follow-On

This scaffold should feed:

1. live JSON reconciliation helpers for administrator views
2. the first backend command writeback path for admin routing
3. later provider-backed intake read models without changing browser shape
