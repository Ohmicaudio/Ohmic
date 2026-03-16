# Ohmic Master Administrator Note Edit Audit Diff Shape

Date: 2026-03-16
Project: ohmic

## Purpose

Define the diff shape recorded when administrator notes are edited.

## Core Rule

Note edits should preserve both the edit event and a bounded diff summary.

## Diff Fields

- `note_id`
- `previous_body_hash`
- `new_body_hash`
- `changed_by`
- `changed_at`
- `change_summary`

Optional:

- `previous_visibility`
- `new_visibility`

## First Safe Implementation

The first implementation only needs bounded summary text plus before/after
hashes.
