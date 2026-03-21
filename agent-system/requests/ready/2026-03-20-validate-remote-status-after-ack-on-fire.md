scope: project
authority: working
project: ohmic-audio-labs
status: ready
requested: 2026-03-20
requester: user
origin: agent
priority: high
blocking: no
depends_on:
- 2026-03-20-flash-remote-ble-command-parity-and-retry-fire-route.md
handoff_from:
claim_id:
topic: remote-status-after-ack
queue_epoch:
review_after:
review_status: current
supersedes:

# Validate Remote Status After Ack On Fire

## Goal

Confirm that a remote BLE route/source action on the Fire now surfaces the follow-up `sys.status.core` after the `amplab.ack`.

## Done When

- Fire connects to remote BLE peer
- pressing a remote source or route-preference control yields:
  - `RX amplab.ack`
  - `RX sys.status.core`
- Fire log and on-screen BLE log both reflect the updated route/media summary clearly

## Context

- remote BLE command parity is already live
- remote notify pacing is now live on `COM16`
- Fire BLE suite now retries `sys.status.core` after route/source ack

## Scope

- B:\ohmic\repos\ohmic-audio-labs\components\Hardware\*
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\ble\*

## Constraints

- keep this packet focused on status-after-ack validation
- do not widen into unrelated DSP or Wi-Fi transport changes

## Notes

- this packet belongs to the current Fire/remote validation lane and should classify as `ohmic-audio-labs`

## Ready When

- the packet is project-tagged and bounded enough for the board and poller to treat it as valid ready work

## Suggested Claim Scope

- B:\ohmic\repos\ohmic-audio-labs\components\Hardware\*
- B:\ohmic\repos\ohmic-audio-labs\services\hardware\ble\*
