Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
