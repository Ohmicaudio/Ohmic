# Ohmic Master Administrator Project Overlay Configuration Layer

Date: 2026-03-16
Project: ohmic

## Purpose

Define how project-specific administrator behavior should live in overlays and
configuration so the Master Administrator core can stay reusable while Ohmic
still gets its own provider mappings, routing defaults, naming rules, and
destination folders.

## Core Rule

Administrator core owns workflow mechanics.

Project overlays own project policy.

That means the core should know how to:

- normalize intake items
- render intake state
- accept routing commands
- validate command shapes
- write audit and result state

But the core should not hardcode:

- which accounts belong to Ohmic
- which tags map to which queues
- which folders or destinations are preferred
- which intake kinds deserve custom labels

## Why An Overlay Layer Is Needed

Without an overlay layer, the administrator core would quickly accumulate:

- Ohmic-specific account labels
- Ohmic-specific folder names
- Ohmic-specific queue destinations
- Ohmic-only intake categories
- custom routing rules that do not belong to every project

That would make later reuse expensive and force core rewrites every time a
project changes its operational policy.

## Overlay Scope

The project overlay should own configuration for:

- provider and account mapping
- allowed routing targets
- naming conventions and display labels
- folder and storage destinations
- custom intake categories
- tag defaults
- trust-tier overrides

The overlay should not own:

- browser layout mechanics
- command transport
- provider credential handling
- claim/lock execution rules
- generic administrator status transitions

## Recommended Overlay Object

Suggested top-level object:

`AdministratorProjectOverlay`

Minimum fields:

- `project_id`
- `project_label`
- `enabled_provider_accounts[]`
- `routing_targets[]`
- `queue_mappings[]`
- `folder_destinations[]`
- `display_labels{}`
- `custom_intake_kinds[]`
- `tag_defaults[]`
- `trust_overrides[]`

## Provider And Account Mapping

The overlay should map safe project-facing labels onto backend-owned account
identities.

Example shape:

- `provider_kind`
- `source_account_id`
- `account_label`
- `allowed_intake_kinds[]`
- `default_tags[]`

The browser can read these safe labels, but provider credentials and raw secret
material still stay behind the backend boundary.

## Routing Targets

Core supports generic targets such as:

- `administrator_hold`
- `orchestrator_queue`
- `approval_wait`
- `archive`
- `provider_reply_needed`
- `human_review`

The overlay decides which of those are exposed in a project and what they mean
in project language.

Examples:

- map `orchestrator_queue` to `ohmic_ready`
- map `provider_reply_needed` to `supplier_follow_up`
- hide targets that the project is not using yet

## Naming Conventions And Labels

The overlay should own display-only labels for project language:

- intake kind labels
- queue labels
- routing labels
- trust tier descriptions
- source account labels

This keeps the browser surface truthful for Ohmic without forking the core
status model.

## Folder And Destination Mapping

The overlay should define where normalized artifacts and routed packets belong.

Examples:

- attachment destination roots
- import packet folders
- roadmap or docs destination folders
- generated output lanes

The core should request a logical destination, while the overlay resolves the
project-specific path policy.

## Custom Intake Categories

The core can keep broad kinds such as:

- `email`
- `file_drop`
- `support_request`
- `content_request`
- `external_tasking`

The overlay may define project-specific subcategories such as:

- `device-smoke-report`
- `supplier-spec-drop`
- `public-content-fix`
- `fitment-data-import`

These should be additive metadata, not replacements for the core normalized
kind.

## Relationship To Current JSON Runtime

The first overlay layer can start as JSON-backed configuration resolved by the
backend and exposed to the browser as safe project metadata.

Safe first pattern:

1. backend loads project overlay
2. backend exposes safe overlay subset to the browser
3. browser renders project labels and allowed actions
4. backend still validates commands against both core rules and overlay policy

That keeps the browser from becoming the policy source of truth.

## First Safe Implementation Shape

The first implementation only needs:

- one Ohmic overlay file or object
- safe account label mapping
- routing target exposure rules
- one destination mapping table
- one set of custom intake labels

That is enough to keep the administrator scaffold project-aware without
hardcoding Ohmic behavior into the core.

## Minimal Example Shape

```json
{
  "project_id": "ohmic",
  "project_label": "Ohmic",
  "enabled_provider_accounts": [
    {
      "provider_kind": "gmail",
      "source_account_id": "src_ops_gmail",
      "account_label": "Ohmic Ops Inbox",
      "allowed_intake_kinds": ["email", "support_request", "external_tasking"],
      "default_tags": ["ops"]
    }
  ],
  "routing_targets": [
    {
      "target": "orchestrator_queue",
      "display_label": "Send To Queue",
      "enabled": true
    },
    {
      "target": "approval_wait",
      "display_label": "Needs Approval",
      "enabled": true
    }
  ],
  "folder_destinations": [
    {
      "kind": "roadmap_packet",
      "path": "B:\\ohmic\\docs\\roadmap"
    }
  ],
  "custom_intake_kinds": [
    "device-smoke-report",
    "fitment-data-import"
  ]
}
```

## Immediate Follow-On

This overlay layer should feed:

1. provider-agnostic intake envelope
2. scaffold master administrator web shell against current JSON state
3. later provider/account expansion without core rewrites
