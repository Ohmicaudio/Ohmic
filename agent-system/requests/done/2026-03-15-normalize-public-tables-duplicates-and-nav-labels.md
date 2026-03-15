Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T113003Z-82fb6540

# Normalize Public Tables, Duplicates, And Nav Labels

## Goal

Fix the editorial QA issues from the audit that most visibly reduce polish and
trust.

## Source

- `docs/roadmap/OHMICAUDIO_SITE_AUDIT_TASK_BUNDLE_2026-03-15.md`
- `C:\Users\d\Downloads\ohmicaudio_site_audit_report.docx`

## Focus

- duplicate troubleshooting entries
- flattened pseudo-tables
- weak/generic nav labels
- capitalization and breadcrumb inconsistencies

## Acceptance

- duplicate entries are removed
- key pseudo-tables become real tables/cards
- public labels skim better and feel intentional

## Outcome

Completed on 2026-03-15.

Result:

- rebuilt the troubleshooting hub into a real visitor-facing reference page
  instead of a raw export list, removing repeated duplicate quick-reference
  entries
- renamed the duplicate `symptom-quick-reference-d95050` surface in-page to
  `Electrical and Power Symptom Quick Reference` so it reads as a distinct
  lookup instead of a confusing clone
- rebuilt the appendix reference-tables hub into grouped lookup tables with
  explicit `Table / Use It For / Includes` columns
- normalized the remaining generic public section-map pages so they no longer
  ship with the weak `Table of Contents` title/h1 pattern

## Verification

- confirmed the touched section-map pages no longer contain
  `<title>Table of Contents</title>` or `<h1>Table of Contents</h1>`
- confirmed the troubleshooting hub lists the two quick-reference pages once
  each with distinct labels
- confirmed the appendix reference-tables hub now contains real HTML tables and
  grouped lookup sections
