# Ohmic Master Administrator Reopen Audit Event Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit event family emitted when an archived or routed intake item is
reopened.

## Core Rule

Every successful reopen should emit a dedicated reopen event.

## Event Fields

- `reopen_event_id`
- `intake_id`
- `previous_status`
- `restored_status`
- `reopened_by`
- `reopened_at`
- `reopen_reason`

## First Safe Implementation

The first implementation only needs one explicit reopen event per successful
reopen.
