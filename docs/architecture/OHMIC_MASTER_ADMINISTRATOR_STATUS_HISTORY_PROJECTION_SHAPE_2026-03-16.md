# Ohmic Master Administrator Status History Projection Shape

Date: 2026-03-16
Project: ohmic

## Purpose

Define the JSON projection used to render intake status history in detail and
audit views.

## Core Rule

The desk should render status history from projected rows instead of rebuilding
transitions in the browser.

## Projection Fields

- `status_history_record_id`
- `previous_status`
- `new_status`
- `actor_label`
- `transition_reason`
- `changed_at`
- `is_current`

## First Safe Implementation

The first implementation only needs flattened projected rows with current-row
marking.
