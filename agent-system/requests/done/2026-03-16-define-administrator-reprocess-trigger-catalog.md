Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T044918Z-42da8410

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

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_REPROCESS_TRIGGER_CATALOG_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_REPROCESS_TRIGGER_CATALOG_2026-03-16.md) with stable parser, attachment, integrity, operator, and upgrade trigger codes for reprocess attempts.
