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

# Preview follow-up notes and scope in project progress

## Requested Outcome

- completed-claim rows show the seeded notes and full scope guidance before the operator creates the next follow-up packet

## Scope

- limit the next bounded slice to these surfaces:
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx

## Constraints

- keep this slice inside the progress UI
- avoid changing backend recommendation or packet generation logic

## Notes

- Project Progress already previews follow-up title, ready-when, and constraints, but it still hides the seeded notes and the full scope guidance before seeding.
- Bundle both missing preview pieces into one bounded UI slice.

## Ready When

- project progress shows a compact but clear follow-up preview including notes and scope without widening into backend changes

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx

