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

# Reconcile static-content `subwoofer-enclosures` bucket

## Requested Outcome

- reconcile the `subwoofer-enclosures/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- preserve the stronger enclosure-design content in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\subwoofer-enclosures`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures`

## Completion

- canonical source for all `35` `subwoofer-enclosures/*` pages is `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures`
- historical app-side comparison source was `ohmic-audio-labs` Git `HEAD` under `public/subwoofer-enclosures/*`
- all `35` historical app-side `subwoofer-enclosures/*` files still pointed at `https://ohmicaudio.netlify.app`
- all `35` static-host `subwoofer-enclosures/*` files already use the current `https://ohmicaudiolabs.com` canonical host
- after normalizing line endings and replacing the old/new host strings, all `35` pages match exactly
- no content promotion from app history was required for this bucket

## Notes

- representative comparisons that resolved cleanly to host-only drift:
  - `subwoofer-enclosures/index.html`
  - `subwoofer-enclosures/beginner-level-choosing-the-right-subwoofer/index.html`
  - `subwoofer-enclosures/installer-level-design-and-tuning/index.html`
  - `subwoofer-enclosures/engineer-level-transfer-functions-and-system-modeling/index.html`
  - `subwoofer-enclosures/complete-build-example-12-sealed-subwoofer-for-daily-driver/index.html`
- this bucket resolves the same way as `fundamentals`, `mobile-electronics`, `tuning`, `dsp`, and `installation`: host migration only, with no deeper content fork
