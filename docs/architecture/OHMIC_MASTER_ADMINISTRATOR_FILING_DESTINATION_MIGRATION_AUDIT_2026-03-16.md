# Ohmic Master Administrator Filing Destination Migration Audit

Date: 2026-03-16
Project: ohmic

## Purpose

Define the audit record used when a deprecated filing destination is migrated to
another destination.

## Core Rule

Filing migration should record both the original and replacement destination.

## Audit Fields

- `filing_migration_event_id`
- `intake_id`
- `previous_filing_destination_id`
- `new_filing_destination_id`
- `changed_by`
- `changed_at`
- `reason`

## First Safe Implementation

The first implementation only needs one explicit migration event per filing
destination change.
