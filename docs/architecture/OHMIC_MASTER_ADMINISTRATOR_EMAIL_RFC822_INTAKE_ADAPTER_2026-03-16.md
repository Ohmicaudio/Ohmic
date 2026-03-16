# Ohmic Master Administrator Email RFC822 Intake Adapter

Date: 2026-03-16
Project: ohmic

## Purpose

Define the email-native intake adapter for RFC822 or equivalent captured mail
payloads inside the Master Administrator system.

## Adapter Role

This adapter turns one captured email message into:

- one raw payload reference
- one provider-agnostic intake envelope
- one attachment bundle seed
- one initial routing hint set

It should not depend on mailbox UI state.

## Native Input

Supported native format kinds:

- `email_rfc822`
- normalized provider mail export if it preserves the same message fields

## Required Extraction

From the message:

- subject
- plain-text body when available
- html body ref if preserved
- sender identity
- recipient list
- sent/received timestamp
- message id
- thread correlation hints
- attachment refs

## Envelope Mapping

Recommended envelope values:

- `native_format_kind`: `email_rfc822`
- `source_type`: `provider_api` or `manual` depending on how the email was
  captured
- `source_external_ref`: message id or provider message ref
- `title`: normalized subject
- `normalized_body`: plain text body or safe stripped fallback
- `attachment_refs[]`: one entry per extracted attachment

## Thread Correlation Hints

The adapter may emit advisory thread hints from:

- message id
- in-reply-to
- references
- normalized subject line
- sender/recipient overlap

These are hints, not final routing truth.

## Attachment Handling

Attachments should be mapped into the shared attachment bundle family with:

- filename
- mime type
- byte length
- checksum if available
- staged storage ref
- parse hints

## Warning Cases

Emit normalization warnings when:

- body is missing or malformed
- html cannot be safely reduced
- attachments are unreadable
- thread metadata is partial
- subject/body disagree strongly with attachment evidence

## Fallback Behavior

If text extraction is weak:

- preserve the raw payload ref
- lower parse confidence
- still emit the envelope with warning markers instead of failing closed

## Outcome

Email intake becomes one bounded adapter path that fits the same envelope and
attachment rules as every other administrator source.
