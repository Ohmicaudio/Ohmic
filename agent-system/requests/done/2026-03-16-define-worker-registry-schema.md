Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T031023Z-fc39726c

# Define Worker Registry Schema

## Goal

Define the stable registry record for each worker so naming, role, trust,
provider/model identity, capability limits, and project overlay bindings are
explicit.

## Focus

- stable worker id
- display name and local alias handling
- worker class and role family
- provider/model identity
- trust tier
- capabilities and restricted surfaces
- fallback workers
- project overlay bindings
- quota and budget fields

## Acceptance

- one worker registry schema is defined
- worker names are stable without losing project-local aliases
- quota and context/token budget fields exist in the registry model

## Result

- defined the canonical worker record in
  `docs/systems/OHMIC_WORKER_REGISTRY_SCHEMA_2026-03-16.md`
- separated stable worker id, local aliases, role family, trust tier,
  capabilities, restricted surfaces, fallback links, and project overlay
  bindings into one registry object
- attached quota and context-budget fields so routing and performance policies
  can read from the same worker source of truth
