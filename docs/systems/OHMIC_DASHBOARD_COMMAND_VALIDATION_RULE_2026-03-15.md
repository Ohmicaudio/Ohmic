# Ohmic Dashboard Command Validation Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the light validation rules for dashboard command input before a message
is accepted into the inbox.

This validation should stay minimal and operational.

It is not prompt policing.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_COMMAND_BOX_BEHAVIOR_2026-03-15.md`
- `docs/systems/OHMIC_JSON_DASHBOARD_INPUT_WRITEBACK_FLOW_2026-03-15.md`

## Core Principle

Validate just enough to:

- prevent empty junk submissions
- keep the input surface usable
- preserve the user's actual wording where possible

Do not over-normalize or silently rewrite commands.

## Required Validation Rules

### 1. Trim outer whitespace

Before validation:

- trim leading whitespace
- trim trailing whitespace

Keep internal spacing intact.

Why:

- removes accidental surrounding whitespace
- preserves the actual sentence the user wrote

### 2. Reject empty-after-trim input

If the input becomes empty after trim:

- reject submission
- keep the user in the input state
- show a small local validation message

Recommended validation message:

- `Enter a command before submitting.`

### 3. Accept plain free text

The box should accept ordinary natural-language commands.

Do not require:

- special prefixes
- slash commands
- strict structured syntax

Unless a later surface explicitly adds those as optional enhancements.

### 4. Enforce a practical maximum length

Use a practical upper limit to prevent accidental paste floods.

Recommended default:

- `1000` characters max

If the input exceeds that limit:

- reject submission
- keep the text available for editing
- show a short local validation message

Recommended validation message:

- `This command is too long for the dashboard box. Shorten it and try again.`

## Recommended Additional Rules

### Preserve newlines only if the box supports them

If the box is single-line:

- normalize line breaks out or reject multiline paste according to UI design

If multiline is supported later:

- preserve user formatting as entered

For v1, single-line friendly input is acceptable.

### Do not collapse internal wording

Do not:

- rewrite phrasing
- auto-correct meaning
- strip punctuation aggressively
- convert case automatically

The dashboard should only prepare the input enough for safe enqueue, not edit
the user's intent.

## What Should Not Be Validated Here

Do not validate:

- whether the command is a good idea
- whether the request is in scope for the agent
- whether the command is redundant with existing queue work
- whether the wording is technically precise

Those are agent/runtime concerns, not input-box validation concerns.

## Minimal Validation Flow

```text
raw input
-> trim outer whitespace
-> reject if empty
-> reject if too long
-> accept and enqueue
```

## Error Message Style

Validation messages should be:

- short
- local
- corrective
- non-judgmental

Good:

- `Enter a command before submitting.`
- `This command is too long for the dashboard box.`

Bad:

- `Invalid prompt`
- `Bad instruction`
- `You entered nonsense`

## Submission Result Rule

If validation fails:

- do not append to `agent_inbox.jsonl`
- do not show a pending state
- keep the text available for correction

If validation passes:

- proceed to the normal inbox append flow

## Guardrails

- do not turn validation into content moderation logic
- do not silently rewrite the command into a different meaning
- do not reject commands just because they are informal
- do not let oversized paste accidents flood the inbox

## Follow-On Dependencies

This validation rule should feed:

- `define-dashboard-command-history-expansion-rule`
- `define-dashboard-command-acknowledgement-state`
- `define-dashboard-command-pending-timeout-rule`
