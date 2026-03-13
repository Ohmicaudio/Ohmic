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

## Pickup Order

When an agent is looking for queued work:

1. scan `requests/ready/` for high-priority unblocked tasks
2. scan `requests/open-questions.md` for unresolved blockers or routing questions
3. if no ready task fits, scan `requests/inbox/` for triage work
4. only scan `requests/blocked/` when trying to unblock dependencies

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
