scope: project
authority: working
project: ohmic-audio-labs
status: ready
requested: 2026-03-14
requester: codex-local
origin: split
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id:
topic: requested-task

# Verify app/static boundary after graphics wave

## Requested Outcome

- verify that the app-facing side still points at the canonical static surface after the current graphics and static edits
- catch any regressions in asset assumptions or link routing between `ohmic-audio-labs` and `ohmic-audio-static-content`

## Scope

- `B:\ohmic\repos\ohmic-audio-labs`
- `B:\ohmic\repos\ohmic-audio-static-content`
- `B:\ohmic\docs\migration\STATIC_POST_GRAPHICS_FINISHING_PLAYBOOK_2026-03-14.md`

## Instructions

- check app entry points that link into the static tier
- verify canonical host/path assumptions
- verify that no old app-owned static paths were silently reintroduced

## Ready When

- checked boundary surfaces are listed
- any regressions are fixed or queued explicitly

