scope: project
authority: working
project: ohmic-audio-labs
status: ready
requested: 2026-03-20
requester: user
origin: live-fire-ble-lane
priority: high
blocking: no
depends_on:
- 2026-03-18-run-ble-setup-auth-and-ota-runway-wave.md
- 2026-03-19-validate-live-fire-ble-measure-frame-on-amplab.md
handoff_from:
claim_id: 20260319T211500Z-ble-fire-control-lane
topic: wifi-first-remote-audio-transport
queue_epoch:
review_after:
review_status: current
supersedes:

# run-wifi-first-remote-audio-transport-wave

## Requested Outcome

- move the active product lane from BLE rescue/foundation work into the real
  media path
- make Wi-Fi the primary audio transport while treating BLE as setup/control
  and fallback

## Scope

- `repos/ohmic-audio-labs/services/hardware/audioTransport.ts`
- `repos/ohmic-audio-labs/services/hardware/sourceArbitration.ts`
- `repos/ohmic-audio-labs/services/ohmicLiveLink/*`
- `repos/ohmic-audio-labs/services/backend/src/wsHub.ts`
- `repos/ohmic-audio-labs/services/hardware/amplab/*`
- `repos/ohmic-audio-labs/components/Hardware/*`
- `repos/amplab-firmware/src/main.cpp`
- `repos/amplab-firmware/src/dsp/*`
- `docs/roadmap/*BLE*`

## Constraints

- keep the working BLE scan/connect/setup/control lanes intact
- do not over-invest in BLE audio as the main media backbone
- prefer one shared Wi-Fi media contract for:
  - phone Bluetooth ingested by the remote unit
  - remote SD card playback
  - remote USB playback
- OTA stays behind the same trust/authority floor and should not fork its own
  media/control model

## Notes

- live Fire + AmpLab BLE validation is complete enough to stop treating BLE as
  the main unknown
- user clarified the intended product shape:
  - remote unit is the source hub
  - primary transport is Wi-Fi HiFi audio
  - BLE is last resort for audio and first class for setup/control
- AmpLab now has one honest local measurement source; the remaining DSP-side
  frame-source gap should be evaluated inside this broader Wi-Fi-first audio
  lane rather than as another BLE-only detour

## Ready When

- one explicit Wi-Fi-first audio transport wave exists on the board with the
  remote-source hub model, source arbitration, and node playback path sequenced
  ahead of OTA implementation
