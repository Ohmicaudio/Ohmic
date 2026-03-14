scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: yes
depends_on:
handoff_from:
claim_id:
topic: requested-task

# Reconcile static-content `appendix` bucket

## Requested Outcome

- reconcile the `appendix/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- preserve the stronger glossary and appendix content in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\appendix`
- `B:\ohmic\repos\ohmic-audio-static-content\public\appendix`

## Completion

- canonical source for all `117` `appendix/*` pages is `B:\ohmic\repos\ohmic-audio-static-content\public\appendix`
- historical app-side comparison source was `ohmic-audio-labs` Git `HEAD` under `public/appendix/*`
- all `117` historical app-side `appendix/*` files still pointed at `https://ohmicaudio.netlify.app`
- all `117` static-host `appendix/*` files already use the current `https://ohmicaudiolabs.com` canonical host
- after normalizing line endings and replacing the old/new host strings, all `117` pages match exactly
- no content promotion from app history was required for this bucket

## Notes

- representative comparisons that resolved cleanly to host-only drift:
  - `appendix/glossary/index.html`
  - `appendix/glossary/how-to-use-this-glossary/index.html`
  - `appendix/glossary/a/index.html`
  - `appendix/glossary/sections/a/index.html`
  - `appendix/glossary/sections/table-of-contents/index.html`
- this bucket resolves the same way as `reference` and the smaller host-only buckets: host migration only, with no deeper content fork
