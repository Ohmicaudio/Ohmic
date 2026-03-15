Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: codex
Claim ID: 20260315T225226Z-6a5b9382

# Clean Public Placeholder Copy Leaks

## Goal

Remove rough placeholder wording from public static pages while preserving any
still-useful staging notes in external documentation instead.

## Focus

- public measurement tool card copy
- public chapter-stat footer lines that still expose raw placeholder counts

## Result

- the SPL Meter card on `public/measurement/index.html` no longer mentions a
  `placeholder workflow`
- five public chapter-stat footers now use trust-safe wording about linked
  reference assets instead of raw placeholder counts
- the result is recorded in
  `docs/roadmap/OHMIC_PUBLIC_PLACEHOLDER_COPY_LEAK_CLEANUP_2026-03-15.md`

## Verification

- diff sanity check on the six touched public HTML files
