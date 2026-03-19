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

# surface project board recommendation in desk snapshot

## Requested Outcome

- show the current project-board next-action recommendation in the top desk truth/snapshot
- let the operator see the board’s recommended next move without scrolling into the queue lane
- keep the top-of-page summary aligned with the new project recommendation panel

## Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\components`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store`

## Constraints

- reuse the existing recommendation projection/store instead of inventing a second source of truth
- keep this to top summary visibility, not another big workflow redesign
- preserve the separate `Next Action` panel in the queue lane

## Notes

- the board now has a dedicated recommendation lane driven from live queue watch, worker summary, and progress
- the remaining gap is that the top truth strip/dashboard still make the operator scroll to see that recommendation
- this should stay tightly scoped to visibility, not new board logic

## Ready When

- the operator truth strip or top dashboard reflects the live board recommendation
- the top snapshot updates from the same recommendation source as the queue-lane panel
- the recommendation remains project-filtered to `ohmic-administrator`

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\components`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store`

