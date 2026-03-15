Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T123605Z-e6c334f1

# Strip Remaining Raw Source Footers From Public Pages

## Goal

Remove the remaining raw `Source:` / `chapter_*.md` export footer language
still visible across public pages after the first builder-language cleanup pass.

## Source

- `docs/roadmap/OHMICAUDIO_SITE_AUDIT_TASK_BUNDLE_2026-03-15.md`
- follow-up from `2026-03-15-strip-public-builder-and-scaffold-language`

## Focus

- raw `Source:` footer blocks
- chapter filename leakage like `chapter_10_subwoofer_enclosure.md`
- export-style canonical footer strings that are not useful to visitors

## Acceptance

- public pages no longer expose raw `Source:` export footers
- internal chapter filenames are not visible in public copy
- footer cleanup is done with a repeatable, low-risk pass instead of one-off
  page surgery

## Outcome

Completed on 2026-03-15.

Result:

- removed the raw export footer blocks from `547` public HTML files with a
  repeatable scripted pass instead of page-by-page edits
- reduced repo-local public HTML leakage to `SOURCE_COUNT=0` and
  `HTML_CHAPTER_COUNT=0`
- pushed the cleanup to `origin/main` and confirmed the live host stopped
  exposing `Source:` and `chapter_` leakage on the sampled advanced-topics
  pages after Cloudflare rebuilt

## Verification

- ran a scripted footer strip across
  `B:\ohmic\repos\ohmic-audio-static-content\public`
  - first pass result: `CHANGED=539`
  - second pass cleanup for variant footer shapes: `CHANGED=7`
  - one final single-file encoded holdout was removed in
    `advanced-topics/installer-level-working-with-most-systems/index.html`
- ran:
  `Get-ChildItem ... | Select-String -Pattern '<p>Source:'`
  - result: `SOURCE_COUNT=0`
- ran:
  `Get-ChildItem ... -Filter *.html | Select-String -Pattern 'chapter_'`
  - result: `HTML_CHAPTER_COUNT=0`
- committed in `ohmic-audio-static-content` as `bb49a6c`
- ran:
  `git -C B:\ohmic\repos\ohmic-audio-static-content push origin main`
  - result: `f68eb60..bb49a6c  main -> main`
- verified live samples after the rebuild window:
  - `https://ohmicaudio.com/advanced-topics/`
  - `https://ohmicaudio.com/advanced-topics/beginner-level-beyond-analog-rca-cables/`
  - result: `HAS_SOURCE=0` and `HAS_CHAPTER=0` for both

## Notes

- `chapter_` strings still remain inside `public/ai-index.json`, but that file
  is not part of the public HTML surface covered by this task
