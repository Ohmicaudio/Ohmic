scope: project
authority: working
project: ohmic-administrator
status: done
requested: 2026-03-19
requester: user
origin: agent
priority: soon
blocking: no
depends_on: 
handoff_from: 
claim_id: 
topic: requested-task
queue_epoch: 2026-03-18-ohmic-administrator-product-extraction
review_after: 2026-03-18
review_status: current
supersedes: 

# add board recommendation quick actions

## Requested Outcome

- let the board recommendation trigger a direct quick action when the recommendation is actionable
- support the first concrete case: claim the next ready project packet without leaving the recommendation surface
- keep non-claim recommendation states bounded to jump/navigation only

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store`

## Constraints

- do not build a generic workflow engine here
- keep the first quick action narrowly scoped to ready-work claiming
- preserve current recommendation jump behavior for other statuses

## Notes

- the recommendation lane already computes statuses like `ready_work`, `attention`, `in_progress`, and `idle`
- it already jumps to the right target panel
- the next step is to let `ready_work` actually claim the first ready project packet from the recommendation surface

## Ready When

- `ready_work` recommendations expose a direct claim action
- claiming from that action updates the board and focus cleanly
- non-ready recommendation states keep bounded navigation behavior only

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store`

