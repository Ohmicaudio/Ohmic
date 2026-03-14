scope: project
authority: working
project: ohmic-audio-static-content
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

# Run static route and asset smoke check

## Requested Outcome

- verify that the static tier still serves pages and graphic assets correctly after the graphics wave
- catch missing asset paths, broken links, and obvious route regressions

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public`
- `B:\ohmic\repos\ohmic-audio-static-content\site`
- `B:\ohmic\docs\migration\STATIC_POST_GRAPHICS_FINISHING_PLAYBOOK_2026-03-14.md`

## Instructions

- sample index pages plus edited topic pages
- verify image paths load
- verify section pages and index pages still link cleanly
- report broken asset or route paths explicitly

## Ready When

- checked routes/assets are listed
- any broken paths are fixed or queued explicitly

