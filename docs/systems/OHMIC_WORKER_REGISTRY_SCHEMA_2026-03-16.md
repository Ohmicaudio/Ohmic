# Ohmic Worker Registry Schema

Date: 2026-03-16
Project: ohmic

## Purpose

Define the stable registry record for each worker so naming, role, trust,
provider or model identity, capability limits, and project overlay bindings are
explicit.

## Core Rule

Every worker should have one stable canonical record.

Project-local aliases and display names may vary, but they should resolve back
to the same canonical worker identity.

## Why A Registry Is Needed

Without a registry, worker handling drifts across:

- unstable names
- ad hoc model labels
- inconsistent trust assumptions
- missing quota and budget data
- unclear fallback ownership

The registry is the stable control surface for those facts.

## Recommended Registry Object

Suggested object:

`WorkerRegistryRecord`

Minimum fields:

- `worker_id`
- `display_name`
- `local_aliases[]`
- `worker_class`
- `role_family`
- `provider_identity`
- `model_identity`
- `trust_tier`
- `capabilities[]`
- `restricted_surfaces[]`
- `fallback_workers[]`
- `project_overlay_bindings[]`
- `quota_policy`
- `context_budget_policy`
- `status`

## Stable Worker Identity

Required fields:

- `worker_id`
- `display_name`
- `local_aliases[]`

Rules:

- `worker_id` is canonical and stable
- `display_name` is human-friendly
- `local_aliases[]` captures project or route-local shorthand

Alias handling should never create fake duplicate workers.

## Worker Class And Role Family

Suggested fields:

- `worker_class`
  - `human_operator`
  - `automation_worker`
  - `model_route`
  - `hybrid`
- `role_family`
  - `docs`
  - `implementation`
  - `verification`
  - `orchestration`
  - `intake`
  - `analysis`

This separates what a worker is from what kind of work it usually handles.

## Provider And Model Identity

Suggested fields:

- `provider_identity`
  - provider name or platform
- `model_identity`
  - exact model or route label when applicable

Examples:

- provider: `OpenAI`
- model: `gpt-5`
- provider: `Google`
- model: `gemini-docs-eval`

These should be optional for human-only workers, but explicit when a model
route is involved.

## Trust Tier

Registry should store the current trust tier using the shared trust model:

- `fresh`
- `route_learning`
- `trusted_performer`
- `trusted_orchestrator`

This lets routing, restrictions, and graduation all read from the same source.

## Capabilities And Restricted Surfaces

Recommended fields:

- `capabilities[]`
- `restricted_surfaces[]`

Capabilities examples:

- `docs`
- `contracts`
- `verification`
- `architecture_notes`
- `multi_file_implementation`
- `public_copy`

Restricted surfaces examples:

- `public_trust`
- `architecture_boundary`
- `credential_adjacent`
- `broad_churn`

This makes worker permissions explicit instead of implied.

## Fallback Workers

Suggested field:

- `fallback_workers[]`

Purpose:

- define who or what route should take over when this worker is blocked,
  paused, or restricted

This should support both:

- worker-to-worker fallback
- model-route-to-human fallback

## Project Overlay Bindings

Suggested field:

- `project_overlay_bindings[]`

Purpose:

- define which project overlays the worker is valid for

Examples:

- `ohmic`
- `static-content`
- `firmware-lab`

This prevents a worker from silently being treated as universally valid across
every project context.

## Quota And Budget Fields

The registry should store planned limits, not just identity.

Recommended nested fields:

- `quota_policy`
  - task count caps
  - escalation thresholds
  - concurrency hints
- `context_budget_policy`
  - target usage ratio
  - soft ceiling ratio
  - hard ceiling ratio
  - output reserve ratio

This ties the registry to the worker context and token budget model.

## Status Field

Suggested values:

- `active`
- `paused`
- `evaluation`
- `restricted`
- `disabled`

This allows route and worker availability to change without deleting identity
records.

## Minimal Example Shape

```json
{
  "worker_id": "worker_docs_01",
  "display_name": "Docs Worker 01",
  "local_aliases": ["d", "docs-core"],
  "worker_class": "human_operator",
  "role_family": "docs",
  "provider_identity": "",
  "model_identity": "",
  "trust_tier": "trusted_orchestrator",
  "capabilities": ["docs", "contracts", "queue_truth", "architecture_notes"],
  "restricted_surfaces": ["credential_adjacent"],
  "fallback_workers": ["worker_docs_02", "worker_ops_01"],
  "project_overlay_bindings": ["ohmic"],
  "quota_policy": {
    "max_concurrent_tasks": 1
  },
  "context_budget_policy": {
    "target_usage_ratio": 0.55,
    "soft_ceiling_ratio": 0.7,
    "hard_ceiling_ratio": 0.85,
    "output_reserve_ratio": 0.18
  },
  "status": "active"
}
```

## Relationship To Other Rules

This registry should feed:

- trust-tier checks
- worker routing and fallback
- per-worker reporting
- project overlay eligibility
- quota and token-budget enforcement

## Immediate Follow-On

This schema should feed:

1. per-worker task stack model
2. global vs worker queue boundary
3. later registry-backed route assignment
