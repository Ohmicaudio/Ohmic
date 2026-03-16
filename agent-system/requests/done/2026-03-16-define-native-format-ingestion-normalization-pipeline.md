Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T023246Z-a7d13836

# Define Native Format Ingestion Normalization Pipeline

## Goal

Define the early normalization path that converts raw external/provider input
into native internal structures with minimal transcription churn.

## Focus

- raw input capture
- provider metadata preservation
- normalization timing
- parsing confidence
- error/fallback handling

## Acceptance

- one native-format normalization path is defined
- token waste and transcription errors are reduced by design
- future intake work has one stable normalization model

## Result

- defined the early normalization seam in
  `docs/architecture/OHMIC_NATIVE_FORMAT_INGESTION_NORMALIZATION_PIPELINE_2026-03-16.md`
- separated raw input capture, native staging, and provider-agnostic envelope
  generation so the system stops re-parsing provider shapes at higher layers
- made parse confidence, preserved metadata, and fallback handling explicit so
  later intake and admin work can build on one stable ingestion model
