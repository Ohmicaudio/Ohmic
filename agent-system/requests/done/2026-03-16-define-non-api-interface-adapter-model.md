Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T023519Z-1fd80a4b

# Define Non-API Interface Adapter Model

## Goal

Define how non-API interfaces like local folder intake, drag-and-drop imports,
manual operator paste, and device-assisted surfaces plug into the
administrator/intake system.

## Focus

- local folder watchers
- upload/drop surfaces
- manual operator imports
- future device-assisted interfaces

## Acceptance

- non-API interfaces are first-class citizens
- one adapter shape is defined
- the system no longer assumes every meaningful intake path is a provider API

## Result

- defined the shared adapter shape in
  `docs/architecture/OHMIC_NON_API_INTERFACE_ADAPTER_MODEL_2026-03-16.md`
- made local folders, uploads, manual paste, and device-assisted surfaces
  first-class ingestion lanes instead of awkward exceptions to provider APIs
- aligned all non-API inputs with the same native ingestion pipeline and
  provider-agnostic envelope path used by the broader administrator system
