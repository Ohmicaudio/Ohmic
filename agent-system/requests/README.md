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

## Folder Roles

- `inbox/`
  - newly requested tasks and rough intake notes
- `blocked/`
  - known work waiting on another task, decision, or resource
- `ready/`
  - clarified tasks that are ready to be claimed
- `done/`
  - completed task records kept for traceability

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
2. scan `inbox/` second if triage work is needed
3. scan `blocked/` only when trying to unblock dependencies

## Tooling

Helpers:

- `B:\ohmic\tools\sync\agent-request.ps1`
- `B:\ohmic\tools\sync\agent-claim.ps1`
- `B:\ohmic\tools\sync\agent-work-poll.ps1`
- `B:\ohmic\tools\sync\register-idle-agent-poll-task.ps1`

Examples:

```powershell
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-request.ps1 list
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-request.ps1 create -Status inbox -Project ohmic-audio-labs -Title "normalize backend request queue docs" -Origin agent -Priority soon
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-request.ps1 move -Id 2026-03-13-normalize-backend-request-queue-docs -Status ready
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-work-poll.ps1 once
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\register-idle-agent-poll-task.ps1
```

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
