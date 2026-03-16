Status: implementation_packet
Date: 2026-03-15
Project: ohmic

# Ohmic Master Administrator Web Scaffold

## Purpose

Define the first web-admin scaffold for the Master Administrator role using the
shared JSON/runtime work already in place.

## Role Definition

The Master Administrator is not the orchestrator by default.

The role is:

- outside-world intake
- aggregation
- triage
- routing
- file and message organization
- operator assistance

The role may notify the orchestrator when internal execution is required, but
it is not the same surface.

## Why Web First

The Master Administrator needs:

- anywhere access
- one desk for inboxes, uploads, drafts, approvals, and routing
- good operator search/filter/sort behavior
- easy pairing with the existing JSON/shared-memory loop

That makes a web app the strongest first surface.

## First Scaffold Shape

### 1. Intake Queue

Shows:

- inbound items
- source
- urgency
- routing status
- attachment presence

### 2. Aggregation Queue

Shows:

- grouped external messages
- grouped content/post candidates
- grouped bug reports / support notes

### 3. Routing Desk

Shows:

- suggested destination
- send to orchestrator
- file to archive
- mark as waiting
- request approval

### 4. Recent Actions / Audit

Shows:

- what got routed
- what got acknowledged
- what is waiting
- what failed

### 5. Command / Instruction Surface

Uses the same general writeback idea as the shared dashboard:

- one input box
- one submit action
- one acknowledgement state

## Existing Work We Can Reuse

- `OHMIC_LIVE_AGENT_STATE_JSON_CONTRACT_2026-03-15.md`
- `OHMIC_AGENT_RUNTIME_JSON_CONTRACT_2026-03-15.md`
- `OHMIC_AGENT_INBOX_OUTBOX_EVENT_MODEL_2026-03-15.md`
- `OHMIC_JSON_DASHBOARD_RENDER_SURFACE_2026-03-15.md`
- `OHMIC_JSON_DASHBOARD_INPUT_WRITEBACK_FLOW_2026-03-15.md`
- `OHMIC_ORCHESTRATOR_LOCK_AND_WORKER_HEARTBEAT_MODEL_2026-03-15.md`

## Provider/API Rule

Provider calls should not come directly from the browser.

Use:

- web admin surface
- backend/admin API
- provider adapters/connectors behind that API

That keeps:

- credentials off the client
- provider policy in one place
- auditability and retries in one place

## First Provider Boundary

Start with adapter-style provider integration:

- email provider adapter
- content/provider adapter
- upload/file intake adapter
- bug report / form adapter

The browser talks to the backend admin API.

The backend admin API talks to providers.

## Immediate Next Tasks

1. define master administrator intake domain model
2. define master administrator provider adapter boundary
3. define master administrator command routing surface
4. define master administrator file and email intake pipeline
5. later: scaffold the web admin shell against the current JSON state

## Boundary

This packet does not build the full admin app yet.

It gives us a sane starting shape so the next implementation slices can be
coherent instead of invented ad hoc.
