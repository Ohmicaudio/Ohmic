# Ohmic Master Administrator Audit Summary Projection

Date: 2026-03-16
Project: ohmic

## Purpose

Define the compact projection used to render audit summaries in desk and audit
surfaces.

## Core Rule

Audit summary cards should render from one flattened projection row.

## Projection Fields

- `event_id`
- `event_family`
- `intake_id`
- `summary_label`
- `actor_label`
- `occurred_at`

Optional:

- `status_delta`
- `target_label`

## First Safe Implementation

The first implementation only needs one row per audit event with a compact
summary label.
