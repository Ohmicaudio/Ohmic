# Ohmic Master Administrator Aggregation Split And Dissolve Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define how aggregation bundles are corrected when grouping was wrong, becomes
stale, or no longer helps operator work.

## Core Rule

Aggregation should be reversible.

If grouping is wrong or no longer useful, the system should split or dissolve
the bundle explicitly instead of letting a bad grouping linger.

## Split Triggers

Split should be considered when:

- one member clearly belongs elsewhere
- only part of the bundle remains related
- operator correction identifies a subset that should separate

## Dissolve Triggers

Dissolve should be considered when:

- no meaningful shared handling remains
- the original grouping basis proved false
- all members were resolved independently and the bundle is now stale

## Operator Correction Rule

Operators should be able to:

- remove one member
- split a bundle into two bundles
- dissolve a bundle back into standalone intake items

Each correction should record:

- `changed_by`
- `changed_at`
- `change_type`
- `reason`

## Status Rule

Bundle status should surface correction needs:

- `active`
- `needs_review`
- `split_required`
- `dissolved`

The desk should not hide questionable groupings behind an always-active label.

## Minimal Example

```json
{
  "aggregation_bundle_id": "agg_20260316_003",
  "change_type": "split_member_out",
  "changed_by": "operator:d",
  "changed_at": "2026-03-16T12:24:00Z",
  "reason": "Third intake item belonged to a separate filing packet"
}
```

## First Safe Implementation

The first implementation only needs:

- split and dissolve triggers
- operator correction actions
- audit events for every correction

That is enough to keep grouped handling safe and reversible.
