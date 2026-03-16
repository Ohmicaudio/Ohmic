# Ohmic Master Administrator Audit Actor Label Projection

Date: 2026-03-16
Project: ohmic

## Purpose

Define the projected actor labels used in audit and history views.

## Core Rule

Audit surfaces should show one normalized actor label regardless of whether the
source actor was a human, system process, or agent.

## Projection Fields

- `actor_id`
- `actor_class`
- `display_label`
- `short_label`

Suggested `actor_class` values:

- `human_operator`
- `system`
- `agent`

## First Safe Implementation

The first implementation only needs normalized labels and actor class.
