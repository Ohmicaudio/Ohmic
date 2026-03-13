# Memory Model

This folder stores shared memory across projects and sessions.

## Horizon Model

- `short-term.md`
  - days to a few weeks
  - always loaded into active context
  - active work, immediate next steps, current blockers, active skills/keywords, recent watchouts
- `mid-term.md`
  - weeks to a few months
  - initiatives, migrations, open decisions, known debt, learned lessons, recurring mistakes
- `long-term.md`
  - durable truths
  - stable preferences, topology, naming, operating rules, durable lessons, stable capability truths

Supporting files:

- `preferences.md`
  - human and team preferences that influence how work should be done
- `terminology.md`
  - canonical names, aliases, and status labels

Formatting and shared section names should follow `instructions/voice-and-format.md`.

## Editing Rules

- rewrite freely in `short-term.md`; it is the live cross-session snapshot
- edit carefully in `mid-term.md`
- change `long-term.md` only when the fact is stable and worth carrying forward

## Use Rules

- `short-term.md` should always be in working context for active sessions
- if a skill, keyword cluster, access note, or current mistake is not captured more appropriately elsewhere, keep it in `short-term.md`
- move repeated mistakes and learned patterns to `mid-term.md` once they stop being one-off incidents
- move only durable lessons and stable access/capability truths to `long-term.md`

## Standard Section Pattern

Prefer these sections when they fit:

- `Always-Load Context`
- `Active Priorities`
- `Current Truth`
- `Skills`
- `Keywords`
- `Access`
- `Watchouts`
- `Learned Lessons`
- `Next Move`

Use the nearest matching template in `templates/` when creating or rewriting memory docs.

## Suggested Metadata

Where useful, use a short metadata block at the top of a note:

```text
scope: global | project | repo | session
horizon: short | mid | long | archive
authority: canonical | working | reference | deprecated
project: ohmic-audio-labs | cyd-remote | amplab-firmware | org-wide
topic: agent-system | backend | firmware | content | migration
updated: YYYY-MM-DD
```

Keep it lightweight. The point is retrieval, not bureaucracy.
