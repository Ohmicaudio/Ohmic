# Ohmic Next Public Trust Cleanup Slice

Date: 2026-03-15
Status: working packet

## Purpose

Define the next bounded public-site trust cleanup slice now that the
public/archive freeze boundary is explicit and the canonical public host is
settled.

## Recommended Next Slice

The next cleanup slice should be:

- `static generated metadata and support-file canonical-host sweep`

## Why This Slice

This slice is the safest next public-trust move because it:

- stays entirely inside `B:\ohmic\repos\ohmic-audio-static-content`
- avoids the frozen app-side `public` and archive surfaces
- improves public trust without reopening broad page-copy churn
- directly follows the cutover note's remaining metadata/support-file follow-up

## Scope

The slice should cover only low-risk public trust surfaces such as:

- generated or semi-generated page head metadata
- canonical URL references
- support files like `robots.txt`, `llms.txt`, and related crawl/index helpers
- static route/support-file references that still imply an older canonical host

## Explicitly In Scope

- verify `https://ohmicaudio.com` is the only canonical public host in active
  static support files
- scan for stale labs/temporary host references in support files and generated
  metadata surfaces
- fix only metadata/support-file trust drift that can affect crawl, indexing,
  or obvious public confidence

## Explicitly Out Of Scope

- body-copy rewrites
- broad content-quality rewrites
- reopening frozen app-side `public/` or archive surfaces
- large SEO/content strategy changes
- loudspeaker page generation
- design or navigation overhauls

## Why This Beats Other Options

Compared to legacy-page cleanup:

- much lower collision risk
- smaller surface area
- easier to verify

Compared to broad metadata churn:

- keeps trust work narrow and operational
- avoids drifting back into full static-content rewrite mode

## Success Criteria

The cleanup slice should leave:

- canonical host references consistent
- support files truthful
- no obvious stale public-host drift in the selected metadata/support-file lane
- one safe verification note or request outcome describing what was checked

## Suggested Verification

Minimum useful verification for the slice:

- search the targeted support files for non-canonical host references
- verify `https://ohmicaudio.com/robots.txt` and `https://ohmicaudio.com/llms.txt`
  still return `200`
- confirm the selected metadata/support files do not point back to older public
  hosts

## Safe Follow-On Request

The concrete request to leave in `ready` is:

- `sweep static generated metadata and support files for canonical trust`

That packet is narrow enough to run later without competing with app/runtime
implementation lanes.
