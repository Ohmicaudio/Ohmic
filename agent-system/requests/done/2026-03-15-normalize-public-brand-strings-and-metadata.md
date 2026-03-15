Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T105916Z-1d3a1dfb

# Normalize Public Brand Strings And Metadata

## Goal

Remove mixed public brand naming and normalize public-facing strings to the
intended canonical brand.

## Source

- `docs/roadmap/OHMICAUDIO_SITE_AUDIT_TASK_BUNDLE_2026-03-15.md`
- `C:\Users\d\Downloads\ohmicaudio_site_audit_report.docx`

## Focus

- `Ohmic Audio` vs `Ohmic Audio Labs` on public pages
- public titles
- breadcrumbs
- metadata where public brand naming is still mixed

## Acceptance

- public-facing brand strings are consistent
- no internal legacy-labs naming remains where it is not intentionally used

## Outcome

Completed on 2026-03-15.

Result:

- normalized public-facing `Ohmic Audio Labs` branding to `Ohmic Audio`
  across live static HTML metadata, headers, titles, and structured data
- replaced remaining `ohmicaudiolabs.com` canonical and Open Graph host values
  with `https://ohmicaudio.com`
- cleaned the AI-facing `llms.txt` header and index label so it no longer
  carries broken legacy branding or mojibake

## Verification

- search for `Ohmic Audio Labs` across `B:\ohmic\repos\ohmic-audio-static-content\public`
  returned `0`
- search for `ohmicaudiolabs.com` across `B:\ohmic\repos\ohmic-audio-static-content\public`
  returned `0`
- spot-checked `public/advanced-topics/index.html`
- spot-checked `public/reference/visual/index.html`
- spot-checked `public/llms.txt`
