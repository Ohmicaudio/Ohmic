Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T044218Z-61fa8fec

# Define Administrator Filesystem Watch Intake Adapter

## Goal

Define the adapter for a watched folder or dropzone that feeds the Master
Administrator intake pipeline.

## Focus

- watch root
- arrival semantics
- duplicate detection
- file-to-envelope mapping
- staging and relocation rules

## Acceptance

- one filesystem-watch packet is explicit
- watched-folder intake is separated from manual import and provider APIs
- duplicate and relocation behavior are called out

## Result

- completed as part of the grouped administrator intake-adapter family packet
- defined the watched-folder path in
  `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_FILESYSTEM_WATCH_INTAKE_ADAPTER_2026-03-16.md`
