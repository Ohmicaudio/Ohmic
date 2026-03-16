Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic

# Define Administrator Raw Payload Storage And Reprocessing Boundary

## Goal

Define how raw captured payloads are retained, referenced, and reprocessed
without polluting normal administrator-facing objects.

## Focus

- raw payload refs
- retention classes
- reprocessing triggers
- provenance guarantees
- cold storage versus hot desk surfaces

## Acceptance

- one raw-payload boundary packet is explicit
- reprocessing is possible without making raw blobs the default desk surface
- retention and provenance rules are clear
