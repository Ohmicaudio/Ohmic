# Ohmic Intentionally Stale Or Superseded Ready Report

Date: 2026-03-16
Project: ohmic

## Purpose

Define the report used when a ready item is intentionally stale, intentionally
held, or already superseded by better packeting.

## Report Shape

`intentionally_stale_or_superseded_ready_report`

Required fields:

- `task_id`
- `family_id`
- `reason_code`
- `replacement_packet_id`
- `hold_owner`
- `reported_at`

## Reason Source

`reason_code` must come from the shared stale-ready intent reason catalog.

## Use Rule

This report exists so workers stop guessing whether a stale-looking ready item
is accidental drift or a deliberate hold.
