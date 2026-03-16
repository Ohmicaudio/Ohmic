# Ohmic Master Administrator Approval Requirement Matrix

Date: 2026-03-16
Project: ohmic

## Purpose

Define how the Master Administrator system decides whether an action is freely
allowed, approval-gated, or disallowed based on canonical action type, overlay
policy, and intake context.

## Core Rule

Action availability is not enough.

Some allowed actions still require approval before they can be applied.

## Why This Matrix Exists

Without a dedicated approval matrix:

- approval rules would get mixed into generic action availability
- projects would hide approval behavior in ad hoc shell logic
- validation would not be able to explain why an action was blocked

The matrix keeps:

- action availability
- approval requirements
- disallowed behavior

as separate concerns.

## Decision States

Suggested approval outcomes:

- `freely_allowed`
- `approval_required`
- `disallowed`

Optional warning outcome:

- `allowed_with_warning`

The first shell does not need all of these surfaced equally, but backend
validation should be able to distinguish them.

## Matrix Inputs

Approval requirements should be decided from:

- canonical action id
- intake kind
- intake trust hint or sensitivity
- current intake status
- overlay context

This keeps approval logic context-aware without letting every project fork the
whole model.

## First Safe Default Rules

Suggested defaults:

- `add_note` -> `freely_allowed`
- `tag_item` -> `freely_allowed`
- `hold` -> `freely_allowed`
- `archive` -> `freely_allowed`
- `waiting_on_provider` -> `freely_allowed`
- `waiting_on_human` -> `freely_allowed`
- `route_to_orchestrator` -> `freely_allowed`
- `request_approval` -> `freely_allowed` because it is the action that creates
  an approval path rather than bypassing one

These defaults can be tightened by overlay policy.

## Sensitivity And Intake Kind Rule

Overlays should be able to require approval when:

- intake kind is sensitive
- trust hint is weak
- manual review is already required
- the route target is escalation-heavy

Examples:

- public-facing communications triage may require approval for route or archive
  actions
- low-trust webhook or ambiguous intake may require approval before archival

## Overlay Override Rule

Overlays may tighten defaults by declaring:

- action always requires approval
- action requires approval only for certain intake kinds
- action is fully disallowed in this project

Overlays should not silently loosen globally disallowed rules without an
explicit future policy packet.

## Validation Result Use

The approval matrix should feed command validation with:

- `approval_requirement_status`
- `approval_reason`
- `approval_target_type`

Examples:

- `approval_requirement_status: approval_required`
- `approval_reason: low_trust_intake_archive_attempt`
- `approval_target_type: operator`

This gives the shell and audit logs a concrete reason instead of a generic
rejection.

## Relationship To Other Packets

This matrix depends on:

- overlay-driven action policy
- intake status lifecycle
- command validation and writeback surface

It should not replace any of those.

## Minimal Example Shape

```json
{
  "overlay_context_id": "overlay_ohmic",
  "approval_matrix": [
    {
      "canonical_action_id": "archive",
      "intake_kind": "bug_report",
      "trust_hint": "unknown_source",
      "current_status": "queued",
      "approval_requirement_status": "approval_required",
      "approval_reason": "low_trust_archive",
      "approval_target_type": "operator"
    },
    {
      "canonical_action_id": "add_note",
      "intake_kind": "*",
      "trust_hint": "*",
      "current_status": "*",
      "approval_requirement_status": "freely_allowed",
      "approval_reason": "safe_annotation",
      "approval_target_type": null
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- decision states
- action + intake-kind matching
- overlay tightening rules
- approval reason strings

That is enough to keep approval behavior explicit without overbuilding the full
approval workflow.
