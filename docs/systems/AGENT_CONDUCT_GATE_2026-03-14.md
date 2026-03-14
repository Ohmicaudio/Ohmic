# Agent Conduct Gate

Date: 2026-03-14

## Purpose

Define the minimum conduct rules an agent must follow before entering active work.

Think of this as the rules posted at the gate before anyone enters the playground.
The playground is the queue, repos, graphics work, migrations, and cleanup tasks.
This document is the gate.

## Gate Rules

### 1. Enter the right place

- start at `B:\ohmic`
- identify the target project
- descend into the active repo before doing substantial reasoning or edits

Do not orbit the umbrella repo and mistake shared memory for repo truth.

### 2. Account for live work before freelancing

- check `requests/ready/`
- check `requests/blocked/`
- check `jobs/active/`

Do not say `nothing to do` while applicable ready work exists.

### 3. Claim before editing

- if you are going to edit files, claim the exact file or folder scope first
- if another active claim overlaps, do not edit until the conflict is resolved

Do not rely on chat memory or assumptions about who is working where.

### 4. Verify before declaring success

If you changed state, verify the state change immediately.

Examples:

- after a push, verify the branch or remote state
- after moving a request, verify the queue state
- after changing a path, verify the referenced file actually exists
- after changing deployment/config docs, verify the setting matches reality

Do not wait for the user to ask whether the thing actually worked.

### 5. Small scope beats broad churn

- prefer one family, one bucket, one repo slice, or one cleanup surface at a time
- prefer small commits over large mixed commits
- separate production, QA, and coordination work into different tasks when possible

If a diff starts mixing unrelated fixes, stop and split it.

### 6. Cleanup is real work, not invisible work

If you discover stale queue items, bad paths, dirty docs, or broken conduct surfaces:

- fix them
- commit them
- push them when appropriate

Do not leave a known live coordination bug sitting uncommitted.

### 7. Do not turn one problem into three

When fixing one thing:

- do not consume unrelated placeholders on the same page
- do not rewrite a whole bucket when the task is one family
- do not reopen finished parity or migration work unless a new concrete defect is found

### 8. Record the next real step

After a meaningful checkpoint:

- either do the next step
- or queue it explicitly

Do not stop at “I found more work” and leave it only in chat.

### 9. Respect the active work root

- `B:\ohmic\repos\*` are the active local repo homes
- older pre-B copies are not active work roots

Do not drift back into legacy path assumptions once the active roots are known.

### 10. If behavior keeps failing, fix the behavior layer

When the same coordination miss repeats:

- do not just fix the immediate file
- fix the rule, queue shape, or startup surface that allowed the miss

The system should get safer after repeated mistakes, not just noisier.

## Minimum Pre-Work Checklist

Before starting a meaningful task:

1. identify the active repo
2. inspect `requests/ready/`
3. inspect `jobs/active/`
4. inspect repo worktree state
5. claim exact edit scope if editing
6. begin work

## Minimum Post-Work Checklist

After a meaningful task:

1. verify the actual result
2. update the queue if the task came from `requests/`
3. queue any newly exposed follow-up work
4. complete or release the claim
5. only then move on

## Anti-Patterns

Do not:

- say `nothing to do` without ready-queue accounting
- wait for the user to ask for verification that should have been automatic
- leave a known active coordination bug only in local dirt
- edit claimed files because they “probably aren’t being touched”
- treat queue shaping as a substitute for doing the work
- treat cleanup as optional if the cleanup bug is live

## Outcome Standard

A good agent round should leave the system:

- more accurate
- easier to trust
- easier for the next agent to pick up
- less dependent on the user repeating obvious instructions
