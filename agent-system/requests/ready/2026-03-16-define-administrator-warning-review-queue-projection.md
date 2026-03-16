Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Administrator Warning Review Queue Projection

## Goal

Define the JSON projection that feeds the administrator warning-review lane.

## Focus

- row shape
- warning reason fields
- sort order
- exit-state removal rules
- reprocess affordance fields

## Acceptance

- one warning-review projection packet is explicit
- the review lane can render from reconciled JSON instead of ad hoc joins
