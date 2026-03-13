# Decision Rules

## What Counts As Truth

Use this order when deciding what to trust:

1. inspected repo state
2. canonical shared docs
3. project overlays
4. durable memory docs
5. recent session handoffs
6. chat memory

## Environment Awareness Rule

Before executing commands, verify:

- which shell or runtime is active
- which path model the target tool expects
- whether the tool is Windows-native, WSL-native, or language-runtime specific

Prefer commands that are native to the current environment.

If you must cross boundaries:

- state the boundary clearly
- use the correct path form for that tool
- avoid stacking shell wrappers unless necessary

Treat environment confusion as a real source of bugs, not just an annoyance.

Learning standard:

- one environment-class mistake is recoverable
- repeating the same shell/path/runtime mistake after it has already been observed is not acceptable
- after an environment failure, adjust the invocation model before trying again

## Act vs Ask

Default to action when:

- the change is local and reversible
- the risk is low
- the repo or docs make the answer clear

Ask before acting when:

- deletion or archival is involved
- repo names, product names, or public terminology may change
- a move affects multiple repos
- the choice could create hidden drift

Check job claims before acting when:

- you are about to edit a file
- you are about to run a broad refactor
- you are about to rewrite a folder or content batch

If another active claim overlaps your scope, do not begin editing until the conflict is resolved.

Check request state before planning queued work:

- use `ready` for work another agent can begin now
- use `blocked` for dependency-gated work
- use `inbox` for rough work that still needs shaping

## Default Next-Step Priority Ladder

Unless the user gives a different priority, choose the next action in this order:

1. fix any breakage or blocker introduced by the current work
2. finish the current claimed task to a stable verified checkpoint
3. do work that directly unblocks the current task or current work cycle
4. pick `requests/ready` items with `blocking: yes`
5. pick `requests/ready` items in the same project as the current task
6. pick other `requests/ready` items by priority and age
7. triage `requests/inbox` into `ready` or `blocked`
8. do documentation, indexing, cleanup, or polish work

## Situational Awareness Pre-Task Audit Rule

Before starting a new meaningful task, perform a mini-audit.

Minimum audit:

1. inspect `requests/ready/`
2. inspect `requests/blocked/` for nearby dependency state
3. inspect `requests/open-questions.md`
4. inspect active claims for overlap
5. inspect the relevant repo worktree for outstanding issues, half-finished work, or obvious follow-on tasks that belong in the queue

Use the audit to sharpen the next task, not to avoid work.

## Importance Order

Use this importance order when ranking candidate tasks:

1. `blocking: yes` beats `blocking: no`
2. `priority: now` beats `priority: soon`, which beats `priority: later`
3. current project beats unrelated project
4. runtime or canonical truth beats archive or polish
5. narrower, safer scope beats broad speculative scope
6. older request beats newer request when all else is equal

## Continue Rule

When the user says `continue` with no new direction:

- do not ask an open-ended question
- pick the highest-ranked safe task from the ladder above
- state the chosen next step briefly
- proceed

Only break this rule if:

- another active claim conflicts with the work
- the next step would be destructive
- the next step has hidden architectural consequences
- the queue or docs are too ambiguous to identify a safe next action

## Post-Checkpoint Check Rule

After any meaningful completed task:

- check `requests/ready/` for newly available work
- check `requests/open-questions.md` for unresolved questions that could redirect or unblock the next step
- check whether the completed work surfaced a new request, blocker, or question that should be recorded before moving on
- prefer answering or routing fresh blocking questions before drifting into unrelated cleanup

Use this rule after stable checkpoints, not after every tiny command.

## Compaction Rule

Treat compaction as agent responsibility, not default user work.

Preferred behavior:

- compact when context is bloated enough to threaten continuity or quality
- compact at stable boundaries instead of in the middle of an active step
- preserve the active thread through handoff and memory promotion
- avoid asking the user to compact unless the agent cannot safely carry the thread forward

When deciding whether to compact, prefer:

1. finish the current small unit of work first
2. record what is now true
3. record the immediate next step
4. then compact if needed

## Memory Promotion Rules

Promote to short-term:

- active workstreams
- blockers
- immediate next actions

Promote to mid-term:

- current migration plans
- active design decisions
- multi-week debt or restructuring work

Promote to long-term:

- stable naming
- durable preferences
- canonical topology
- rules likely to matter across many future sessions

Do not promote:

- venting
- speculative plans
- one-off command outputs
- temporary scratch conclusions

## Naming Rules

- use one canonical name per repo or surface
- record known aliases in `memory/terminology.md`
- prefer explicit labels like `canonical`, `working`, `reference`, `deprecated`
- avoid ambiguous folder names like `remaining` once their role changes
