# Ohmic Master Administrator Intake Reopen Request Payload

Date: 2026-03-16
Project: ohmic

## Purpose

Define the payload emitted when an operator explicitly requests reopening an
archived or routed intake item.

## Core Rule

Reopen should be represented as an explicit request object, not a special-case
status mutation.

## Payload Fields

- `reopen_request_id`
- `intake_id`
- `previous_status`
- `requested_restored_status`
- `requested_by`
- `requested_at`
- `reopen_reason`

## First Safe Implementation

The first implementation only needs one reopen request object with prior status
and requested restored status.
