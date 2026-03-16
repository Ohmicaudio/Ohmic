Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic

# Define Administrator Overlay-Driven Action Policy

## Goal

Define how project overlays control which administrator actions are available,
hidden, renamed, or restricted for a given project context.

## Focus

- allowed actions
- renamed labels
- approval requirements
- project-specific restrictions
- default versus overlay behavior

## Acceptance

- one overlay-action packet is explicit
- project-specific behavior stays in overlay policy instead of shell logic
- action availability can differ safely across projects
