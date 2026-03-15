Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Verify First Hardware Shell Deck Check Coverage

## Goal

Confirm that the first hardware shell slice has at least minimal verification
coverage instead of relying on visual optimism.

## Source

- `docs/roadmap/OHMIC_HARDWARE_CONTROL_FIRST_SAFE_SLICE_2026-03-15.md`
- `docs/roadmap/OHMIC_AUDIO_LABS_MINIMUM_TRUSTED_RUNTIME_CHECKS_2026-03-15.md`

## Focus

- targeted checks
- shell-level smoke coverage
- known gaps
- next check additions if coverage is thin

## Acceptance

- current coverage for the first hardware slice is documented honestly
- at least one runnable or defined check path exists
- next coverage step is clear if gaps remain

## Completion Notes

- Verified the slice with the Windows Node toolchain from
  `B:\ohmic\repos\ohmic-audio-labs`
- `npm run build` passed and emitted the expected hardware bundle outputs,
  including `hardware-device-decks`, `hardware-deck-routing`,
  `hardware-settings-deck`, and `hardware-shell-chrome`
- No targeted automated tests currently reference the new deck/host files
- No dedicated hardware-route interactive smoke pass was run in this shell, so
  that remains the next honest coverage addition
- The current minimum coverage is therefore: successful root build plus clear
  visibility into the remaining gap for targeted route smoke or component tests
