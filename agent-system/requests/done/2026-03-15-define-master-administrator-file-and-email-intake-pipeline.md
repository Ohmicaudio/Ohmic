Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260316T021326Z-ea87a48e

# Define Master Administrator File And Email Intake Pipeline

## Goal

Define the first ingestion path for file and email intake so the administrator
role has one truthful outside-world intake lane to build around.

## Focus

- inbound email
- file drop/upload intake
- attachment capture
- normalization into administrator intake objects

## Acceptance

- one first intake pipeline is defined
- normalization boundaries are explicit
- future provider-specific work has a stable first lane

## Result

- defined the first email/file intake lane in
  `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_FILE_AND_EMAIL_INTAKE_PIPELINE_2026-03-15.md`
- made email and file drop converge through one normalization flow into
  `AdministratorIntakeItem`, `AttachmentBundle`, and `AttachmentAsset`
- recorded the first safe implementation packet so later admin web work can
  build around one truthful ingress path instead of separate raw-source models
