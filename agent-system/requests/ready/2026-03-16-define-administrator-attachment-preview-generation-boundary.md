Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
