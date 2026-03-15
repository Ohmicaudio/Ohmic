Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic-audio-static-content

# Confirm Static Speaker Content Boundary After Parser

## Goal

Reconfirm the static-content boundary after the loudspeaker parser prototype so
the content repo does not absorb raw data logic.

## Why

The parser work will tempt the system toward premature page generation.

## Deliverable

A short boundary confirmation note that states:

- what stays in data lane
- what stays in content lane
- what generation is still blocked

## Constraints

- no page generation
- boundary confirmation only
