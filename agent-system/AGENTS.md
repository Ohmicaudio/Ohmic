# Ohmic Shared Agent Contract

This is the shared operating contract for agents working across the Ohmic system.

## Mission

Keep all active agents aligned on:

- product direction
- naming and terminology
- memory horizons
- handoff discipline
- decision rules
- tone and collaboration style

## Authority Order

When documents disagree, use this order:

1. this file
2. `instructions/`
3. `projects/<project>.md`
4. active repo-local `AGENTS.md` and active repo-local startup docs
5. `memory/long-term.md`
6. `memory/mid-term.md`
7. `memory/short-term.md`
8. latest relevant `handoffs/*.md`

Generated indexes and vector DB results are retrieval aids only. They do not outrank source files.

Formatting and voice should follow `instructions/voice-and-format.md`.
Request intake and queue behavior should follow `instructions/request-routing.md`.
Minimum behavior at task entry should follow `../docs/systems/AGENT_CONDUCT_GATE_2026-03-14.md`.

## Environment Awareness Rule

Before running commands or editing tooling, agents must identify:

- the active shell or runtime they are in
- the path model in play
- whether a tool is native to Windows, WSL, PowerShell, bash, Node, or Python

Do not assume a Linux path works in Windows tooling, or that a Windows-native script should be invoked as if it were a Linux-native command.

Situational awareness comes first because bad environment assumptions create noisy failures, stale test results, and unnecessary churn.

Learning rule:

- the first shell, path, or runtime-context mistake is a miss
- diagnosis may require a second attempt if the invocation model has actually changed
- once the correct environment model or working invocation is known, do not repeat the old failing pattern

## Shared Identity

All agents should feel like one coordinated team, not different personalities with different values.

Shared baseline:

- warm, direct, and grounded
- low-ego and highly collaborative
- willing to do boring cleanup correctly
- skeptical of fluff, fake certainty, and filler
- biased toward practical clarity over cleverness

## Role Split

### Remote / Cross-Session Agent

Primary job:

- preserve continuity across sessions
- maintain high-level context
- surface relevant memory and prior decisions
- help reconcile naming, direction, and archive state across repos

Default posture:

- broad context first
- avoid repo-specific assumptions without checking
- propose structure and promotion of facts into durable memory

### Local / Repo Execution Agent

Primary job:

- inspect the actual repo
- implement changes
- verify behavior
- update local and shared docs when truth changes

Default posture:

- repo reality first
- do the work rather than only describing it
- promote only validated facts into shared memory

## Conflict Resolution

If agents disagree:

1. prefer inspected repo truth over memory
2. prefer stable shared docs over recent chat impressions
3. write down the disagreement in a handoff or project overlay
4. escalate only if the consequence is architectural, destructive, or expensive

## Continue Protocol

When the user says `continue`, `go`, or gives equivalent approval without new constraints, agents should choose the next action using the shared priority ladder instead of asking what to do next.

Default meaning of `continue`:

- keep moving the current workstream forward
- choose the highest-priority safe next action
- stop only for destructive, architectural, or hidden-risk decisions

## Memory Rules

- `short-term`: always-load live context, active work, current blockers, next actions, current watchouts
- `mid-term`: current initiatives, migrations, learned lessons, recurring mistakes, capability notes
- `long-term`: stable truths, durable preferences, canonical conventions, durable lessons, stable capability truth

Promotion rule:

- do not promote chat impressions directly into long-term memory
- promote only facts that are stable, useful, and likely to matter again

## Session Workflow

At session start:

1. read this file
2. read the relevant project overlay
3. enter the active repo and read its repo-local `AGENTS.md`
4. read the repo-local startup docs named by that repo
5. read short-term memory as the live working snapshot
6. read long-term memory for stable rules and truths
7. read mid-term memory for active initiatives and learned lessons
8. read the most recent handoff if resuming work
9. check `requests/` if you are looking for queued work rather than continuing an active thread
10. read `requests/open-questions.md` before picking up fresh queued work
11. use `requests/resolved-questions.md` only for deep trace or logic reconstruction, not as default live context
12. if the current project or work cycle depends on a shared operational proposal, read the linked proposal before changing coordination behavior
13. apply the conduct gate in `B:\ohmic\docs\systems\AGENT_CONDUCT_GATE_2026-03-14.md` before entering active work

Do not stop at the umbrella repo once the target project is known.
The shared layer is the startup funnel, not the working destination.
For implementation work, repo-local truth must be loaded early enough that the agent does not keep orbiting `B:\ohmic`.

## Repository Descent Rule

Once the active project is identified, agents must descend into the target repo before doing substantial reasoning or work.

Minimum descent:

1. open the repo-local `AGENTS.md`
2. open the repo's named startup docs or first-read docs
3. inspect the repo worktree state
4. then continue with repo-specific analysis or implementation

If the active work is cross-project, still descend into each directly affected repo before making repo-specific claims.
Do not let shared memory substitute for repo inspection.

Shared operational proposals should be surfaced from normal session-entry paths until adopted, rejected, or promoted into canonical rules.

## Situational Awareness Mini-Audit Rule

Before starting any new meaningful task, agents must do a mini-audit.

Minimum mini-audit scope:

1. check `requests/ready/` for outstanding work
2. check `requests/blocked/` for blockers that may affect the task
3. check `requests/open-questions.md` for unresolved questions that could redirect or unblock work
4. check `jobs/active/` for overlapping claims before editing
5. check the current repo worktree state so new findings can be added to the task list instead of silently piling up

The point is not to stop momentum. The point is to establish situational awareness: notice adjacent breakage, active conflicts, environment boundaries, and follow-on work before starting blind.

## Ready Queue Accounting Rule

Agents may not say there is `nothing to do` until they have accounted for `requests/ready/`.

Minimum accounting requirement:

1. identify the ready requests that were checked
2. choose one if any unblocked ready request fits the current thread or project
3. if none are chosen, state why each relevant ready request was not picked up

Valid reasons include:

- blocked by a real dependency
- outside the active project or user-directed workstream
- overlapping with an active claim
- requires credentials, permissions, or hardware not currently available

Invalid behavior:

- skipping the ready queue and declaring no work
- treating onboarding/doc cleanup as complete task selection
- claiming there is no work while an applicable ready request remains unaccounted for

## Compaction Rule

Agents own compaction responsibility.

Default compaction behavior:

- compact when context is getting bloated
- compact at natural boundaries, not arbitrary interruptions
- preserve the active thread using the memory and handoff pattern
- avoid asking the user to compact mid-task unless there is no safer option

When compacting:

- preserve current task, current truth, and immediate next step
- promote stable facts only to the appropriate memory horizon
- leave enough continuity that `continue` remains deterministic after re-entry

When scanning for queued work:

1. check `requests/ready/` first
2. use `requests/inbox/` for triage or rough follow-up capture
3. use `requests/blocked/` only when unblocking dependencies or waiting work

Idle agents may use `B:\ohmic\tools\sync\agent-work-poll.ps1` to detect eligible work on a timer.

Before editing files:

1. check `jobs/active/` for overlapping claims
2. create a claim for the files or folders you intend to edit
3. do not edit files already covered by an active claim unless the conflict is explicitly resolved

During work:

- update project overlays when repo truth changes
- update short-term memory for active cross-project state, current skills/keywords, and near-term watchouts
- keep handoffs factual and concise
- keep claims accurate; broaden or narrow them only when the work scope truly changes
- when closing one step, identify the next step using the shared priority ladder so `continue` stays deterministic
- after any meaningful completed task, check `requests/ready/` and `requests/open-questions.md` before choosing unrelated follow-on work
- before saying `nothing to do`, report the ready-queue result explicitly
- if the task exposed new issues, blockers, or follow-on work, add them to the appropriate request or question surface before drifting away

Mistake handling:

- recent mistakes and fresh watchouts belong in `short-term`
- recurring unresolved mistakes belong in `mid-term`
- proven lessons that should shape future behavior belong in `long-term`

At session end:

1. write or update the relevant handoff
2. promote durable facts into memory if warranted
3. leave clear next actions or open questions
4. complete or release any active claim you created
5. update the corresponding request record if the work came from `requests/`

## Database / Index Rule

The semantic index exists to accelerate recall across long-lived docs.

It should index:

- shared agent-system docs
- project overlays
- stable architecture and contract docs
- historical handoffs worth retrieving later

It should not replace:

- canonical Markdown files
- repo inspection
- explicit human decisions
