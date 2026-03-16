# Ohmic Master Administrator Status History Record Family

Date: 2026-03-16
Project: ohmic

## Purpose

Define the durable record family that stores intake status transitions.

## Core Rule

Current status should be backed by an append-only transition history.

## Record Fields

- `status_history_record_id`
- `intake_id`
- `previous_status`
- `new_status`
- `changed_by`
- `changed_at`
- `transition_reason`

## First Safe Implementation

The first implementation only needs append-only status transition records with
actor, timestamp, and reason.
