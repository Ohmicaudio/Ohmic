Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T051108Z-b51eec8a

# Define Administrator Attachment Preview Generation Boundary

## Goal

Define where and how attachment previews are generated without collapsing
preview generation into raw attachment storage or browser logic.

## Focus

- preview generation trigger
- generator ownership
- derived preview refs
- failure handling
- cold-storage boundary

## Acceptance

- one preview-generation packet is explicit
- preview behavior has a clear backend/runtime boundary

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_ATTACHMENT_PREVIEW_GENERATION_BOUNDARY_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_ATTACHMENT_PREVIEW_GENERATION_BOUNDARY_2026-03-16.md) with the backend/runtime ownership model, trigger sources, and derived preview-ref lifecycle.
