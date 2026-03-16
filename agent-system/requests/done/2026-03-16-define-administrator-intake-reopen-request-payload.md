Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T051522Z-15572a66

# Define Administrator Intake Reopen Request Payload

## Goal

Define the payload and audit surface used when archived or routed intake items
are explicitly reopened.

## Focus

- reopen request object
- linked intake and prior status
- operator reason
- validation hooks
- resulting status target

## Acceptance

- one reopen-request packet is explicit
- reopen behavior becomes a concrete action surface instead of a vague exception

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_INTAKE_REOPEN_REQUEST_PAYLOAD_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_INTAKE_REOPEN_REQUEST_PAYLOAD_2026-03-16.md) with the explicit reopen request object and linkage fields.
