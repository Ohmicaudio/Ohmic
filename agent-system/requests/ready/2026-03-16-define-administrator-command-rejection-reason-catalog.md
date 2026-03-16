Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Administrator Command Rejection Reason Catalog

## Goal

Define the stable catalog of rejection reason codes emitted by the command
validation seam.

## Focus

- unknown action reasons
- queue target reasons
- state restriction reasons
- approval-required reasons
- required-field reasons

## Acceptance

- one rejection-reason packet is explicit
- validation failures use stable codes instead of improvised strings
