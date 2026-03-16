Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260316T020747Z-4a85cd44

# Define Master Administrator Intake Domain Model

## Goal

Define the core object model for outside-world intake so the administrator can
organize and route email, files, bug reports, content, and external requests
without the model collapsing into one generic blob.

## Focus

- intake item
- source account
- attachment bundle
- routing target
- status
- operator note

## Acceptance

- one intake model is defined
- it is strong enough for web-admin scaffolding
- it clearly differs from internal execution/task objects

## Result

- defined the outside-world intake object model in
  `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_INTAKE_DOMAIN_MODEL_2026-03-15.md`
- separated intake-domain objects from internal execution/task objects so the
  later administrator pipeline, provider, routing, and web-shell tasks can
  build on one stable shape instead of one generic blob
- established the core objects:
  - `AdministratorIntakeItem`
  - `SourceAccount`
  - `AttachmentBundle`
  - `AttachmentAsset`
  - `RoutingTarget`
  - `OperatorNote`
