Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
