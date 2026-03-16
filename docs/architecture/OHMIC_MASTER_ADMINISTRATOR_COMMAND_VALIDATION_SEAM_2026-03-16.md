# Ohmic Master Administrator Command Validation Seam

Date: 2026-03-16
Project: ohmic

## Purpose

Define the first concrete validation seam between browser-submitted
administrator command intent and backend writeback.

## Core Rule

The browser sends one bounded command intent.

The validation seam resolves action labels, checks policy and state, and emits
one bounded validation result object before any writeback happens.

## Seam Position

```text
browser command intent
-> command validation seam
-> validation result
-> writeback seam
-> projection refresh
```

## Inputs

The seam should consume:

- `AdministratorCommandIntent`
- overlay action policy
- action alias registry
- queue target registry
- approval requirement matrix
- action state restriction matrix
- intake current status and visibility scope

It should not depend on browser-local state guesses.

## Output

Suggested output object:

`AdministratorValidatedCommand`

Minimum fields:

- `command_id`
- `selected_intake_id`
- `resolved_action_type`
- `resolved_target_queue`
- `validation_status`
- `approval_requirement_status`
- `state_restriction_result`
- `rejection_reasons[]`
- `warning_reasons[]`
- `validated_at`

Suggested `validation_status` values:

- `accepted`
- `accepted_with_warnings`
- `rejected`

## Validation Steps

### 1. Resolve Action

- resolve incoming action label or alias to a canonical action id
- reject ambiguous aliases
- reject unknown actions

### 2. Resolve Target Queue

- if action uses a queue target, validate against the queue target registry
- reject deprecated or disallowed targets

### 3. Check Intake Visibility And Existence

- selected intake exists
- selected intake is visible in current desk scope

### 4. Check State Restrictions

- evaluate current intake status against the action state restriction matrix
- return `requires_reopen` where appropriate
- reject invalid transitions

### 5. Check Approval Requirement

- evaluate the command against the approval matrix
- set `approval_requirement_status`
- do not silently bypass approval-required outcomes

### 6. Check Required Fields

Examples:

- `route_to_orchestrator` requires a valid target queue
- `add_note` requires note text
- `tag_item` requires at least one tag

## Rejection Reasons

Suggested first reason codes:

- `unknown_action`
- `ambiguous_action_alias`
- `missing_intake`
- `intake_not_visible`
- `queue_target_invalid`
- `queue_target_deprecated`
- `state_transition_invalid`
- `reopen_required`
- `approval_required`
- `missing_required_field`

## Warning Reasons

Suggested first warning codes:

- `intake_normalized_with_warnings`
- `manual_review_required`
- `target_queue_advanced_visibility`

Warnings do not necessarily block the command, but they should stay explicit.

## Minimal Example Shape

```json
{
  "command_id": "cmd_20260316_001",
  "selected_intake_id": "intake_20260316_001",
  "resolved_action_type": "route_to_orchestrator",
  "resolved_target_queue": "orchestrator_bug_triage",
  "validation_status": "accepted",
  "approval_requirement_status": "freely_allowed",
  "state_restriction_result": "valid",
  "rejection_reasons": [],
  "warning_reasons": [],
  "validated_at": "2026-03-16T08:45:00Z"
}
```

## Relationship To Other Packets

This seam depends on:

- command validation and writeback surface
- overlay-driven action policy
- action alias registry
- queue target registry
- approval requirement matrix
- state restriction matrix

It should feed:

- reopen writeback seam
- command composer module
- recent actions projection generator

## First Safe Implementation

The first implementation only needs:

- input intent shape
- canonical action resolution
- queue target validation
- approval and state checks
- one validated output shape

That is enough to make the admin command path genuinely runtime-shaped instead
of only architectural.
