Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T060435Z-30dab42d

# Scaffold Administrator Filing Picker Read Seam

## Goal

Define or scaffold the read seam used by the admin shell filing picker.

## Focus

- filing destination registry input
- filing picker projection
- allowed intake-kind filtering
- archive default labels
- deprecated target hiding

## Acceptance

- one filing-picker read packet is explicit
- filing picker behavior has a concrete shell/runtime seam

## Result

Done. The filing-picker read seam now lives in
`tools/sync/administrator/filing-picker-read.ps1` and emits the bounded filing
picker projection with destination filtering, archive-default visibility,
advanced destination labeling, and disabled/selectable state.
