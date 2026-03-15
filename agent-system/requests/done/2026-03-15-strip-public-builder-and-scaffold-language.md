Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T114151Z-2748cfde

# Strip Public Builder And Scaffold Language

## Goal

Remove internal publishing/build/repo language that should not be visible on
public pages.

## Source

- `docs/roadmap/OHMICAUDIO_SITE_AUDIT_TASK_BUNDLE_2026-03-15.md`
- `C:\Users\d\Downloads\ohmicaudio_site_audit_report.docx`

## Focus

- repo/build/runtime notes
- publishing scaffolds
- internal authoring instructions
- implementation-only hints exposed on public pages

## Acceptance

- public pages read like finished visitor-facing pages
- builder/dev language no longer leaks into public copy

## Outcome

Completed on 2026-03-15.

Result:

- rebuilt the most visible raw-export hubs into cleaner public-facing pages:
  `advanced-topics` section map, `competition`, `fundamentals`,
  `reference/math-measurement`, `subwoofer-enclosures`, `appendix/glossary`,
  and `appendix/manufacturers`
- removed the internal roadmap/version/authorship block from the advanced
  topics section map by replacing the page with a clean visitor-facing section
  guide
- rewrote the sealed daily-driver example and the advanced sealed-design
  section so they no longer expose `Generic example` authoring notes
- replaced the worst export-style `Index of pages in /...` metadata and titles
  on the touched hub pages with real public descriptions
- split the much larger raw `Source:` footer family into a dedicated follow-up
  task instead of pretending this first pass cleared the full site

## Verification

- confirmed the targeted leakage phrases no longer appear in `public`:
  `MASSIVE TECHNICAL INDEX`, `Version: 2025`, `Authored by:`,
  the touched `Index of pages in /...` strings, and `Generic example`
- manually reviewed the rebuilt hub/page surfaces to confirm they now read as
  visitor-facing section guides instead of export dumps
- counted the remaining raw `Source:` footer family separately and split it
  into a new ready task because it still spans hundreds of pages
