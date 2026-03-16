# Ohmic Master Administrator Provider Adapter Boundary

Date: 2026-03-15
Project: ohmic

## Purpose

Define the clean boundary between:

- browser/admin surface
- backend admin APIs
- provider adapters/connectors

So the administrator role can work with email, files, and external services
without leaking provider logic or credentials into the browser.

## Core Rule

The browser never talks directly to providers.

The allowed flow is:

```text
browser admin surface
-> backend admin API
-> provider adapter
-> provider or connector
-> backend result/audit state
-> browser render/update
```

## Layer Responsibilities

### Browser/Admin Surface

Owns:

- list/detail rendering
- operator commands
- local pending state
- reading reconciled results

Does not own:

- provider credentials
- provider SDK wiring
- retry policy
- provider-specific payload signing
- direct API calls to Gmail, GitHub, IMAP, etc.

### Backend Admin API

Owns:

- request validation
- permission checks
- command normalization
- audit event creation
- dispatch to adapters
- retry and failure recording
- normalized response/state for the UI

This is the policy and trust boundary.

### Provider Adapter

Owns:

- provider-specific request mapping
- credential retrieval through backend-owned secret/config surfaces
- API translation
- provider response normalization
- provider error translation

Does not own:

- browser rendering
- task queue policy
- long-term business decisions

Adapters are translation and execution seams, not UI surfaces.

## Why This Boundary Matters

Without this split, the browser would start accumulating:

- provider auth logic
- brittle external API assumptions
- unsafe secret handling
- inconsistent retry behavior
- non-auditable side effects

The backend/provider seam keeps those risks centralized.

## Command Shape

The browser should submit backend-owned administrator commands, not provider
requests.

Example intent:

```json
{
  "command_type": "administrator.route_intake",
  "intake_id": "intake_20260315_001",
  "action": "provider_reply_needed",
  "payload": {
    "reply_template_id": "tmpl_support_ack_v1"
  }
}
```

The backend can then decide:

- whether a provider call is needed
- which provider adapter to use
- whether the command should be queued, retried, rejected, or escalated

## Credential Handling

Credentials and tokens must stay backend-only.

Rules:

- browser never receives raw provider secrets
- browser never signs provider requests
- backend resolves the right account/credential material
- adapters consume backend-supplied credentials only

The browser may know:

- account label
- provider kind
- safe connection status

The browser must not know:

- refresh tokens
- API keys
- mailbox passwords
- provider secret payloads

## Audit Model

Every provider-touching administrator command should create backend audit data.

Minimum audit fields:

- `audit_id`
- `command_id`
- `operator_id`
- `provider_kind`
- `adapter_action`
- `requested_at`
- `completed_at`
- `result`
- `error_code`

The browser should render audit summaries, not synthesize success text.

## Retry Model

Retry behavior belongs in the backend layer, not in the browser.

Recommended backend outcomes:

- `accepted`
- `completed`
- `failed_retryable`
- `failed_terminal`
- `waiting_on_auth`
- `waiting_on_provider`

This lets the browser show truthful state without embedding provider timing
rules into the UI.

## Relationship To The Current JSON Runtime

The browser can still use the current JSON/dashboard writeback pattern as the
command surface:

- browser writes/requests an admin action
- backend processes and records result state
- dashboard/admin surface renders reconciled status

But the provider interaction itself must remain behind the backend boundary.

So this model aligns with the current append/handle/reconcile loop instead of
inventing a direct external-call path from the browser.

## Immediate Follow-On

This boundary should feed:

1. file and email intake pipeline
2. command routing surface
3. web scaffold wave

Those tasks can now assume:

- browser speaks admin intent
- backend owns trust and policy
- provider adapters own external integration details
