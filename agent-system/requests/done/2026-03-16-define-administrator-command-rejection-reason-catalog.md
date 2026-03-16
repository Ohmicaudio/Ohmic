Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T053212Z-41a79af1

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

## Result

Done. The stable rejection catalog now lives in
`tools/sync/administrator/command-reason-catalog.ps1` and is consumed by the
administrator overlay-resolution, queue-target validation, approval-evaluation,
and command-composer seams.
