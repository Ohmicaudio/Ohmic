Status: implementation_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Audio Labs Ignore And Cleanup Boundary

## Purpose

Define the repo-level boundary between files that should be ignored, files that
should be cleaned or relocated locally, and files that must stay visible
because they are source truth.

## Core Rule

Not all dirt should be handled the same way.

Use three classes:

1. ignoreable or rebuildable local junk
2. local-only retained evidence or staging material
3. source-visible artifacts

## Class 1: Ignoreable Or Rebuildable Local Junk

Meaning:

- safe to ignore, purge, or regenerate
- should not dominate normal repo reasoning

Examples:

- `node_modules/*`
- `products/ohmic-osm/**/node_modules/*`
- `services/backend/node_modules/*`
- `dist/*`
- `products/ohmic-osm/apps/osm-web/dist/*`
- `services/backend/dist/*`
- `esp32round128/.pio/*`
- `services/backend/tools/__pycache__/*`
- `index/.cache.json`
- `playwright-report/*`
- `test-results/*`
- `tmp/*`

Rule:

- these are cleanup or ignore candidates, not source-visible truth

## Class 2: Local-Only Retained Evidence Or Staging Material

Meaning:

- may still be useful
- should not stay as ambient repo-root or repo-status clutter
- should relocate to local-only storage if retained

Examples:

- `captures/*`
- `output/*`
- `services/backend/storage/measurement-captures/*`
- `content-work/*`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`
- loose logs like `backend_*.txt`, `dev.log`, `dev-mobile.log`

Rule:

- retain only by explicit retention or relocation policy
- otherwise purge after the immediate session

## Class 3: Source-Visible Artifacts

Meaning:

- must remain visible to cleanup and review
- should not be swallowed by ignore rules just because they touch runtime or
  generated-adjacent areas

Examples:

- tracked source under `products/*`
- tracked source under `services/*`
- tracked source under `components/*`
- tracked source under `schemas/*`, `utils/*`, `scripts/*`, `test/*`
- tracked support artifacts such as
  `services/backend/storage/device-registry.test.json`

Rule:

- keep these visible
- classify or commit them through source cleanup waves, not junk cleanup

## Ignore Boundary

Acceptable ignore-style handling belongs only to Class 1.

Do not use ignore rules to hide:

- retained evidence that still needs relocation
- source truth
- tracked support artifacts needed for verification

## Cleanup Boundary

Cleanup actions are safe when the file class is known:

- Class 1 -> ignore or purge
- Class 2 -> relocate, retain temporarily, or purge by policy
- Class 3 -> leave visible and classify as source work

Unknown class means: stop and classify first.

## Safe Next Execution Order

1. split generated/runtime artifacts from true source artifacts
2. stage a local-only relocation plan for Class 2 material
3. later apply ignore or cleanup actions only after the relocation boundary is
   ready

## Outcome Standard

If this boundary is working, then:

- install/build junk stops poisoning the repo read
- useful local evidence can survive outside the repo
- real source changes remain visible and reviewable
