Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
