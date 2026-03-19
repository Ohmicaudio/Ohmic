scope: project
authority: working
project: ohmic-administrator
status: done
requested: 2026-03-19
requester: user
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

# harden claim completion sync when request moved early

## Requested Outcome

- let claim completion refresh runtime state even if the related request packet has already moved out of `ready/`
- avoid hard failure when queue and claim mutations happen out of order
- keep the generated runtime snapshots truthful after claim completion

## Scope

- `tools/sync/agent-claim.ps1`
- `tools/sync/sync-agent-state.ps1`
- related queue/runtime refresh behavior exercised by claim completion

## Constraints

- keep the fix narrow to claim-closeout sync hardening
- do not redesign the full queue/runtime refresh model
- preserve current claim file format and request packet format unless absolutely needed

## Notes

- while closing `2026-03-19-add-project-board-next-action-recommendation-lane`, the request move completed before claim completion
- `agent-claim.ps1 complete` then failed inside sync because it still expected the request packet at its old `ready/` path
- the system should tolerate that ordering instead of erroring on a missing request file

## Ready When

- claim completion succeeds and refreshes state even if the request packet has already moved to `done/`
- the sync script no longer throws on a missing old request path in that scenario
- runtime snapshots still refresh correctly after the hardened completion flow

## Suggested Claim Scope

- `B:\ohmic\tools\sync\agent-claim.ps1`
- `B:\ohmic\tools\sync\sync-agent-state.ps1`

