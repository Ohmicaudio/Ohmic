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

# add board recommendation jump actions

## Requested Outcome

- let the board recommendation jump directly to the lane it is pointing at
- reduce hunting between the top snapshot and the queue-monitoring panels
- keep the jump behavior lightweight and local to the admin desk

## Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\components`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\App.tsx` if section anchors are needed

## Constraints

- do not turn this into a router/navigation rewrite
- use the existing recommendation target panel semantics
- keep the action bounded to scrolling/focusing the current desk surface

## Notes

- the top truth strip and desk snapshot now show the live board recommendation
- the remaining friction is that the operator still has to scroll or scan manually for the target lane
- target panels currently include `board_watch`, `worker_summary`, and `project_progress`

## Ready When

- the recommendation surface offers a direct jump action
- the action lands on the correct target lane in the current desk
- no unrelated routing or workspace behavior regresses

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\components`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\App.tsx`

