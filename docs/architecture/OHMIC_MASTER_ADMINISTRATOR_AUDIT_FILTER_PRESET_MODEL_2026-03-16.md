# Ohmic Master Administrator Audit Filter Preset Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define reusable filter presets for audit and history views.

## Core Rule

Audit filtering should use named presets instead of forcing operators to rebuild
common filters manually every time.

## Preset Fields

- `preset_id`
- `display_label`
- `included_event_families[]`
- `included_statuses[]`
- `include_archived`
- `include_routed`

## First Safe Presets

- `all_activity`
- `status_changes`
- `reopen_events`
- `filing_changes`
- `tag_and_note_activity`

## First Safe Implementation

The first implementation only needs stable preset ids and included families.
