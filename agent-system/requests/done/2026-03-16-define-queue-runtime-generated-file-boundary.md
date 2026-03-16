Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
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
Claim ID: 20260316T100756Z-ae12ccd3

## Result

Defined the generated file boundary for queue-health runtime artifacts and documented the output set in tools/sync/queue-health/README.md.
