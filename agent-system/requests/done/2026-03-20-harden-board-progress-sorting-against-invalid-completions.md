scope: project
authority: working
project: ohmic-administrator
status: done
requested: 2026-03-20
requester: codex
origin: agent
priority: soon
blocking: no
depends_on: 
handoff_from: 
claim_id: 
topic: requested-task
queue_epoch: 2026-03-18-ohmic-administrator-product-extraction
review_after: 2026-03-18
review_status: current
supersedes: 

# Harden board progress sorting against invalid completions

## Requested Outcome

- define the desired end state

## Scope

- define the expected files, folders, or surfaces

## Constraints

- add important limits or preferences

## Notes

- Fix board progress sorting so invalid completed_at values sink instead of poisoning recency ordering. Reconcile admin-api tests to the corrected live behavior for board progress, worker summary, recommendation, and slow filing options.

## Ready When

- state what must be true before this should move to `ready/`

## Suggested Claim Scope

- define which files, folders, or surfaces should be claimed once work begins

