Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Administrator Action Alias Registry

## Goal

Define the registry that maps project-local display labels and aliases back to
canonical administrator action names.

## Focus

- canonical action ids
- project-local aliases
- display labels
- alias collision rules
- fallback labels

## Acceptance

- one alias-registry packet is explicit
- overlays can rename actions safely without forking behavior
