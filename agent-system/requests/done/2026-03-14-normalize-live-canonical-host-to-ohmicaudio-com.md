scope: project
authority: working
project: org-wide
status: done
requested: 2026-03-14
requester: codex-local
origin: agent
priority: now
blocking: no
depends_on:
handoff_from:
claim_id: 20260315T021027Z-cf062a5d
topic: canonical-host

# Normalize live canonical host to ohmicaudio.com

## Requested Outcome

- align the shared coordination layer and static-host front-door surfaces with `https://ohmicaudio.com`
- stop advertising `ohmicaudiolabs.com` as the canonical public root in the first-touch shared/static files now that the redirect is live
- spin app-repo host-default cleanup into a separate blocked follow-up instead of mixing it into overlapping in-flight app edits

## Scope

- `B:\ohmic\agent-system\requests\open-questions.md`
- `B:\ohmic\docs\migration\TRANSITIONAL_PUBLIC_CUTOVER_DECISION_NOTE_2026-03-13.md`
- `B:\ohmic\agent-system\requests\blocked\2026-03-14-normalize-ohmic-audio-labs-host-defaults-to-ohmicaudio-com.md`
- `B:\ohmic\repos\ohmic-audio-static-content\README.md`
- `B:\ohmic\repos\ohmic-audio-static-content\public\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\llms.txt`
- `B:\ohmic\repos\ohmic-audio-static-content\public\robots.txt`

## Instructions

- keep the first pass narrow and traceable
- use `https://ohmicaudio.com` as the canonical public static host
- do not do the giant generated metadata sweep in this task
- if the app repo host swap overlaps dirty in-flight work, split it into a blocked follow-up instead of forcing a mixed commit

## Ready When

- the shared open-question/cutover note reflects the resolved domain decision
- the static host landing page and repo top-level files describe `ohmicaudio.com` as primary
- the blocked app-repo follow-up is visible for the remaining host-default swap
- verification notes capture the current live domain behavior

## Completion

- cleared the stale shared open question now that the live domain decision is resolved
- updated `TRANSITIONAL_PUBLIC_CUTOVER_DECISION_NOTE_2026-03-13.md` to record `ohmicaudio.com` as canonical and `ohmicaudiolabs.com` as the redirect domain
- updated the static repo front-door surfaces in `README.md`, `public/index.html`, `public/llms.txt`, and `public/robots.txt` to point at `https://ohmicaudio.com`
- created a blocked follow-up for the `ohmic-audio-labs` host-default swap because the exact app-side files overlap a large dirty in-flight worktree and would have forced a mixed commit
- verified from the current workstation that `https://ohmicaudio.com/` returns `200` and `https://ohmicaudiolabs.com/` returns `301` to `https://ohmicaudio.com/`
