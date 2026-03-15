Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T001836Z-3b4a552c

# Audit Short And Mid-Term Memory For Survival Truths

## Goal

Trim and align short-term and mid-term memory so they contain survival truths,
not residue.

## Why

Memory sprawl makes the system worse instead of better.

## Deliverable

A small audit note or direct cleanup that ensures the memory files keep only:

- repo-root truth
- active priority truth
- durable active blockers
- critical preserved locations

## Constraints

- do not rewrite long-term history
- keep this focused on current working memory

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\agent-system\memory\short-term.md`
- `B:\ohmic\agent-system\memory\mid-term.md`

Result:

- working memory now keeps repo-root truth, current priority truth, deployment
  truth, and active watchouts
- stale migration/setup residue was trimmed out of short and mid-term memory
- long-term history was left alone

## Completion

- trimmed `short-term.md` down to current repo-root, priority, deployment, and
  watchout truths
- trimmed `mid-term.md` down to live initiatives, recurring mistakes, and known
  work ahead
