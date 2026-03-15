Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-static-content

# Publish Pending Public Cleanup Wave To Static Host

## Goal

Push the already-committed public cleanup wave in `ohmic-audio-static-content`
so the live canonical host stops serving stale pre-cleanup hub pages.

## Scope

- `ohmic-audio-static-content` repo only
- publish the existing ahead-of-origin cleanup commits
- verify the live host serves the cleaned `competition` and
  `subwoofer-enclosures` hubs afterward

## Verification

- `git status -sb`
- `git log --oneline origin/main..HEAD`
- `git push origin main`
- `curl.exe -s https://ohmicaudio.com/competition/`
- `curl.exe -s https://ohmicaudio.com/subwoofer-enclosures/`

## Acceptance

- pending cleanup commits are pushed to `origin/main`
- live host no longer serves the stale `Index of pages ...` versions for the
  verified hub pages
- any remaining deployment lag is recorded explicitly if Cloudflare has not yet
  rebuilt
