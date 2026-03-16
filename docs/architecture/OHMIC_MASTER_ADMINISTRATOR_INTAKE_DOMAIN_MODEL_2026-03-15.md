# Ohmic Master Administrator Intake Domain Model

Date: 2026-03-15
Project: ohmic

## Purpose

Define the core object model for outside-world intake so email, files, bug
reports, content requests, and external asks can be normalized before they are
routed into the internal execution system.

The key rule is simple:

- intake objects describe what arrived from the outside world
- internal task objects describe work we decided to do about it

Those are related, but they are not the same thing.

## Domain Boundary

The Master Administrator domain sits between outside-world sources and internal
execution systems.

It owns:

- inbound capture
- normalization
- attachment grouping
- operator notes
- routing intent
- status before internal execution ownership exists

It does not own:

- detailed project execution planning
- implementation task decomposition
- agent claims/locks
- provider-specific browser logic
- orchestrator execution state

## Core Objects

### 1. `AdministratorIntakeItem`

The primary normalized unit of outside-world intake.

Fields:

- `intake_id`
- `intake_kind`
  - `email`
  - `file_drop`
  - `bug_report`
  - `content_request`
  - `support_request`
  - `contact_message`
  - `external_tasking`
  - `mixed_bundle`
- `title`
- `summary`
- `received_at`
- `source_account_id`
- `source_thread_ref`
- `attachment_bundle_id`
- `status`
- `routing_target`
- `priority_hint`
- `trust_tier`
- `tags[]`
- `operator_note_ids[]`
- `linked_internal_objects[]`

Role:

- represents one outside-world item after normalization
- stays stable even if the eventual internal work splits into many tasks

### 2. `SourceAccount`

Describes where the item came from.

Fields:

- `source_account_id`
- `provider_kind`
  - `gmail`
  - `imap`
  - `github`
  - `discord`
  - `web_form`
  - `filesystem`
  - `manual`
- `account_label`
- `external_identity`
- `trust_tier`
- `auth_scope_ref`

Role:

- lets the admin layer reason about provenance without leaking provider auth
  rules into every intake item

### 3. `AttachmentBundle`

Groups the files or payloads that arrived with an intake item.

Fields:

- `attachment_bundle_id`
- `intake_id`
- `asset_ids[]`
- `primary_asset_id`
- `capture_status`
- `normalization_status`
- `storage_refs[]`

Role:

- keeps attachment capture separate from the intake summary itself
- supports one intake item having many files without turning the intake object
  into a giant blob

### 4. `AttachmentAsset`

Represents one captured attachment or file-like payload.

Fields:

- `asset_id`
- `bundle_id`
- `filename`
- `mime_type`
- `byte_length`
- `checksum`
- `storage_ref`
- `ingest_state`
- `parse_hints[]`

Role:

- records file identity and storage facts
- does not decide routing by itself

### 5. `RoutingTarget`

The normalized destination intent for an intake item.

Values:

- `administrator_hold`
- `orchestrator_queue`
- `approval_wait`
- `archive`
- `follow_up_needed`
- `provider_reply_needed`
- `human_review`

Role:

- states where the item should go next
- keeps routing intent explicit before a task exists

### 6. `OperatorNote`

A human/admin annotation attached to the intake item.

Fields:

- `note_id`
- `intake_id`
- `author`
- `created_at`
- `note_kind`
  - `triage`
  - `clarification`
  - `risk`
  - `customer_reply_draft`
  - `handoff`
- `body`

Role:

- preserves admin judgment without mutating the original intake facts

## Status Model

Recommended `AdministratorIntakeItem.status` values:

- `captured`
- `normalized`
- `triaged`
- `waiting_on_human`
- `waiting_on_provider`
- `routed`
- `archived`
- `rejected`

Meaning:

- status tracks administrator handling state
- it does not claim the downstream work is finished

## Internal Links

`linked_internal_objects[]` should allow lightweight references to things that
were created because of the intake item.

Examples:

- `task_request_id`
- `job_claim_id`
- `support_ticket_id`
- `content_packet_id`
- `project_overlay_id`

This keeps the intake object as the outside-world source record while still
letting the system correlate downstream work.

## Explicit Difference From Internal Task Objects

An intake item is not an execution request by default.

Examples:

- one inbound email may produce zero internal tasks
- one bug report may produce several internal tasks
- one mixed attachment drop may get split across content, support, and data
  review lanes

So:

- `AdministratorIntakeItem` answers "what arrived?"
- internal task/request objects answer "what work are we doing about it?"

## Minimal JSON Shape

```json
{
  "intake_id": "intake_20260315_001",
  "intake_kind": "email",
  "title": "Fold device smoke failed to discover live AmpLab",
  "summary": "Operator forwarded a handset test report with one screenshot and one log file.",
  "received_at": "2026-03-15T20:12:00Z",
  "source_account_id": "src_gmail_ops",
  "source_thread_ref": "gmail:18d4c1...",
  "attachment_bundle_id": "bundle_20260315_001",
  "status": "triaged",
  "routing_target": "orchestrator_queue",
  "priority_hint": "normal",
  "trust_tier": "known-operator",
  "tags": ["handset", "amplab", "smoke"],
  "operator_note_ids": ["note_20260315_001"],
  "linked_internal_objects": [
    {
      "kind": "task_request_id",
      "ref": "2026-03-15-verify-phone-assisted-amplab-live-smoke-path"
    }
  ]
}
```

## Why This Model Is Strong Enough

This model is enough to support:

- the first file/email intake pipeline
- provider adapters that normalize into one shared shape
- a web admin list/detail view
- command routing decisions
- later audit/reporting surfaces

Without forcing:

- provider logic into the browser
- one generic blob for every outside-world artifact
- premature merging with orchestrator task objects

## Immediate Follow-On

The next administrator tasks can now build on this model in order:

1. file/email intake pipeline
2. provider adapter boundary
3. command routing surface
4. web scaffold wave
