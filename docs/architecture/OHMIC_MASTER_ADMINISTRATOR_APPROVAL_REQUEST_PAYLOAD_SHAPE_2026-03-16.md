# Ohmic Master Administrator Approval Request Payload Shape

Date: 2026-03-16
Project: ohmic

## Purpose

Define the payload emitted when a user action resolves to approval-required
instead of being applied directly.

## Core Rule

Approval-required actions should produce a durable request object, not a vague
validation error.

The handoff should carry enough context for approval without recreating the
original command from scratch.

## Payload Shape

Suggested object:

`AdministratorApprovalRequest`

Minimum fields:

- `approval_request_id`
- `intake_id`
- `requested_action_id`
- `requested_action_payload`
- `approval_requirement_status`
- `approval_reason`
- `approval_target_type`
- `request_summary`
- `requested_by`
- `requested_at`
- `status`

Suggested `status` values:

- `pending`
- `approved`
- `rejected`
- `expired`
- `cancelled`

## Linkage Rule

The approval request should link back to:

- the original intake item
- the attempted canonical action
- the queue target or state transition, if relevant

It should also support a forward link to the eventual resolution record.

## Resolution Rule

The payload should allow:

- approving the original requested action
- rejecting it with a reason
- recording who resolved it and when

Approval should not silently drop the underlying requested action payload.

## Minimal Example

```json
{
  "approval_request_id": "approval_20260316_021",
  "intake_id": "intake_20260316_021",
  "requested_action_id": "route_to_orchestrator",
  "requested_action_payload": {
    "queue_target_id": "hardware_followup"
  },
  "approval_requirement_status": "approval_required",
  "approval_reason": "sensitive_intake_route",
  "approval_target_type": "operator",
  "request_summary": "Route sensitive intake to Hardware Follow-Up.",
  "requested_by": "operator:d",
  "requested_at": "2026-03-16T11:25:00Z",
  "status": "pending"
}
```

## First Safe Implementation

The first implementation only needs:

- the durable request object
- linkage to intake and requested action
- approval reason and target type
- lifecycle status

That is enough to keep approval-gated actions explicit and auditable.
