# Ohmic Master Administrator Attachment Warning And Reprocess Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how warning states and reprocess eligibility work at both the attachment
asset layer and the attachment bundle layer.

## Core Rule

Attachment warnings should be explicit per asset and roll up predictably to the
bundle.

Retry decisions should follow those explicit states instead of hand-written desk
judgment each time.

## Asset Warning States

Suggested first asset warning states:

- `none`
- `notice`
- `warning`
- `blocking`

Suggested common asset warning families:

- `preview_failed`
- `parse_failed`
- `metadata_incomplete`
- `unsupported_preview`
- `integrity_risk`

## Bundle Rollup Rules

An attachment bundle should roll up from assets as follows:

- any `blocking` asset -> bundle `manual_review_required`
- otherwise any `warning` asset -> bundle `partial`
- otherwise any `notice` asset -> bundle `notice`
- otherwise bundle `none`

The bundle should also keep:

- `warning_asset_count`
- `blocking_asset_count`
- `reprocess_eligible_asset_count`

## Reprocess Eligibility

An asset is reprocess-eligible when:

- raw storage still exists
- the failure mode is retryable
- the asset is not under a terminal integrity or legal hold state

Suggested retryable families:

- preview generation failure
- OCR/text extraction failure
- metadata extraction drift
- parser upgrade opportunity

Suggested non-retryable or operator-only families:

- attachment intentionally unsupported
- irrecoverable corruption with no alternate source

## Desk Actions

First safe actions at the asset or bundle layer:

- open preview or diagnostics
- queue reprocess
- mark safe
- hold for manual review

Bundle-level queue actions should never obscure which asset caused the problem.

## Reprocess Scope Mapping

- one bad asset -> prefer `single_asset`
- several assets sharing one renderer/parser failure -> prefer `attachment_bundle`
- body plus attachment degradation -> prefer `full_payload`

## Minimal Example

```json
{
  "attachment_bundle_id": "bundle_20260316_014",
  "bundle_warning_state": "partial",
  "warning_asset_count": 2,
  "blocking_asset_count": 0,
  "reprocess_eligible_asset_count": 1,
  "assets": [
    {
      "asset_id": "asset_20260316_021",
      "warning_state": "warning",
      "warning_family": "preview_failed",
      "reprocess_eligible": true
    }
  ]
}
```

## First Safe Implementation

The first implementation only needs:

- explicit asset warning state and family
- predictable bundle rollup
- reprocess-eligible flag and counts
- scope hints for asset versus bundle retry

That is enough for consistent operator review and retry behavior.
