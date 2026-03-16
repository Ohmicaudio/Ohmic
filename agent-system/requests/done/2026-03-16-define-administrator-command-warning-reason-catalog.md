Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T053212Z-41a79af1

# Define Administrator Command Warning Reason Catalog

## Goal

Define the stable catalog of warning reason codes emitted by the command
validation seam.

## Focus

- normalization warning reasons
- advanced target warnings
- review-required warnings
- advisory versus blocking distinction
- display labels

## Acceptance

- one warning-reason packet is explicit
- command warnings use stable codes instead of ad hoc labels

## Result

Done. The stable warning catalog now lives in
`tools/sync/administrator/command-reason-catalog.ps1` and covers
normalization, review, target-visibility, deprecation-migration, and
approval-gated advisory output.
