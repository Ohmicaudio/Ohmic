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
6. `requests/open-questions.md`
7. latest relevant file in `handoffs/`
8. repo-local `AGENTS.md` if the target repo has one

When available, also read:

- `B:\ohmic\generated\agent-work\recent-changes.md`
- the relevant per-project `session-brief.md` under `B:\ohmic\generated\agent-work\projects\`
- any shared operational proposal explicitly surfaced from `B:\ohmic\README.md`
- `B:\ohmic\docs\systems\GIT_AND_GITHUB_BOOTSTRAP_IN_MIXED_ENV_2026-03-13.md` when the task touches Git, GitHub, or mixed Windows/WSL tooling

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
  transactions/
    README.md
  templates/
    README.md
```

## Design Principles

- Global truth belongs here, not scattered across repos.
- Repo-specific truth belongs in `projects/` or the repo itself.
- Only stable facts should live in long-term memory.
- Session notes are not canonical until promoted.
- Transactions hold the deeper reasoning/event layer beneath requests and memory.
- The system should stay readable by humans first and retrievable by agents second.

## Generated Surfaces

Derived re-entry surfaces are written under:

- `B:\ohmic\generated\agent-work\`

These are not truth surfaces. They are generated summaries for faster session
bootstrap and queue inspection.

Generated state should be treated as stale until proven fresh if:

- queue or claim files were edited manually
- refresh tooling was bypassed
- validation has not been run since the latest coordination changes

Canonical control-surface roles are defined in:

- `B:\ohmic\docs\systems\OHMIC_SHARED_SYSTEM_CANONICAL_CONTROL_SURFACES_2026-03-15.md`

Cross-platform tooling direction is defined in:

- `B:\ohmic\docs\systems\OHMIC_CROSS_PLATFORM_AGENT_SYSTEM_CLI_PATH_2026-03-15.md`

## Sandbox Boundary

Ignored nested repos or sandboxes living under `B:/ohmic` are not part of the
shared startup path unless they are explicitly harvested into tracked docs or
target repos.

Reference:

- `B:\ohmic\docs\systems\IGNORED_NESTED_REPOS_AND_LOCAL_SANDBOXES_2026-03-13.md`
