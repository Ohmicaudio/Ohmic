Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic-audio-static-content

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
