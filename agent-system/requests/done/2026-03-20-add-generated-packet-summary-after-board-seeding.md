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

# Add generated packet summary after board seeding

## Requested Outcome

- board seeding surfaces a compact summary of the generated packet immediately after creation in both recommendation and progress lanes

## Scope

- limit the next bounded slice to these surfaces:
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardRecommendationPanel.tsx
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx

## Constraints

- keep this slice inside the board UI
- avoid changing packet creation or queue backend behavior

## Notes

- Board seeding now previews packet content before creation, but post-seed feedback still mostly drops into a generic packet preview.
- Add a compact generated-packet summary after seeding so the operator can confirm what was created immediately.
- Keep this slice in the two board UI panels only.

## Ready When

- seed success shows an explicit generated-packet summary without widening into backend changes

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardRecommendationPanel.tsx
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx

