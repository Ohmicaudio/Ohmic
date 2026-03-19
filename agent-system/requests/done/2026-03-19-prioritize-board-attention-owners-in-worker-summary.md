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

# prioritize board attention owners in worker summary

## Requested Outcome

- sort worker summary rows so urgent attention owners rise to the top
- make the attention lane align with the board recommendation instead of burying the riskiest owner under generic count ordering
- keep the ordering deterministic and easy to read

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- tests covering worker summary ordering if needed

## Constraints

- keep this as an ordering/refinement change, not a broader worker-summary redesign
- sort by attention severity before normal activity counts
- preserve the existing freshness and alert badges

## Notes

- the board now recommends attention work and can jump directly into the worker summary
- the worker summary still sorts primarily by active/completed counts
- expired or aging claims should be easier to spot by appearing first

## Ready When

- worker summary rows with `expired` or `aging` claim alerts sort ahead of healthy/idle rows
- the ordering stays deterministic for ties
- the recommendation/attention surfaces now point to the most urgent owner first

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`

