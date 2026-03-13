# Resolved Questions

Use this file as a local trace layer for important answered questions.

## Purpose

- preserve chain-of-logic for meaningful decisions
- record answers that changed routing, architecture, naming, or operating rules
- give the DB a stable place to index resolved decision traces

## What Belongs Here

- answered cross-project or cross-agent questions
- routing questions that materially changed task flow
- operational questions whose answer became policy
- decision questions whose answer was promoted elsewhere

## What Does Not Belong Here

- every trivial answered question
- full task history
- unresolved questions
- duplicate copies of canonical truth

## Usage Rule

- append only meaningful resolved items
- keep each item short
- include where the answer was promoted, if anywhere
- treat this as local deep trace, not live working context

## Entry Shape

- asked:
- resolved:
- question:
- answer:
- promoted_to:

## Current Resolved Questions

- asked: 2026-03-13
  resolved: 2026-03-13
  question: Should compaction be user-driven or agent-driven during active work?
  answer: Compaction is agent responsibility; do it at natural boundaries and preserve continuity through handoff and memory patterns.
  promoted_to: `agent-system/AGENTS.md`, `agent-system/instructions/decision-rules.md`

- asked: 2026-03-13
  resolved: 2026-03-13
  question: Should agents re-check for new tasks or questions after meaningful completed work?
  answer: Yes. After any meaningful completed task, re-check `requests/ready/` and `requests/open-questions.md` before drifting into unrelated work.
  promoted_to: `agent-system/AGENTS.md`, `agent-system/instructions/decision-rules.md`, `agent-system/instructions/request-routing.md`

- asked: 2026-03-13
  resolved: 2026-03-13
  question: What should “situational awareness” mean operationally?
  answer: It includes both task awareness and environment awareness: queue state, claims, open questions, worktree condition, shell/runtime, path model, and correct tool invocation.
  promoted_to: `agent-system/AGENTS.md`, `agent-system/instructions/decision-rules.md`, `agent-system/instructions/request-routing.md`

- asked: 2026-03-13
  resolved: 2026-03-13
  question: Should anything in the shared umbrella system point to `ohmic-audio-universe`?
  answer: No. `ohmic-audio-universe` is an ignored nested local repo/sandbox under `B:/ohmic`, not a shared dependency or source of truth. Its uncommitted state is local to that nested repo and does not imply damage to the tracked umbrella repo.
  promoted_to: `docs/systems/IGNORED_NESTED_REPOS_AND_LOCAL_SANDBOXES_2026-03-13.md`
