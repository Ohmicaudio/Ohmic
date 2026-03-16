Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Provider-Agnostic Intake Envelope

## Goal

Define the stable normalized object family that all outside-world intake items
should become before routing and administration logic take over.

## Focus

- intake id
- source type/account
- normalized text/body
- attachment references
- native format kind
- parsing confidence
- routing suggestion

## Acceptance

- one provider-agnostic intake envelope is defined
- providers can normalize into the same intake family
- administrator logic no longer depends on raw provider shapes
