# Ohmic State Reconciliation Pass

Date: 2026-03-15
Status: working contract

## Purpose

Define the pass that refreshes `agent_state.json` from repo-backed queue,
claims, memory, and current JSON loop state so the live dashboard does not
drift from real system truth.

## Core Principle

`agent_state.json` is a summary surface.

It must be rebuilt from stronger sources instead of treated as the strongest
source itself.

## Authority Order

Use this order during reconciliation:

1. repo-backed queue truth
2. repo-backed claim truth
3. durable system/memory docs where relevant
4. append-only inbox/outbox logs
5. lock/runtime JSON files
6. existing `agent_state.json`

If `agent_state.json` disagrees with stronger sources, overwrite the summary.

## Inputs To Re-Read Each Cycle

Minimum recommended sources:

- `agent-system/requests/ready/`
- `agent-system/requests/done/`
- `agent-system/jobs/active/`
- `agent-system/memory/short-term.md`
- `agent-system/memory/mid-term.md`
- `agent_inbox.jsonl`
- `agent_outbox.jsonl`
- `agent_locks.json`
- `agent_runtime.json`

Optional summary inputs:

- generated `ready_tasks.json`
- generated `active_claims.json`

## Reconciliation Outputs

The pass should refresh these `agent_state.json` sections:

- `session`
- `input`
- `state`
- `response`

## What To Summarize Vs What To Copy

### Summarize

Summarize, do not blindly copy:

- ready task count
- active claim count
- board health
- top priority tasks
- current risk summary

### Copy directly when safe

Copy directly only when the field is already a live operational value:

- current session id
- current loop mode
- current input event id
- current response status

## Recommended Reconciliation Steps

1. read queue directories
2. read active claim files
3. read live inbox head and most recent outbox event
4. read lock/runtime files
5. compute queue counts and board health
6. compute current session and input summary
7. compute response summary from latest active work/result
8. overwrite `agent_state.json` with the refreshed summary

## Board Health Heuristic

Suggested mapping:

- `healthy`
  - queue above preferred floor
  - no stale leases
  - no obvious queue drift
- `thin`
  - queue below preferred floor but still actionable
- `stale`
  - queue/docs/claims disagree materially
- `blocked`
  - work exists but cannot proceed due to a real blocker

## Ready Task Summary Rule

`ready_tasks.json` may exist for convenience, but reconciliation should prefer
the actual `requests/ready/` directory if they disagree.

The generated summary is secondary.

## Active Claim Summary Rule

Use `jobs/active/` as the canonical live claim surface during reconciliation.

If `active_claims.json` disagrees, regenerate or mark stale rather than trusting
the stale summary.

## Input Summary Rule

The `input` block in `agent_state.json` should be derived from:

- the oldest unhandled actionable inbox event
- or a null/idle state if no actionable event exists

Do not infer input only from the last visible response.

## Response Summary Rule

The `response` block should reflect:

- the current active action if one exists
- otherwise the latest meaningful outbox status/result

If the system is idle, response status should show that honestly.

## Staleness Rule

Treat `agent_state.json` as stale when:

- queue counts no longer match repo truth
- current input points at an already-handled event
- active claim counts no longer match `jobs/active/`
- updated timestamps trail stronger inputs materially

When stale:

- rebuild the summary
- do not preserve stale convenience values out of habit

## Minimal Example

```text
repo truth -> live logs -> lock/runtime -> recompute summary -> write agent_state.json
```

## Guardrails

- do not let JSON summaries outrank Markdown/repo truth
- do not reconcile from generated summaries first
- do not preserve stale `agent_state.json` fields just because they exist
- do not make the reconciliation pass so heavy that it becomes a full reindex

## Follow-On Dependencies

This reconciliation pass should feed:

- `define-ready-and-active-summary-export-shape`
- `define-json-dashboard-render-surface`
- `define-json-dashboard-input-writeback-flow`
