Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T044218Z-61fa8fec

# Define Administrator Email RFC822 Intake Adapter

## Goal

Define the first email-native intake adapter around RFC822 or equivalent
captured mail payloads.

## Focus

- source email payload storage
- subject and body extraction
- thread correlation hints
- attachment mapping
- warning and fallback cases

## Acceptance

- one email-native adapter packet is explicit
- mail normalization depends on the common envelope instead of mailbox-specific UI logic
- thread and attachment handling rules are called out

## Result

- completed as part of the grouped administrator intake-adapter family packet
- defined the email path in
  `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_EMAIL_RFC822_INTAKE_ADAPTER_2026-03-16.md`
