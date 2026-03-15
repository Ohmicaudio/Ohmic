# Ohmic Dashboard Pending Warning Copy Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the exact wording tone and severity progression for pending-delay
messages so timeout states stay clear without sounding like false failure.

This rule governs user-facing copy only.

It does not set the timing thresholds themselves.

## Source Rule

Use the timeout tiers from:

- `docs/systems/OHMIC_DASHBOARD_COMMAND_PENDING_TIMEOUT_RULE_2026-03-15.md`

And keep the tone aligned with:

- `docs/systems/OHMIC_DASHBOARD_STALE_STATE_INDICATOR_BEHAVIOR_2026-03-15.md`

## Core Principle

Pending copy should:

- start calm
- become clearer as delay grows
- acknowledge possible staleness only when the evidence is stronger

It should not:

- imply hard failure too early
- sound accusatory
- train users to distrust normal waiting

## Tone Progression

Use this tone ladder:

1. calm acknowledgement
2. mild delay acknowledgement
3. clear but non-dramatic concern
4. possible staleness notice

## Tier Copy

### `normal_wait`

Intent:

- reassure the user that the command was accepted and waiting is normal

Recommended copy:

- `Waiting for agent response.`

Optional alternate:

- `Command received. Waiting for response.`

Do not say:

- `This is taking too long`
- `Something may be wrong`

### `delayed_but_normal`

Intent:

- acknowledge delay without implying system trouble

Recommended copy:

- `Still waiting for agent response.`

Optional alternate:

- `Response is taking a little longer than usual.`

Do not say:

- `Timed out`
- `Problem detected`

### `attention_needed`

Intent:

- make the delay more visible and prepare the user for a refresh or recheck if
  the rest of the dashboard agrees

Recommended copy:

- `This response is taking longer than expected.`

Optional supporting line:

- `The dashboard will keep checking for an update.`

If stale cues are also present, allowed alternate:

- `This response is taking longer than expected. A refresh may help confirm its state.`

### `suspected_stale_or_stuck`

Intent:

- acknowledge that the command may be delayed or the visible state may no
  longer be fresh

Recommended copy:

- `This command may be delayed or the dashboard may need refresh.`

Optional alternate:

- `This command still appears pending. The visible state may be stale.`

Do not say:

- `The command failed`
- `The system is broken`
- `This definitely timed out`

unless a separate true failure event exists.

## Copy By Severity Table

| Tier | Primary copy | Tone |
| --- | --- | --- |
| `normal_wait` | `Waiting for agent response.` | calm |
| `delayed_but_normal` | `Still waiting for agent response.` | mild |
| `attention_needed` | `This response is taking longer than expected.` | clear concern |
| `suspected_stale_or_stuck` | `This command may be delayed or the dashboard may need refresh.` | caution |

## Short Label Variants

If the UI needs shorter chip or inline text:

- `Waiting`
- `Still waiting`
- `Delayed`
- `Possibly stale`

These should only be used where the longer sentence appears nearby or the
surface is extremely tight.

## Relationship To Stale-State Copy

Keep pending-delay copy separate from stale-summary copy.

Examples:

- stale summary label: `Summary may be out of date`
- pending warning: `This command may be delayed or the dashboard may need refresh.`

Why:

- one message is about command response timing
- the other is about dashboard summary freshness

They may appear together, but they should not be collapsed into one confusing
sentence.

## Relationship To Refresh Advice

Only mention refresh once the copy reaches:

- `attention_needed`
- or `suspected_stale_or_stuck`

Do not suggest refresh during normal waiting.

## Avoided Wording

Do not use:

- `failed`
- `broken`
- `hung`
- `dead`
- `timed out`
- `no response forever`

These are too absolute for a pending-delay state.

## Minimal Example

```text
0s to 30s:
Waiting for agent response.

30s to 2m:
Still waiting for agent response.

2m to 5m:
This response is taking longer than expected.

5m plus stale cues:
This command may be delayed or the dashboard may need refresh.
```

## Guardrails

- do not use scary wording for normal delay
- do not hide stronger delay language once the state is materially abnormal
- do not confuse pending delay with hard failure
- do not make refresh advice appear too early

## Follow-On Dependencies

This copy rule should feed:

- `define-dashboard-pending-badge-severity-rule`
- `define-dashboard-immediate-refresh-trigger-rule`
- `define-dashboard-last-updated-label-rule`
