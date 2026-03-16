# Ohmic Claim Aware Ready Count Audit Event Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit events that explain why effective ready capacity differs from
the raw ready-folder count once active claims are taken into account.

## Event Family

### `ready_count_projection_refreshed`

Emit whenever the queue-health ready-count projection is regenerated.

Fields:

- `generated_at`
- `raw_ready_count`
- `effective_ready_count`
- `excluded_claimed_count`
- `excluded_nonready_count`
- `active_claim_count`

### `ready_count_claim_exclusion_detected`

Emit when one or more ready-folder packets are excluded because they are still
claimed by an active job.

Fields:

- `claim_id`
- `task_id`
- `file_path`
- `family_key`
- `detected_at`

### `ready_count_claim_overlap_cleared`

Emit when a previously claim-occupied ready entry becomes countable again after
claim completion or queue reconciliation.

Fields:

- `claim_id`
- `task_id`
- `file_path`
- `cleared_at`

## Operational Rule

These events are audit support, not queue authority.

The ready folder and active-claim folder stay authoritative. Audit events only
explain the count differences after the fact.

## First Bounded Use

The first runtime packet does not need a full event log writer yet. It only
needs the event family defined so later queue-health writebacks and review
surfaces can emit consistent records.
