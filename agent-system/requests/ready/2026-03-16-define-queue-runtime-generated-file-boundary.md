Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Queue Runtime Generated File Boundary

## Goal

Define which queue-health and projection artifacts are generated runtime files
versus source-truth docs or packets.

## Focus

- generated snapshot files
- source-truth packet boundaries
- retention expectations
- overwrite safety
- audit references

## Acceptance

- one generated-file-boundary packet is explicit
- queue runtime outputs stop blurring into source truth
