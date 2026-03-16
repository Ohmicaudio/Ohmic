Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T022636Z-a16791b5

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

## Result

- defined the shared normalization seam in
  `docs/architecture/OHMIC_PROVIDER_AGNOSTIC_INTAKE_ENVELOPE_2026-03-16.md`
- split raw provider capture from higher-level administrator intake logic so
  Gmail, uploads, native imports, and future adapters can converge into one
  stable envelope family
- set up the next implementation lanes for native-format normalization,
  non-API adapters, and the first administrator web shell
