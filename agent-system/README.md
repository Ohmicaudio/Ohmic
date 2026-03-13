# Ohmic Agent System

Shared cross-project agent contract, memory system, and handoff model for the Ohmic workspace.

## Purpose

This folder exists to keep local agents, remote agents, and future sessions aligned across repos.

Core rule:

- Markdown files are the source of truth.
- The database/index is for fast retrieval, not authority.

## Read Order

When starting cold, read in this order:

1. `AGENTS.md`
2. relevant file in `projects/`
3. `memory/short-term.md`
4. `memory/long-term.md`
5. `memory/mid-term.md`
6. latest relevant file in `handoffs/`
7. repo-local `AGENTS.md` if the target repo has one

## Folder Map

```text
agent-system/
  AGENTS.md
  instructions/
    personality.md
    collaboration.md
    decision-rules.md
    handoff-rules.md
    voice-and-format.md
    request-routing.md
  memory/
    README.md
    short-term.md
    mid-term.md
    long-term.md
    preferences.md
    terminology.md
  projects/
    README.md
    ohmic-audio-labs.md
    cyd-remote.md
    amplab-firmware.md
  handoffs/
    README.md
  indexing/
    README.md
  jobs/
    README.md
  requests/
    README.md
  templates/
    README.md
```

## Design Principles

- Global truth belongs here, not scattered across repos.
- Repo-specific truth belongs in `projects/` or the repo itself.
- Only stable facts should live in long-term memory.
- Session notes are not canonical until promoted.
- The system should stay readable by humans first and retrievable by agents second.
