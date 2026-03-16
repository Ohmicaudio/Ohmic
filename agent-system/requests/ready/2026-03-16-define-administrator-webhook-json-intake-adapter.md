Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
