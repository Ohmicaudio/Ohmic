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

# add project board next action recommendation lane

## Requested Outcome

- show one bounded, project-filtered next-action recommendation on the board
- make the recommendation explain why the project currently needs that action
- let the board stay useful when there are zero ready tasks by steering the next move explicitly

## Scope

- `apps/admin-web` board watch / worker / progress lane surfaces
- `services/admin-api` projection logic for project board recommendation state
- `packages/contracts` board recommendation projection typing if a new payload is needed

## Constraints

- keep the recommendation project-filtered to `ohmic-administrator`
- do not reintroduce global ready-queue noise from unrelated firmware or AmpLab work
- keep this as one bounded recommendation lane, not a full planning engine
- preserve current queue/claim flow and drill-through behavior

## Notes

- the board already has project-filtered watch, progress history, worker summary, freshness, attention, and claim-age alerts
- the next missing operator aid is a clear “what should happen next” summary
- useful recommendation cases include: ready work exists but is unclaimed, worker attention needs intervention, no ready work is visible, or a worker has stale/expired active claims

## Ready When

- the board shows a stable next-action recommendation derived from current project state
- the recommendation updates from live project board state and stays truthful when the board is empty or blocked
- tests cover at least one ready-work case and one attention/no-ready case

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`

