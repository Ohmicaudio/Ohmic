# Request Routing

This file defines how requested work should move through the shared queue.

## Queue States

- `inbox`
  - newly captured work
  - may still be rough or underspecified
- `blocked`
  - known work that cannot start yet because of a dependency, missing decision, or active conflict
- `ready`
  - clear enough for another agent to pick up
- `done`
  - completed and kept for traceability

Canonical open-question surface:

- `requests/open-questions.md`
  - shared list of unresolved cross-task or cross-agent questions
  - use it for questions that do not yet merit a claim but should be rechecked after meaningful completed work

Queue pivot / epoch surface:

- `requests/epochs/`
  - project-level direction changes that invalidate, demote, or force review of
    older queued work
  - use it when repo shape, execution model, or operating direction changes
    enough that older ready packets may no longer be trustworthy at face value

## Pickup Order

When an agent is looking for queued work:

1. scan `requests/ready/` for high-priority unblocked tasks
2. scan `requests/open-questions.md` for unresolved blockers or routing questions
3. if no ready task fits, scan `requests/inbox/` for triage work
4. only scan `requests/blocked/` when trying to unblock dependencies

Agents must not collapse this into a silent scan.
If they decide not to pick up a ready request, they should say which ready item was skipped and why.

## Situational Awareness Intake Rule

Before starting a new meaningful task, agents should do a quick intake pass:

1. check `ready/`
2. check `blocked/` for dependency collisions
3. check `open-questions.md`
4. check active claims
5. check the target repo worktree for outstanding issues or follow-on tasks that should become requests instead of being forgotten

If the mini-audit reveals new work:

- add it to `inbox/` if it is still rough
- move or create it in `blocked/` if a dependency is known
- move or create it in `ready/` if another agent could begin now
- append it to `open-questions.md` if it is still an unresolved routing or decision question

Idle agents should prefer the poller:

- `B:\ohmic\tools\sync\agent-work-poll.ps1`

## Required Fields

Each request should capture:

- `project`
- `status`
- `requested`
- `requester`
- `origin`
- `priority`
- `blocking`
- `depends_on`

Optional but useful:

- `handoff_from`
- `claim_id`
- `topic`
- `queue_epoch`
- `review_after`
- `review_status`
- `supersedes`

## Priority Terms

- `now`
  - should be picked up quickly when possible
- `soon`
  - important but not immediate
- `later`
  - future work or backlog

## Origin Terms

- `user`
  - directly requested by the user
- `agent`
  - created by an agent as discovered follow-up work
- `dependency`
  - created because another task cannot finish cleanly without it

## Blocking Terms

- `yes`
  - the request blocks current work or another request
- `no`
  - useful work, but not actively blocking

## Ready Criteria

A request can move to `ready/` when:

- the desired outcome is clear
- the scope is narrow enough to claim
- the dependency state is known
- there is enough context for another agent to begin without re-reading a whole chat thread

## Queue Epoch Rule

When a project pivots hard enough that older queue work may no longer map
cleanly onto the active repo or operating model, agents must create a queue
epoch record under `requests/epochs/`.

Use a queue epoch when any of these happen:

- the active product repo changes
- the execution surface moves from one repo to another
- a browser shell becomes a real product repo
- queue wording still points at a pre-pivot architecture
- the system is now expected to operate inside a new runtime or contract layer

Minimum queue epoch contents:

- project
- effective date
- pivot summary
- what older queued work is affected
- whether affected work should stay ready, move to blocked, or be rebuilt
- the new ready wave or successor task family

## Review Status Rule

Queued work should not stay `ready` forever after a major pivot.

Use:

- `review_status: current`
  - packet still matches the active direction
- `review_status: needs_review`
  - packet may still be useful, but another agent must re-check it against the
    current repo and direction before pickup
- `review_status: superseded`
  - packet should not be picked up because a fresher replacement exists

If a packet is both affected by a pivot and still potentially useful:

1. move it out of `ready/`
2. link it to the new epoch or successor work
3. rebuild a fresh ready packet if the work is still worth doing now

## Poller Safety Rule

The idle-work poller must not treat `review_status: needs_review` or
`review_status: superseded` packets as eligible ready work.

That means pivot-damaged queue work should fail safe instead of continuing to
look normal just because the old file still exists.

## Execution Rule

Requests are not claims.

When an agent starts a ready request:

1. create a job claim for the edit scope
2. add the `claim_id` to the request if useful
3. keep the request file as the task record
4. move the request to `done/` when the task is finished

After any meaningful completed task, agents should re-check:

- `requests/ready/`
- `requests/open-questions.md`

This keeps newly surfaced work and unanswered questions from being stranded between turns.

## Nothing-To-Do Rule

`Nothing to do` is only valid when all of the following are true:

- `requests/ready/` was checked in the current session
- no applicable ready request remains unclaimed
- the agent can name the blocking reason or routing reason for any skipped ready item

If an applicable ready request exists, the correct next step is to claim it, explain why it is blocked, or explain why it is outside the current workstream.

## Timer / Polling

For idle-agent pickup or periodic queue checks:

```powershell
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-work-poll.ps1 once
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-work-poll.ps1 watch -IntervalSeconds 300
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-work-poll.ps1 once -Json -OutFile B:\ohmic\generated\agent-work\idle-ready-work.json
```

The poller:

- reads `requests/ready/`
- prefers higher-priority work
- skips items blocked by unfinished request dependencies
- skips items whose suggested claim scope overlaps an active claim

Near-sync rule:

- request creation and request-state changes should refresh the snapshot immediately
- claim creation and claim completion should refresh the snapshot immediately
- the scheduled timer is a safety net and stale-state repair path, not the primary sync mechanism

Optional Windows scheduled task registration:

```powershell
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\register-idle-agent-poll-task.ps1
```
