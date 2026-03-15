# Ohmic Dashboard Command Box Behavior

Date: 2026-03-15
Status: working contract

## Purpose

Define the minimal UX and state behavior for a dashboard command/input box that
writes into the JSON inbox safely.

## Core Principle

The command box should feel simple, but it must remain honest about state.

So it should:

- accept a command
- show that it was accepted
- show when it is pending
- avoid duplicate spam
- avoid pretending the command is complete before the loop answers it

## Minimum Visible Elements

- text input
- submit action
- pending acknowledgement
- latest answer or status summary

## Submit Behavior

When the user submits:

1. validate non-empty input
2. generate a new inbox event id
3. append the event to `agent_inbox.jsonl`
4. clear or freeze the input according to local UX choice
5. show a pending acknowledgement state

## Recommended Input Rules

- allow plain free text
- trim surrounding whitespace
- reject empty submit
- do not silently rewrite the user’s wording beyond simple trim

## Recommended Control States

### `idle`

No command currently pending from this box.

### `submitting`

The dashboard is attempting to append the inbox event.

### `pending`

The command was accepted into the inbox and is waiting for the loop.

### `answered`

The command has a matching response/result.

### `submit_error`

The dashboard could not write the command into the inbox.

## Duplicate Prevention

Minimum rule:

- disable repeated submit while the same just-submitted command is still in
  `pending`

Do not block:

- a later intentionally different command
- a repeated command after the first one has already been answered

## Input Clearing Rule

Recommended default:

- clear the text field after successful enqueue
- show the accepted command in acknowledgement/pending UI instead

Alternative acceptable rule:

- keep the text visible but read-only while pending

## Pending Acknowledgement Rule

After successful enqueue, show:

- command accepted
- waiting for agent

Do not show:

- success/completed language
- fabricated results

## Answer Display Rule

When a matching outbox/state update appears:

- switch from `pending` to `answered`
- show the latest meaningful result/status
- allow the user to enter a new command

## Error Display Rule

If inbox write fails:

- keep the text available
- show a local error
- do not create a fake pending state

## Keyboard Rule

Recommended simple rule:

- `Enter` submits
- `Shift+Enter` may insert a newline only if multiline input is later allowed

For v1, single-line input is acceptable.

## What Not To Do

- do not write directly into `agent_state.json`
- do not display raw event objects in the input box area
- do not imply a command is complete before a response exists
- do not trap the user in a permanently disabled box after one submit

## Follow-On Dependencies

This command-box behavior should feed:

- `define-dashboard-command-acknowledgement-state`
- `define-dashboard-command-history-visibility-rule`
- `define-dashboard-command-validation-rule`
