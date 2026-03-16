# Ohmic Master Administrator Reprocess Trigger Catalog

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable reason catalog used when raw payloads, attachment bundles, or
individual assets are sent back through normalization or preview generation.

## Core Rule

Reprocess requests should use stable trigger codes, not freeform prose.

Human notes may explain context, but queue logic and reporting should depend on
a finite catalog.

## Trigger Families

### Parser quality triggers

- `body_parse_failed`
- `body_parse_partial`
- `low_confidence_text_extraction`
- `schema_drift_detected`

### Attachment and preview triggers

- `attachment_parse_failed`
- `attachment_preview_failed`
- `attachment_metadata_incomplete`
- `preview_generation_skipped`

### Storage and integrity triggers

- `raw_storage_recovered`
- `checksum_mismatch_detected`
- `derived_asset_missing`

### Operator and review triggers

- `operator_requested_full_rerun`
- `operator_requested_attachment_refresh`
- `operator_requested_preview_refresh`
- `warning_review_retry`

### Upgrade triggers

- `parser_version_upgraded`
- `previewer_version_upgraded`
- `normalization_rule_changed`

## Catalog Rules

Each request should carry:

- one primary trigger code
- optional `trigger_detail`
- optional related warning ids or asset ids

The primary trigger code should be enough to group retries for reporting and
policy decisions.

## Trigger Scope Hints

Recommended scope pairings:

- body parse issues -> `body_only` or `full_payload`
- preview failures -> `preview_only` or `single_asset`
- attachment metadata issues -> `attachment_bundle`
- schema or parser upgrades -> `full_payload`

These are hints, not hard constraints, but they keep retries consistent.

## Reporting Rule

The system should be able to answer:

- which trigger reasons happen most often
- which reasons usually self-heal after one retry
- which reasons keep escalating to manual review

That means the trigger catalog should remain short and normalized.

## Minimal Example

```json
{
  "trigger_reason": "attachment_preview_failed",
  "trigger_detail": "waveform renderer timed out for asset_20260316_022",
  "target_scope": "single_asset"
}
```

## First Safe Implementation

The first implementation only needs:

- the primary trigger families above
- one stable primary trigger code per reprocess attempt
- optional human-readable detail

That is enough to keep the retry lane consistent and reportable.
