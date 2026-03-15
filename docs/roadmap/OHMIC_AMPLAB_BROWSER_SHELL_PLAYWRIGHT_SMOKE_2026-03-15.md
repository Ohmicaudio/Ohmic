Status: verification_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic AmpLab Browser Shell Playwright Smoke

## What Changed

Added a focused Playwright shell smoke:

- `e2e/amplab-shell.spec.ts`

## Coverage

The check starts from the public dashboard, enters AmpLab through the gauge, and
verifies the browser-visible shell layer exposes:

- `OhmicLabs` hardware shell chrome
- AmpLab shell status line
- `Focus AmpLab`
- plot workspace presence
- AmpLab deck card visibility

## Honest Boundary

This is a browser shell smoke only.

It does not yet prove:

- loaded deck-body readiness in the browser shell
- browser discovery or link action behavior
- live device execution through the browser

## Verification

Ran:

- `npm run test:e2e -- e2e/amplab-shell.spec.ts`

Result:

- `1` Playwright spec passed
