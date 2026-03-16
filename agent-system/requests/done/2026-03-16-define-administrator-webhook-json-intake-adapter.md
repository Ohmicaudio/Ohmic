Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T044218Z-61fa8fec

# Define Administrator Webhook JSON Intake Adapter

## Goal

Define the first generic JSON-webhook intake adapter for provider-like external
events.

## Focus

- payload receipt
- JSON normalization
- attachment or blob refs
- schema drift handling
- routing hint generation

## Acceptance

- one webhook-json adapter packet is explicit
- malformed and partial payload behavior is explicit
- webhook intake fits the same envelope and staging rules as other sources

## Result

- completed as part of the grouped administrator intake-adapter family packet
- defined the webhook path in
  `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_WEBHOOK_JSON_INTAKE_ADAPTER_2026-03-16.md`
