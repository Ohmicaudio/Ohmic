Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T045427Z-e61b34ed

# Define Administrator Approval Request Payload Shape

## Goal

Define the payload generated when an administrator action resolves to
approval-required instead of directly valid.

## Focus

- approval request object
- reason fields
- linked intake and action ids
- operator-facing summary
- resolution linkage

## Acceptance

- one approval-request payload packet is explicit
- approval-gated actions have a stable handoff shape

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_APPROVAL_REQUEST_PAYLOAD_SHAPE_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_APPROVAL_REQUEST_PAYLOAD_SHAPE_2026-03-16.md) with the approval request object, linkage fields, and resolution lifecycle.
