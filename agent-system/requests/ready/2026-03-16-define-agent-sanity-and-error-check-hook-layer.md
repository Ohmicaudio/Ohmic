Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Agent Sanity And Error Check Hook Layer

## Goal

Define the hook points where sanity checks and explicit error checks should run
before, during, and after task completion.

## Focus

- pre-task sanity checks
- post-edit sanity checks
- verification/error hooks
- queue and claim consistency checks

## Acceptance

- one hook layer is defined
- sanity/error checks can be attached without rewriting the whole agent loop
- obvious broken or inconsistent states are catchable early
