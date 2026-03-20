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

# Show board seed constraints in recommendation panel

## Requested Outcome

- idle board recommendations show suggested seed constraints before the operator creates the next packet

## Scope

- limit the next bounded slice to these surfaces:
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardRecommendationPanel.tsx

## Constraints

- keep this slice inside the recommendation UI
- avoid widening into new backend fields or unrelated board panels

## Notes

- Board recommendation: Surface generated constraint guidance before seeding
- The backend already computes suggested_seed_constraints_text, but the recommendation panel does not show it yet.
- Keep this slice in the board recommendation UI only.

## Ready When

- the recommendation card surfaces the suggested constraints text clearly and stays compact

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardRecommendationPanel.tsx

