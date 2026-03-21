scope: project
authority: working
project: ohmic-audio-labs
status: ready
requested: 2026-03-20
requester: user
origin: agent
priority: medium
blocking: no
depends_on:
- 2026-03-20-flash-remote-ble-command-parity-and-retry-fire-route.md
- 2026-03-20-wire-live-dsp-measure-frame-source-for-ble-transport.md
handoff_from:
claim_id:
topic: live-audio-route-validation
queue_epoch:
review_after:
review_status: current
supersedes:

# Run live audio route preference validation

## Goal

Use the new shared `media.route.preference.set` runtime contract to validate at least one real audio path end-to-end on live hardware.

## Inputs

- DSP BLE parity is live and confirmed through Fire logs
- route preference runtime/status is now shared across firmware, web, and Fire BLE UI
- Fire app exposes compact route-preference controls

## Deliverable

- one documented live route validation result covering:
  - selected route preference
  - selected source
  - observed DSP subscriber topic / active topic
  - whether actual audio transport matched the intended route

## Preferred order

1. `remote.bt.wifi.dsp`
2. `direct.wifi.dsp`
3. `direct.bt.dsp`

## Scope

- B:\ohmic\repos\ohmic-audio-labs\components\Hardware\*
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\*
- B:\ohmic\docs\roadmap\*

## Constraints

- keep this packet focused on validation and recorded findings
- store cross-project validation notes in umbrella docs if new documentation is needed

## Notes

- this packet belongs to the same remote/audio transport wave and should classify as `ohmic-audio-labs`

## Ready When

- the route-validation packet is project-tagged and bounded enough to claim without rereading surrounding chat

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-audio-labs\components\Hardware\*
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\*
- B:\ohmic\docs\roadmap\*
