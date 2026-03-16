Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Administrator Reprocess And Retry Lane

## Goal

Define the safe reprocess and retry path when raw payloads were stored but the
first normalization pass was partial, degraded, or failed.

## Focus

- retry triggers
- idempotency rules
- raw payload reuse
- operator-triggered reprocess
- audit trail on reruns

## Acceptance

- one reprocess lane packet is explicit
- retries do not duplicate intake truth accidentally
- reprocessing stays auditable and bounded
