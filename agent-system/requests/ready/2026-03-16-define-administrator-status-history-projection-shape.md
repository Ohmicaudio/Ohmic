Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
