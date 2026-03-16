# Ohmic Master Administrator Status Transition Audit Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit event family emitted when intake items change lifecycle state.

## Core Rule

Every status change should produce a corresponding audit event in addition to a
history record.

## Event Fields

- `status_transition_event_id`
- `intake_id`
- `previous_status`
- `new_status`
- `changed_by`
- `changed_at`
- `linked_command_id`

## First Safe Implementation

The first implementation only needs one transition event per successful status
change.
