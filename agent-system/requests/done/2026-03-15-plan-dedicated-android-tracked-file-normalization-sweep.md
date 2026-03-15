Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T190942Z-b76fcb94

# Plan Dedicated Android Tracked File Normalization Sweep

## Goal

Define the conditions and exact file set for a future dedicated Android tracked
file normalization pass, without pretending it is current feature work.

## Source

- `docs/roadmap/OHMIC_ANDROID_TRACKED_FILE_NORMALIZATION_DECISION_2026-03-15.md`

## Focus

- future cleanup-only scope
- review cost versus value
- exact file list
- when not to do it

## Acceptance

- one low-priority future normalization packet exists
- the cleanup is clearly separated from Android feature work
- later execution will not need to rediscover the rationale

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_ANDROID_TRACKED_FILE_NORMALIZATION_SWEEP_PACKET_2026-03-15.md`

Result:

- the future Android tracked-file normalization scope is now explicit and
  limited to one text/config family
- the packet includes exact "do not open yet" conditions and a preflight gate
  using `git diff --ignore-cr-at-eol`
- the work is clearly separated from generated Android output and real wrapper
  feature changes
