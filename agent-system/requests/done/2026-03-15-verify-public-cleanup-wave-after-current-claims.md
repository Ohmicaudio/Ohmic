Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T122921Z-4ab8867c

# Verify Public Cleanup Wave After Current Claims

## Goal

After the current public cleanup claims finish, run one narrow verification pass
so the cleanup lane closes cleanly instead of lingering as chat truth.

## Scope

- builder/scaffold language cleanup
- raw source footer cleanup
- public-facing sanity only, not a full site audit replay

## Acceptance

- recently cleaned pages are sampled and confirmed
- any residual defects become explicit follow-up tasks
- the public cleanup lane can move out of "probably done" state

## Outcome

Completed on 2026-03-15.

Result:

- sampled local cleaned pages confirmed the first-wave builder/scaffold cleanup
  actually landed in the static-content repo
- the known raw footer defect is still real at scale: a fresh sweep still found
  `539` public pages with `<p>Source:` export footer leakage
- live host verification exposed a second concrete follow-up: the canonical
  public host is still serving older stale versions of at least
  `/competition/` and `/subwoofer-enclosures/` because
  `ohmic-audio-static-content` is currently `5` commits ahead of `origin/main`
- recorded that publish drift as a separate follow-up task instead of treating
  it as vague deployment suspicion

## Verification

- ran a broad string sweep over
  `B:\ohmic\repos\ohmic-audio-static-content\public`
  for the targeted builder/scaffold phrases from the first cleanup wave
  - result: no matches in public HTML pages; only stale index copy remained in
    `public/ai-index.json`
- sampled local cleaned pages:
  - `public/advanced-topics/sections/table-of-contents/index.html`
  - `public/appendix/glossary/index.html`
  - `public/competition/index.html`
  - `public/subwoofer-enclosures/index.html`
  - `public/subwoofer-enclosures/complete-build-example-12-sealed-subwoofer-for-daily-driver/index.html`
  - result: cleaned metadata and visitor-facing copy were present locally
- ran a footer sweep:
  - `Get-ChildItem ... | Select-String -Pattern '<p>Source:'`
  - result: `COUNT=539`
- compared local cleaned files to live host samples:
  - `curl.exe -s https://ohmicaudio.com/competition/`
  - `curl.exe -s https://ohmicaudio.com/subwoofer-enclosures/`
  - result: live host still served the older stale hub versions with
    `Index of pages ...` metadata and `ohmicaudiolabs.com` canonicals
- ran:
  - `git -C B:\ohmic\repos\ohmic-audio-static-content status -sb`
  - `git -C B:\ohmic\repos\ohmic-audio-static-content log --oneline origin/main..HEAD`
  - result: the static-content repo is `ahead 5`, matching the observed live
    deploy drift

## Follow-Up

- `2026-03-15-strip-remaining-raw-source-footers-from-public-pages.md`
- `2026-03-15-publish-pending-public-cleanup-wave-to-static-host.md`
