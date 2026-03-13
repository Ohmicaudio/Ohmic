# Requested Tasks

This folder is the intake and tracking area for requested work.

## Purpose

Use `requests/` for tasks that have been asked for but are not yet actively claimed.

Use `jobs/` for work that is actively being executed.

Flow:

1. a requested task is written into `requests/inbox/`
2. if it depends on another decision or task, it can move to `requests/blocked/`
3. once it is understood and ready, it can move to `requests/ready/`
4. when an agent starts it, the agent creates a claim in `jobs/active/`
5. when the work is complete, the request can move to `requests/done/`

Shared open questions live in:

- `requests/open-questions.md`

Use that file for unresolved questions that may redirect, unblock, or reprioritize work across agents.

Meaningful answered questions live in:

- `requests/resolved-questions.md`

Use that file as a local deep-trace layer when the chain of logic matters and the answer should stay retrievable later.

## Folder Roles

- `inbox/`
  - newly requested tasks and rough intake notes
- `blocked/`
  - known work waiting on another task, decision, or resource
- `ready/`
  - clarified tasks that are ready to be claimed
- `done/`
  - completed task records kept for traceability
- `open-questions.md`
  - active unresolved cross-agent or cross-task questions
- `resolved-questions.md`
  - meaningful answered-question trace kept for local logic history

## Rules

- requested tasks should be written plainly and narrowly
- each task should name the project, scope, and desired outcome
- each task should carry enough metadata for another agent to triage it quickly
- requests are not locks; they are intake records
- only `jobs/active/` protects an edit scope

## Required Metadata

- `project`
- `status`
- `requested`
- `requester`
- `origin`
- `priority`
- `blocking`
- `depends_on`

Helpful optional metadata:

- `handoff_from`
- `claim_id`
- `topic`

## Pickup Order

Agents looking for queued work should:

1. scan `ready/` first
2. scan `open-questions.md` second for unresolved blockers or routing questions
3. scan `inbox/` third if triage work is needed
4. scan `blocked/` only when trying to unblock dependencies

After any meaningful completed task, agents should re-check:

- `ready/`
- `open-questions.md`

If a question is answered and the chain of logic matters:

- promote the durable truth into memory, a project overlay, or canonical docs
- add a short entry to `resolved-questions.md`

## Tooling

Helpers:

- `B:\ohmic\tools\sync\agent-request.ps1`
- `B:\ohmic\tools\sync\agent-claim.ps1`
- `B:\ohmic\tools\sync\agent-work-poll.ps1`
- `B:\ohmic\tools\sync\refresh-agent-work-snapshot.ps1`
- `B:\ohmic\tools\sync\register-idle-agent-poll-task.ps1`

Examples:

```powershell
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-request.ps1 list
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-request.ps1 create -Status inbox -Project ohmic-audio-labs -Title "normalize backend request queue docs" -Origin agent -Priority soon
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-request.ps1 move -Id 2026-03-13-normalize-backend-request-queue-docs -Status ready
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\refresh-agent-work-snapshot.ps1
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-work-poll.ps1 once
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\register-idle-agent-poll-task.ps1
```

## Sync Model

- queue mutations should refresh the idle-work snapshot immediately
- the scheduled poll keeps the snapshot honest if a write path misses a refresh
- because of that, the timer interval matters less than clean request states and clean claim scopes

## Naming

Use:

- `YYYY-MM-DD-short-task-name.md`

Examples:

- `2026-03-13-agent-memory-tightening.md`
- `2026-03-13-backend-docs-cleanup.md`

## Template

Start from:

- `templates/request-template.md`
- `instructions/request-routing.md`
