Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Administrator Reprocess Trigger Catalog

## Goal

Define the catalog of explicit reasons that can trigger raw-payload or
attachment reprocessing.

## Focus

- parser failure triggers
- operator-requested triggers
- preview-generation triggers
- schema drift triggers
- retry idempotency hints

## Acceptance

- one reprocess-trigger packet is explicit
- reprocess requests use a stable reason catalog
