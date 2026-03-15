# Ohmic Dashboard Pending Badge Severity Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the pending command badge should change emphasis across normal,
delayed, and possibly stale timeout tiers without implying false failure.

This rule covers the badge treatment only.

It should stay aligned with:

- `docs/systems/OHMIC_DASHBOARD_COMMAND_PENDING_TIMEOUT_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_PENDING_WARNING_COPY_RULE_2026-03-15.md`

## Core Principle

The badge should:

- confirm that a command is still being tracked
- increase visibility as delay grows
- stop short of false error styling unless a real failure event exists

The badge is a severity cue, not a verdict.

## Tier Mapping

Use the same four timeout tiers as the copy rule:

1. `normal_wait`
2. `delayed_but_normal`
3. `attention_needed`
4. `suspected_stale_or_stuck`

## Badge Labels

Recommended badge text by tier:

| Tier | Badge label |
| --- | --- |
| `normal_wait` | `Pending` |
| `delayed_but_normal` | `Still waiting` |
| `attention_needed` | `Delayed` |
| `suspected_stale_or_stuck` | `Possibly stale` |

These labels should stay short enough for compact surfaces.

## Severity Progression

### `normal_wait`

Intent:

- neutral confirmation

Visual behavior:

- low emphasis
- neutral accent
- no warning icon required

### `delayed_but_normal`

Intent:

- mild visibility increase

Visual behavior:

- slightly stronger contrast than `normal_wait`
- still not warning-red
- may use a soft caution tint

### `attention_needed`

Intent:

- clearly noticeable without implying confirmed failure

Visual behavior:

- medium-high emphasis
- warning-tier tint
- optional subtle clock or delay cue if the UI already supports iconography

### `suspected_stale_or_stuck`

Intent:

- strongest non-failure warning state

Visual behavior:

- highest badge emphasis in the pending family
- caution/amber severity
- must still remain distinct from true error or blocked styling

Do not style this like:

- hard failure
- transport error
- blocked state

unless a separate real failure event exists.

## Relationship To Warning Copy

The badge should mirror the warning-copy ladder, not fight it.

Recommended pairing:

| Badge | Supporting copy |
| --- | --- |
| `Pending` | `Waiting for agent response.` |
| `Still waiting` | `Still waiting for agent response.` |
| `Delayed` | `This response is taking longer than expected.` |
| `Possibly stale` | `This command may be delayed or the dashboard may need refresh.` |

If space is tight:

- keep the badge visible
- collapse the longer sentence before collapsing the badge entirely

## Relationship To Other States

Keep the pending badge distinct from:

- stale summary badge
- blocked output pin
- general runtime error indicators

Why:

- pending severity is about one in-flight command
- stale summary is about dashboard freshness
- blocked/error states are stronger than pending delay

## Escalation Rules

Escalate the badge only when:

- the timeout tier advances
- or stronger stale cues support the escalation

Do not escalate just because:

- one poll cycle took slightly longer
- the page briefly lost focus

## De-Escalation Rules

Return the badge to a calmer state when:

- a fresh response arrives
- reconciliation confirms the command is no longer pending
- the command leaves the pending state entirely

Do not keep a strong pending badge visible after the underlying command has
resolved.

## What To Avoid

Do not use labels like:

- `Failed`
- `Timed out`
- `Broken`
- `Hung`

Do not use visual treatment that looks more severe than a real blocked or
error state.

## Minimal Example

```text
0s to 30s      -> Pending
30s to 2m      -> Still waiting
2m to 5m       -> Delayed
5m plus stale  -> Possibly stale
```

## Guardrails

- do not turn delay into fake failure
- do not keep every tier visually identical
- do not let the pending badge outrank real blocked/error states
- do not invent new tier names that drift from the warning-copy contract

## Follow-On Dependencies

This badge rule should feed:

- `define-dashboard-pending-warning-copy-rule`
- `define-dashboard-command-validation-rule`
- `define-dashboard-immediate-refresh-trigger-rule`
