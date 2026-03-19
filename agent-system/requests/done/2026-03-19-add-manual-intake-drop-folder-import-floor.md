scope: project
authority: working
project: ohmic-administrator
status: done
requested: 2026-03-19
requester: codex
origin: agent
priority: soon
blocking: no
depends_on: 
handoff_from: 
claim_id: 
topic: requested-task
queue_epoch: 2026-03-18-ohmic-administrator-product-extraction
review_after: 
review_status: current
supersedes: 

# add manual intake drop folder import floor

## Requested Outcome

- let the administrator desk import text-like packets from a local manual-intake drop folder through the same envelope path as direct file imports
- prove the next non-auth intake seam after one-off file import without jumping straight to Gmail

## Scope

- `B:\ohmic\repos\ohmic-administrator\packages\contracts\src\admin\manual-intake.ts`
- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake\src\manualIntake.ts`
- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake\src\manualIntake.test.ts`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src\index.ts`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src\index.test.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\api\manualIntake.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\manualIntakeStore.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ManualIntakePanel.tsx`

## Constraints

- keep the drop folder inside the current runtime/manual-intake area
- support only safe text-like imports in this first floor
- reuse the existing manual envelope submit path so queue/runtime/history stay aligned
- move processed files out of the drop folder so repeated scans stay deterministic

## Notes

- manual intake already supports paste, file import, recent reuse, duplicate review, and attachment review
- the next seam should prove a folder-backed import lane before any Gmail/auth connector work
- this should remain bounded and operator-triggered from the desk

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\api`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`

