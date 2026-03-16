Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
