# Ohmic Master Administrator Inactive Intake Filter Preset Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define the preset filters used when browsing inactive intake items.

## Core Rule

Inactive-item views should use stable preset ids rather than ad hoc status
combinations.

## First Presets

- `archived_only`
- `routed_only`
- `held_only`
- `waiting_only`
- `inactive_all`

## Preset Fields

- `preset_id`
- `display_label`
- `included_statuses[]`
- `default_sort`

## First Safe Implementation

The first implementation only needs preset ids, labels, and status lists.
