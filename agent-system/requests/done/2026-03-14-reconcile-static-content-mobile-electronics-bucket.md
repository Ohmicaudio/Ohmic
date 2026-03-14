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

# Reconcile static-content `mobile-electronics` bucket

## Requested Outcome

- reconcile the `mobile-electronics/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- preserve the stronger integration-oriented content in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\mobile-electronics`
- `B:\ohmic\repos\ohmic-audio-static-content\public\mobile-electronics`

## Completion

- canonical source for all `26` `mobile-electronics/*` pages is `B:\ohmic\repos\ohmic-audio-static-content\public\mobile-electronics`
- historical app-side comparison source was `ohmic-audio-labs` Git `HEAD` under `public/mobile-electronics/*`
- all `26` historical app-side `mobile-electronics/*` files still pointed at `https://ohmicaudio.netlify.app`
- all `26` static-host `mobile-electronics/*` files already use the current `https://ohmicaudiolabs.com` canonical host
- after normalizing line endings and replacing the old/new host strings, all `26` pages match exactly
- no content promotion from app history was required for this bucket

## Notes

- representative comparisons that resolved cleanly to host-only drift:
  - `mobile-electronics/index.html`
  - `mobile-electronics/beginner-level-understanding-digital-audio/index.html`
  - `mobile-electronics/installer-level-advanced-integration-strategies/index.html`
  - `mobile-electronics/engineer-level-can-bus-protocol-deep-dive/index.html`
  - `mobile-electronics/sections/table-of-contents/index.html`
- this bucket resolves the same way as `fundamentals`, `dsp`, and `installation`: host migration only, with no deeper content fork
