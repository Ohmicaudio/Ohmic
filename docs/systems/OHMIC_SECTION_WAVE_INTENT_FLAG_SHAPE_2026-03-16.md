# Ohmic Section Wave Intent Flag Shape

Date: 2026-03-16
Project: ohmic

## Purpose

Define the flag that marks a queue family as one coherent grouped section wave
instead of many unrelated singles.

## Flag Shape

`section_wave_intent_flag`

Required fields:

- `family_id`
- `parent_packet_id`
- `grouped_wave_intent`
- `child_task_count`
- `parallel_family_context`
- `reported_at`

## Field Meaning

- `family_id` identifies the lane the wave belongs to
- `parent_packet_id` identifies the grouped packet or parent from which the
  children came
- `grouped_wave_intent` is `true` when the wave should be treated as one
  coherent packet family
- `child_task_count` reports the number of active children in the grouped wave
- `parallel_family_context` explains which sibling families were intended to
  coexist during the wave

## Use Rule

This flag should travel with queue truth and worker-facing reports so a fast
burst is interpreted as intentional grouping rather than noisy task spam.

## Non-Goal

The flag does not replace request files or claims.

It is only the stable runtime/reporting shape that explains grouped intent.
