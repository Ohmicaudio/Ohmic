Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T022351Z-a3bdc877

# Define Project Overlay Configuration Layer For Administrator

## Goal

Define how project-specific behavior should live in overlays/configuration so
the administrator system can evolve without hardcoding Ohmic-specific routing
into the core.

## Focus

- provider/account mapping
- routing targets
- naming conventions
- folder destinations
- custom intake categories

## Acceptance

- one overlay/configuration model is defined
- project-specific behavior is clearly separated from the core
- future evolution does not require core rewrites by default

## Result

- defined the overlay split in
  `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_PROJECT_OVERLAY_CONFIGURATION_LAYER_2026-03-16.md`
- separated reusable administrator-core workflow from Ohmic-specific policy
  such as account labels, routing targets, destinations, and intake category
  language
- set up the next follow-on slices so the web shell can become project-aware
  without hardcoding Ohmic behavior into the administrator core
