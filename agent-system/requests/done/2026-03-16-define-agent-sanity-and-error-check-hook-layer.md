Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T032138Z-254c9cce

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

## Result

- defined the hook architecture in
  `docs/systems/OHMIC_AGENT_SANITY_AND_ERROR_CHECK_HOOK_LAYER_2026-03-16.md`
- added stable checkpoints for pre-task sanity, pre-edit scope, post-edit
  sanity, verification, queue/claim reconciliation, and post-completion review
- made cheap `pass` / `warn` / `block` outcomes explicit so obvious broken
  states can be caught without a full loop rewrite
