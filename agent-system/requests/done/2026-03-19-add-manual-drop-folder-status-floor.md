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

# add manual drop folder status floor

## Requested Outcome

- expose the manual drop-folder state before import so the operator can see what is pending, supported, or likely to be skipped
- make the drop-folder seam feel operational enough to leave alone before widening to Gmail

## Scope

- `B:\ohmic\repos\ohmic-administrator\packages\contracts\src\admin\manual-intake.ts`
- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake\src\manualIntake.ts`
- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake\src\manualIntake.test.ts`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src\index.ts`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src\index.test.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\api\manualIntake.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\manualIntakeStore.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\manualIntakeStore.test.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ManualIntakePanel.tsx`

## Constraints

- keep the backend surface read-only except for the existing import route
- do not introduce file contents into the status projection, only names/counts
- keep this as one last hardening pass before widening connectors

## Notes

- drop-folder import already works and feeds the same manual envelope path
- the current gap is that readiness is only visible after pressing import

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\api`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`

