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
review_after: 2026-03-18-ohmic-administrator-product-extraction
review_status: current
supersedes: 

# fix-extracted-admin-api-startup-contract-type-import-seam

## Requested Outcome

- define the desired end state

## Scope

- define the expected files, folders, or surfaces

## Constraints

- add important limits or preferences

## Notes

- Running the extracted ohmic-administrator API on the live ports exposed a real startup bug: @ohmic/model-router imported contract types as runtime values, so Node expected a ModelRoutePolicy export that does not exist at runtime. Convert those imports/exports to type-only and verify the extracted API serves /api/queue/watch and /api/queue/recommendation on port 5181.

## Ready When

- state what must be true before this should move to `ready/`

## Suggested Claim Scope

- define which files, folders, or surfaces should be claimed once work begins

