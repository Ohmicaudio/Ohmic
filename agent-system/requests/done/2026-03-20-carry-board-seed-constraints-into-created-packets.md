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

# Carry board seed constraints into created packets

## Requested Outcome

- board-seeded packets carry suggested constraints into the generated request template instead of placeholder constraint text

## Scope

- limit the next bounded slice to these surfaces:
- B:\ohmic\repos\ohmic-administrator\packages\contracts\src\admin\intake.ts
- B:\ohmic\repos\ohmic-administrator\services\admin-api\src\projectBoardRecommendationSource.ts
- B:\ohmic\repos\ohmic-administrator\services\admin-api\src\queueActions.ts
- B:\ohmic\repos\ohmic-administrator\services\admin-api\src\index.ts
- B:\ohmic\repos\ohmic-administrator\services\admin-api\src\index.test.ts
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\api\queue.ts
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\queueRecommendationStore.ts
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\queueRecommendationStore.test.ts
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardRecommendationPanel.tsx
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx
- B:\ohmic\tools\sync\agent-request.ps1

## Constraints

- keep the next bounded slice within the suggested claim scope
- avoid widening beyond the listed board seeding surfaces without reseeding the packet

## Notes

- Board recommendation: Seed the next bounded packet
- No ohmic-administrator ready work is visible. Review recent project progress and seed the next bounded packet.
- Recent packet: Carry board seed scope section into created packets
- Completed by: codex

## Ready When

- the next bounded slice is specific enough to claim and keeps the work within board seeding surfaces

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-administrator\packages\contracts\src\admin\intake.ts
- B:\ohmic\repos\ohmic-administrator\services\admin-api\src\projectBoardRecommendationSource.ts
- B:\ohmic\repos\ohmic-administrator\services\admin-api\src\queueActions.ts
- B:\ohmic\repos\ohmic-administrator\services\admin-api\src\index.ts
- B:\ohmic\repos\ohmic-administrator\services\admin-api\src\index.test.ts
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\api\queue.ts
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\queueRecommendationStore.ts
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\queueRecommendationStore.test.ts
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardRecommendationPanel.tsx
- B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ProjectBoardProgressPanel.tsx
- B:\ohmic\tools\sync\agent-request.ps1

