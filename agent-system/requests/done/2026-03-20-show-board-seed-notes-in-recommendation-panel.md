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

# Show board seed notes in recommendation panel

## Requested Outcome

- idle board recommendations show suggested seed notes before the operator creates the next packet

## Scope

- limit the next bounded slice to these surfaces:
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardRecommendationPanel.tsx

## Constraints

- keep this slice inside the recommendation UI
- avoid widening into new backend fields or unrelated board panels

## Notes

- Board recommendation: Surface generated seed notes before seeding
- The backend already computes suggested_seed_notes, but the recommendation panel does not show them yet.
- Keep this slice inside the recommendation UI only.

## Ready When

- the recommendation card surfaces the suggested notes clearly and stays compact

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardRecommendationPanel.tsx

