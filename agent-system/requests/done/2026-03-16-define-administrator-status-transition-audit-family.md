Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T051522Z-15572a66

# Define Administrator Status Transition Audit Family

## Goal

Define the audit event family emitted when intake items change lifecycle state.

## Focus

- transition event ids
- prior and next state
- actor attribution
- linked command ids
- timestamps

## Acceptance

- one status-transition packet is explicit
- lifecycle changes remain fully reconstructable later

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_STATUS_TRANSITION_AUDIT_FAMILY_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_STATUS_TRANSITION_AUDIT_FAMILY_2026-03-16.md) with the explicit audit event family for lifecycle changes.
