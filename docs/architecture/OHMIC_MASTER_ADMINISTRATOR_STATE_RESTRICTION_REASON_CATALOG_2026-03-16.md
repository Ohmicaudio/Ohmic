# Ohmic Master Administrator State Restriction Reason Catalog

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable reason catalog used when an action is invalid or requires
reopen from the current intake state.

## Core Rule

State-validation feedback should use stable reason codes, not freeform
rejection text.

## First Reason Codes

- `already_in_requested_state`
- `archived_requires_reopen`
- `routed_requires_reopen`
- `transition_disallowed_from_failed`
- `transition_disallowed_from_captured`

## Display Fields

- `reason_code`
- `display_label`
- `result_kind`

Suggested `result_kind` values:

- `invalid`
- `requires_reopen`

## First Safe Implementation

The first implementation only needs a short reason code catalog and labels.
