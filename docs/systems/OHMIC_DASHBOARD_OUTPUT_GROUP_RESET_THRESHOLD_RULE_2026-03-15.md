# Ohmic Dashboard Output Group Reset Threshold Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when a repeated-event group should reset into a new group instead of
continuing to accumulate count forever.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_REPEATED_EVENT_GROUPING_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_ROUTINE_STATUS_DECAY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_OUTPUT_GROUP_SUMMARY_WORDING_RULE_2026-03-15.md`

## Core Principle

Grouped routine output should represent one recent burst of similar activity,
not an endless lifetime counter.

## Default Reset Triggers

Start a new group when any of these happen:

1. the event family changes materially
2. a higher-priority event interrupts the stream
3. enough time passes that a new event should feel like a fresh burst

## Event Family Change Rule

If the event meaning changes in a way users should care about, start a new
group immediately.

Examples:

- `Queue summary updated` -> `Routine refresh completed`
- `Heartbeat received` -> `Idle check passed`

Do not keep accumulating counts across different routine families just because
the events are all low priority.

## Higher-Priority Interruption Rule

If a higher-priority event appears between repeated routine events, reset the
group after the interruption.

Higher-priority interruptions include:

- blocked output
- needs-input output
- meaningful warning output
- major completion worth foreground space

Why:

- once a more important event interrupts the stream, the next routine event
  feels like a new phase rather than a continuation

## Time-Gap Reset Rule

Use a practical time-gap threshold for repeated routine events.

Recommended default:

- reset the group if the next matching event arrives more than `5` minutes
  after the previous grouped event

Why:

- short bursts should accumulate
- longer quiet gaps should start a fresh group

## Short-Gap Continuation Rule

If the next matching event arrives within `5` minutes and no higher-priority
interruption occurred:

- continue the current group
- increment the count

## Very Fast Burst Rule

If multiple matching routine events arrive within a very short span:

- continue the same group
- avoid creating several tiny adjacent groups

This is the normal grouping case, not a special exception.

## Count Reset Behavior

When a new group starts:

- reset the visible count to `x1` or begin counting from the first visible
  grouped threshold
- do not carry the old group total forward

The new group should represent the new burst only.

## Freshness Relationship

When a group resets:

- the new group gets a new freshness age
- the previous group's freshness should not bleed into the new one

That keeps grouped timing honest.

## Compact Example

```text
10:00 Queue summary updated
10:01 Queue summary updated
10:02 Queue summary updated
-> Queue summary updated x3

10:09 Queue summary updated
-> new group, not x4
```

## Interruption Example

```text
Queue summary updated x3
Blocked: claim collision detected
Queue summary updated
-> start a new queue-summary group
```

## Guardrails

- do not let routine groups accumulate forever across long gaps
- do not merge different routine families into one group
- do not continue a group past a meaningful higher-priority interruption
- do not make reset behavior so aggressive that every burst becomes noise again

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-routine-status-fade-timing-rule`
- `define-dashboard-output-event-collapse-rule`
- `define-dashboard-output-group-reset-boundary-rule`
