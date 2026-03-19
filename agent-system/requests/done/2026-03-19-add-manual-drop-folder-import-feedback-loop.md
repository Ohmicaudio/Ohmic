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

# add manual drop-folder import feedback loop

## Requested Outcome

- make drop-folder import feedback actionable from the manual intake lane instead of a dead summary line
- keep the operator in one place after import: inspect imported packets, prime actions, or run them

## Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\manualIntakeStore.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\manualIntakeStore.test.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\ManualIntakePanel.tsx`

## Constraints

- keep this browser-side; no backend changes unless truly required
- reuse the existing recent-envelope and runtime actions instead of inventing a parallel action model
- keep the feedback bounded to the latest import event

## Notes

- the previous packet added the actual drop-folder import floor
- the current gap is post-import operator flow: the summary is visible, but not actionable enough

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`

