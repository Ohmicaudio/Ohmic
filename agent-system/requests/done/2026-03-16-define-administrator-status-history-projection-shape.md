Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T051522Z-15572a66

# Define Administrator Status History Projection Shape

## Goal

Define the JSON projection used to render intake status history in detail and
audit views.

## Focus

- status transition rows
- actor attribution
- transition reason
- timestamps
- current versus prior markers

## Acceptance

- one status-history projection packet is explicit
- status history can render without browser-side event reconstruction

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_STATUS_HISTORY_PROJECTION_SHAPE_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_STATUS_HISTORY_PROJECTION_SHAPE_2026-03-16.md) with the flattened status-history row used by detail and audit views.
