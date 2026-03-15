Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T123309Z-d4a4efa6

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

## Outcome

Completed on 2026-03-15.

Result:

- pushed the pending public cleanup wave from `ohmic-audio-static-content`
  `main` to `origin/main`
- confirmed the live canonical host updated quickly after the push
- verified that `https://ohmicaudio.com/competition/` and
  `https://ohmicaudio.com/subwoofer-enclosures/` now serve the cleaned hub
  versions instead of the stale `Index of pages ...` variants

## Verification

- ran:
  `git -C B:\ohmic\repos\ohmic-audio-static-content status -sb`
  - result before push: `## main...origin/main [ahead 5]`
- ran:
  `git -C B:\ohmic\repos\ohmic-audio-static-content log --oneline origin/main..HEAD`
  - result before push: five pending cleanup commits
- ran:
  `git -C B:\ohmic\repos\ohmic-audio-static-content push origin main`
  - result: `db72471..f68eb60  main -> main`
- ran live checks:
  - `curl.exe -s https://ohmicaudio.com/competition/`
  - `curl.exe -s https://ohmicaudio.com/subwoofer-enclosures/`
  - result: live responses matched `Competition Hub` and
    `Subwoofer Enclosure Hub`, with no `ohmicaudiolabs.com` leakage in the
    sampled content
