# Ohmic Master Administrator Webhook JSON Intake Adapter

Date: 2026-03-16
Project: ohmic

## Purpose

Define the generic JSON-webhook intake adapter for provider-like external
events.

## Adapter Role

This adapter turns one inbound JSON payload into:

- one raw payload reference
- one provider-agnostic intake envelope
- optional attachment/blob refs
- routing hints and normalization warnings

## Supported Input

- JSON request body
- optional headers and webhook metadata
- optional blob references or signed asset URLs

## Core Mapping

Recommended envelope values:

- `source_type`: `provider_api`
- `native_format_kind`: `json_api_payload`
- `source_external_ref`: provider event id if present
- `title`: extracted event summary or subject-like field
- `normalized_body`: structured summary from the payload

## Schema Drift Handling

The adapter should tolerate:

- unknown fields
- missing optional fields
- nested payload variation

It should emit warnings when the payload is malformed or only partially
understood, not fail silently.

## Attachment Or Blob References

If the webhook points to external assets:

- store the blob refs as attachment refs or staged external refs
- do not require all blobs to be fetched before the envelope exists

## Routing Hint Generation

The adapter may suggest:

- likely intake kind
- likely priority
- likely tags

based on known payload fields, event kind, and source account identity.

## Partial And Malformed Payload Behavior

### Partial But Usable

- emit envelope
- lower confidence
- attach warnings

### Malformed Or Unsafe

- keep raw payload ref
- emit failure or manual-review warning record
- avoid claiming a clean normalized summary

## Outcome

Webhook JSON intake fits the same envelope and staging rules as other
administrator sources without binding the system to one provider schema.
