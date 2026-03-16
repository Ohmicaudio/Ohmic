# Ohmic Master Administrator Web Scaffold Wave

Date: 2026-03-15
Project: ohmic

## Purpose

Define the first bounded web-admin scaffold for the Master Administrator so the
administrator role can become a real browser surface without collapsing into
the orchestrator, provider adapters, or internal worker tooling.

## Core Rule

The first web scaffold is an administrator desk.

It is not:

- the orchestrator UI
- a provider console
- a task execution dashboard

The scaffold should let an operator:

- review normalized intake items
- inspect attachments and source facts
- issue administrator routing commands
- see truthful routing and wait status

## Inputs It Can Reuse Now

The first web scaffold can sit on top of the current repo truth and runtime
bootstrap already in place:

- `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_INTAKE_DOMAIN_MODEL_2026-03-15.md`
- `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_PROVIDER_ADAPTER_BOUNDARY_2026-03-15.md`
- `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_FILE_AND_EMAIL_INTAKE_PIPELINE_2026-03-15.md`
- `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_COMMAND_ROUTING_SURFACE_2026-03-15.md`
- `generated/agent-work/runtime/agent_state.json`
- `generated/agent-work/runtime/agent_inbox.jsonl`
- `generated/agent-work/runtime/agent_outbox.jsonl`
- `generated/agent-work/runtime/agent_locks.json`

This means the first scaffold does not need a final provider implementation or
full orchestration layer before the surface can exist.

## Browser Surface Shape

The first safe scaffold should have four zones only:

### 1. Intake List

Purpose:

- show normalized outside-world items in one scrollable queue

Minimum fields:

- title
- intake kind
- status
- routing target
- trust tier
- received time
- tags

### 2. Intake Detail Panel

Purpose:

- show the selected intake record with its normalized facts

Minimum sections:

- summary
- source account and source thread ref
- attachment bundle summary
- operator notes
- linked internal objects

### 3. Routing Action Rail

Purpose:

- expose the administrator command set without turning the page into a task
  runner

Minimum actions:

- route to orchestrator
- hold
- archive
- request approval
- mark waiting on provider
- mark waiting on human
- add note
- tag item

### 4. Result and Audit Strip

Purpose:

- show the last accepted command result and the current truth after
  reconciliation

Minimum fields:

- command accepted or rejected
- updated status
- updated routing target
- created internal refs
- audit id
- last updated time

## What The Browser May Do

The browser may:

- render current intake truth
- submit administrator commands
- show pending local command state
- refresh reconciled backend results

The browser may not:

- call providers directly
- hold provider credentials
- mutate provider-specific payloads on its own
- create worker claims directly
- pretend to own orchestrator execution state

## Backend Dependency Boundary

The first scaffold depends on one thin backend admin API layer.

That layer should own:

- reading normalized intake items
- validating routing actions
- writing command and result state
- dispatching provider work later when needed
- producing audit entries

So the scaffold can launch before final provider adapters exist, as long as the
backend can accept and reconcile administrator commands against a JSON-backed
state source.

## Relationship To Current JSON Runtime

The first scaffold should reuse the existing JSON writeback and reconciliation
pattern instead of inventing a second loop.

Safe first flow:

1. browser reads reconciled administrator state
2. browser submits an administrator command payload
3. backend validates and writes result state
4. reconciled JSON-backed state feeds the browser again

That keeps the first scaffold aligned with the current dashboard/runtime model
already seeded in `generated/agent-work/runtime`.

## What Still Needs To Exist Before Implementation

Implementation can start once these bounded prerequisites are honored:

- intake objects have a stable normalized shape
- routing commands have a stable action/result shape
- one backend command handler exists
- one browser shell can read current JSON-backed state

Implementation does not need:

- every provider adapter
- every file or email source
- multi-worker scheduling
- full orchestrator execution UI

## First Safe Implementation Packet

Recommended first implementation slice:

1. list shell for normalized intake items
2. detail panel for one selected item
3. action rail wired to administrator routing commands
4. result strip showing reconciled result state

Everything else can stay stubbed or absent.

## Immediate Follow-On

This scaffold wave should feed these next slices:

1. project overlay configuration layer for administrator
2. provider-agnostic intake envelope
3. scaffold master administrator web shell against current JSON state

That order keeps architecture, configuration, and UI implementation from
drifting apart.
