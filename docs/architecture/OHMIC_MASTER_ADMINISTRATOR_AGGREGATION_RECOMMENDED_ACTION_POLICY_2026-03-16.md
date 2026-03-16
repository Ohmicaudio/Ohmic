# Ohmic Master Administrator Aggregation Recommended Action Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define how aggregation bundles receive a suggested next action without turning
that suggestion into hidden workflow truth.

## Core Rule

Recommended next action should stay advisory.

The system may suggest what the operator likely wants to do, but it should not
execute a grouped action just because the bundle heuristic looks strong.

## Suggested Action Values

Suggested first values:

- `review_as_bundle`
- `split_before_review`
- `route_members_individually`
- `hold_bundle`
- `dissolve_bundle`

## Heuristic Inputs

Recommended action may consider:

- member count
- shared warning state
- membership confidence
- bundle kind
- operator overrides or prior corrections

## Policy Hints

### `review_as_bundle`

Best when bundle membership is strong and the bundle clearly represents one
packet or thread.

### `split_before_review`

Best when confidence is mixed or one member appears weakly related.

### `route_members_individually`

Best when grouped provenance is useful for trace, but routing decisions should
still happen per member.

### `hold_bundle`

Best when the bundle needs extra operator attention before any next action.

### `dissolve_bundle`

Best when the grouping basis is no longer meaningful.

## Override Rule

An operator may override the recommended action. The override should produce an
audit event rather than rewriting history as though the prior recommendation
never existed.

## First Safe Implementation

The first implementation only needs:

- a small advisory action vocabulary
- simple heuristic inputs
- explicit operator override handling

That is enough to keep bundle guidance useful and bounded.
