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
queue_epoch: 
review_after: 
review_status: current
supersedes: 

# Preview follow-up seed guidance in project progress

## Requested Outcome

- completed-claim rows show compact follow-up seed guidance before the operator creates the next packet

## Scope

- limit the next bounded slice to these surfaces:
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx

## Constraints

- keep this slice inside the progress UI
- avoid changing backend recommendation logic

## Notes

- Board progress follow-up seeding already carries outcome, scope, constraints, and ready-when, but the row does not show those guardrails before seeding.
- Keep this slice in the progress UI only.

## Ready When

- project progress shows a compact follow-up preview without widening into new backend work

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx

