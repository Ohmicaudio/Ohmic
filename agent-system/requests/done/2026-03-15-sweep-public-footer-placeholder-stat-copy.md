Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T233740Z-b8f37ac5

# Sweep Public Footer Placeholder Stat Copy

## Goal

Find and normalize the remaining public page footer/stat lines that still expose
placeholder counts or similar staging bookkeeping.

## Focus

- chapter-stat footer blocks
- end-of-page summary copy on public static pages

## Acceptance

- remaining placeholder-count footer leaks are identified
- the next bounded cleanup pass is obvious
- trust-safe wording is preferred over internal bookkeeping language

## Result

- replaced the remaining `Visual placeholders:` footer-stat lines with neutral
  trust-safe wording across the affected public pages
- verified there are no `Visual placeholders:` matches left anywhere under
  `public`
- narrowed the remaining placeholder references to deliberate speaker-image
  placeholder UI, one legacy HTML comment, and a few honest meta-hub
  explanations rather than public stat bookkeeping
