Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T143837Z-2711d91f

# Sweep Static Generated Metadata And Support Files For Canonical Trust

## Goal

Perform one bounded sweep of active static metadata/support files in
`ohmic-audio-static-content` so canonical-host references stay truthful after
the `ohmicaudio.com` cutover.

## Focus

- generated or semi-generated head metadata
- support files like `robots.txt`, `llms.txt`, and adjacent crawl/index helpers
- stale host references that would weaken crawl/index/public trust

## Acceptance

- one narrow metadata/support-file sweep is completed in
  `ohmic-audio-static-content`
- frozen app-side `public` and archive surfaces remain untouched
- the outcome records what was checked and what host drift was corrected, if any

## Outcome

Completed on 2026-03-15.

Result:

- verified `robots.txt` and `llms.txt` were already canonical-host clean
- found the remaining trust drift in `public/ai-index.json`, which still
  referenced `https://ohmicaudiolabs.com`
- normalized the AI index to `https://ohmicaudio.com` and confirmed the support
  file scan no longer finds old host references in the targeted file families

## Artifact

- `B:\\ohmic\\repos\\ohmic-audio-static-content\\public\\ai-index.json`
