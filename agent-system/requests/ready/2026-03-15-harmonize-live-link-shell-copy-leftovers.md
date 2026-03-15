Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Harmonize Live Link Shell Copy Leftovers

## Goal

Clean up remaining shell/mock/test wording that still mixes:

- generic Live Link discovery/link language
- deck surface language
- device identity language

## Focus

- shell smoke tests and mocks
- host-level UI copy that still says `linked:` or similar transitional text
- low-risk naming cleanup only

## Acceptance

- leftover shell wording drift is identified and reduced
- no live link behavior or hardware transport logic changes are required
- future UI work has a cleaner naming baseline
