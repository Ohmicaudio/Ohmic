Status: implementation_note
Date: 2026-03-15
Project: ohmic-audio-static-content

# Ohmic Static Landing Hero Alignment

## What Changed

The public static landing page was rewritten to match the stronger mobile-first
hierarchy established in the app-side dashboard hero.

Updated surface:

- `B:\ohmic\repos\ohmic-audio-static-content\public\index.html`

## New Public Hero Shape

- one primary ecosystem story
- one clear action row for tools and suites
- one ecosystem module block instead of flat equal-weight tiles
- one published-surface block that keeps suite and reference entry points clear

## Why This Matters

- the public site now reflects the expanded ecosystem instead of the older
  narrower reference-hub framing
- the app dashboard hero and static/public hero now share the same hierarchy
- first-touch mobile visitors get a clearer story before they pick a tool

## Honest Boundary

This is a static HTML landing refinement only.

It does not yet include:

- deployment/rebuild
- mobile screenshot QA
- deeper public-page visual cleanup beyond the landing hero
