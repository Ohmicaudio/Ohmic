# Ohmic Dashboard Routine Status Fade Timing Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define the exact timing progression for how routine status should move from
fresh to fading to grouped or collapsed.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_ROUTINE_STATUS_DECAY_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_REPEATED_EVENT_GROUPING_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_OUTPUT_GROUP_RESET_THRESHOLD_RULE_2026-03-15.md`

## Core Principle

Routine output should briefly confirm activity, then step back quickly enough
to keep the dashboard readable.

## Timing Stages

Use three routine-status stages:

1. fresh
2. fading
3. grouped_or_collapsed

## 1. Fresh Stage

Duration:

- `0-12` seconds after the event appears

Behavior:

- show the routine event at normal routine visibility
- keep it readable without making it look high priority

Why:

- this is enough time to confirm that the loop is alive and doing work

## 2. Fading Stage

Duration:

- `13-45` seconds after the event appears

Behavior:

- reduce emphasis or contrast
- keep the event readable if it is still the newest line
- allow it to remain visible without competing with newer or more important
  output

Why:

- routine output is still useful briefly, but it should no longer feel current

## 3. Grouped Or Collapsed Stage

Entry conditions:

- age exceeds `45` seconds
- or additional routine output begins to accumulate
- or a higher-priority event needs the space sooner

Behavior:

- prefer grouping for repeated routine families
- otherwise collapse or de-emphasize the row so it stops behaving like primary
  output

## Higher-Priority Acceleration Rule

If a higher-priority event appears while routine output is still visible:

- move routine rows to fading immediately if they were still fresh
- allow grouped_or_collapsed treatment as early as `15` seconds total age when
  the new higher-priority event needs the space

This keeps blocked, needs-input, warning, and major completion output legible.

## Repetition Rule

If another routine event from the same family arrives during the fading stage:

- prefer grouping instead of refreshing the older row back to fresh
- let the new grouped line become the current visible summary

Do not keep several fading near-duplicates on screen just because they arrived
inside the same minute.

## Quiet-Screen Rule

If the dashboard is otherwise quiet:

- routine rows may remain faintly visible a little longer
- but they should still stop behaving like fresh output after `45` seconds

Quietness can soften collapse, but it should not reset the lifecycle.

## Minimal Timeline

```text
0-12s   -> fresh
13-45s  -> fading
46s+    -> grouped_or_collapsed
```

## Example

```text
00s  Queue summary updated      -> fresh
18s  Queue summary updated      -> fading
50s  Queue summary updated      -> grouped/collapsed unless still uniquely useful
```

## Guardrails

- do not leave routine rows in fresh state for too long
- do not fade them so fast that the dashboard looks dead
- do not refresh old routine rows back to fresh just because a matching event
  repeated
- do not let routine timing outrank higher-priority output needs

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-output-event-collapse-rule`
- `define-dashboard-routine-status-fade-style-rule`
- `define-dashboard-output-pane-priority-balance-rule`
