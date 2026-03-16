Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T044918Z-42da8410

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

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_WARNING_REVIEW_QUEUE_PROJECTION_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_WARNING_REVIEW_QUEUE_PROJECTION_2026-03-16.md) with the flattened review-row JSON shape, sort rules, and exit behavior for degraded intake items.
