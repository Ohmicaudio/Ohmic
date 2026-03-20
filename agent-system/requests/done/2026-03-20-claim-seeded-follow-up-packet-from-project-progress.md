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

# Claim seeded follow-up packet from project progress

## Requested Outcome

- after seeding a follow-up packet from project progress, the operator can claim that exact seeded packet directly from the same panel

## Scope

- limit the next bounded slice to these surfaces:
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx

## Constraints

- keep this slice in the progress panel and existing queue/focus APIs
- avoid new backend routes

## Notes

- Board seeding now shows a generated packet summary, but Project Progress still cannot claim the newly seeded packet from the same lane.
- Close that operator loop in the progress UI and keep the slice bounded to the progress panel.

## Ready When

- project progress can claim the seeded packet without leaving the panel and keeps the scope bounded to board workflow UI

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx

