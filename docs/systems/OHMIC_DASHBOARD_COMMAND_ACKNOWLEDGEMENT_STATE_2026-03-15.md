# Ohmic Dashboard Command Acknowledgement State

Date: 2026-03-15
Status: working contract

## Purpose

Define the small acknowledgement state shown after a command is accepted into
the inbox but before the loop has fully answered it.

## Core Principle

Acknowledgement is not completion.

The dashboard should communicate:

- your command was accepted
- it is waiting in the loop
- an answer has not yet arrived

## Recommended State Name

Use a visible acknowledgement state such as:

- `accepted`
- or `pending`

For clarity in the UI:

- accepted = command entered the inbox
- pending = still waiting for answer

Either combined or separate is acceptable as long as completion is not implied.

## Minimum Message

Recommended acknowledgement message:

- `Command accepted. Waiting for agent response.`

Alternative short form:

- `Queued for processing.`

## When It Appears

Show the acknowledgement when:

- the inbox append succeeds
- but no matching answer/result has appeared yet

## When It Clears

Clear or replace the acknowledgement when:

- a matching response/result is shown
- the submit fails
- the user intentionally dismisses it if the UI supports dismissal

## What It Should Show

Recommended contents:

- accepted command summary
- pending/accepted label
- lightweight waiting text

Optional:

- message id or short event reference for debugging surfaces

## What It Should Not Show

Do not show:

- success/completed wording
- fake result text
- raw JSON event bodies

## Relationship To Other States

### `submitting`

Local UI is still trying to append the inbox event.

### `accepted/pending`

Inbox write succeeded, waiting on loop processing.

### `answered`

Matching response exists.

### `submit_error`

Inbox write failed.

## Tone Rule

Keep the tone calm and factual.

Prefer:

- `accepted`
- `waiting`
- `processing`

Avoid:

- `done`
- `solved`
- `completed`

until a real answer exists.

## Minimal Example

```text
User submits command
-> inbox append succeeds
-> dashboard shows: "Command accepted. Waiting for agent response."
-> response arrives
-> acknowledgement becomes answered/result display
```

## Follow-On Dependencies

This acknowledgement state should feed:

- `define-dashboard-command-history-visibility-rule`
- `define-dashboard-command-validation-rule`
- `define-dashboard-command-pending-timeout-rule`
