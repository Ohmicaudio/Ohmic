Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Resolve AmpLab Vs Device Link Naming Boundary

## Goal

Define and apply one clear naming boundary so `AmpLab` only refers to the
AmpLab product/protocol surface, while generic connection and discovery
language moves to a neutral device-link vocabulary.

## Source

- `docs/architecture/OHMIC_DEVICE_LINK_PLANE_EXTRACTION_PROPOSAL_2026-03-15.md`
- current hardware-shell wording drift observed during AmpLab shell and
  phone-assisted link validation

## Focus

- distinguish:
  - AmpLab hardware/product meaning
  - AmpLab deck meaning
  - generic device-link meaning
- define the canonical vocabulary for:
  - shell/workspace
  - deck/panel
  - linked endpoint
  - discovery and link actions
- identify the first safe rename slice so the wording can improve without
  forcing a full architecture rewrite in one pass

## Acceptance

- one written naming resolution is recorded
- the resolution is strong enough to guide future UI copy and code naming
- the result makes it harder to confuse:
  - AmpLab the thing
  - AmpLab the deck
  - generic device-link behavior
