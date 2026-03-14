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

# Reconcile static-content `fundamentals` bucket

## Requested Outcome

- reconcile the `fundamentals/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- preserve the stronger introductory content in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\fundamentals`
- `B:\ohmic\repos\ohmic-audio-static-content\public\fundamentals`

## Completion

- canonical source for all `26` `fundamentals/*` pages is `B:\ohmic\repos\ohmic-audio-static-content\public\fundamentals`
- historical app-side comparison source was `ohmic-audio-labs` Git `HEAD` under `public/fundamentals/*`
- all `26` historical app-side `fundamentals/*` files still pointed at `https://ohmicaudio.netlify.app`
- all `26` static-host `fundamentals/*` files already use the current `https://ohmicaudiolabs.com` canonical host
- after normalizing line endings and replacing the old/new host strings, all `26` pages match exactly
- no content promotion from app history was required for this bucket

## Notes

- representative comparisons that resolved cleanly to host-only drift:
  - `fundamentals/index.html`
  - `fundamentals/beginner-level-basic-audio-theory/index.html`
  - `fundamentals/installer-level-box-alignment-and-setup/index.html`
  - `fundamentals/engineer-level-thiele-small-and-transfer-functions/index.html`
  - `fundamentals/sections/table-of-contents/index.html`
- this bucket resolves the same way as `dsp` and `installation`: host migration only, with no deeper content fork
