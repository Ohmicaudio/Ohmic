Status: validation_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Phone AmpLab Discovery Link Rerun Result

## Scope

Re-run the real phone/tablet-assisted AmpLab discovery flow after the
discovery-origin proxy fix and record the honest device result.

## Device Used

- Fire tablet `GCC19D051497020B`
- Silk browser over local Wi-Fi
- live app host `http://192.168.1.91:4175`
- sync/backend host `http://192.168.1.91:8787`
- live AmpLab status endpoint `http://192.168.1.113/api/status`

## Verified Inputs

- `http://192.168.1.113/api/status` returned `200` during the rerun
- the Fire browser loaded the live app shell on `192.168.1.91:4175`
- the Fire browser joined the shared sync session and reported `Peers: 1`
  after reload

This means the rerun was done against the real live surfaces, not a mock-only
desktop emulation.

## Rerun Outcome

Result: blocker remains

After entering the AmpLab deck on the Fire browser and pressing
`Refresh Devices`, the page still ended at:

- `Discovery: No reachable devices detected`
- `Unit: 192.168.1.91`

The discoverable device list still contained only offline local-host style
entries:

- `192.168.1.91`
- `192.168.1.91:4175`
- `amplab.local`
- `ampmaster.local`
- `ohmiclab.local`

The real live unit at `192.168.1.113` never appeared in the list, so phone-side
link success could not be validated.

## Cache Sanity Check

One bounded retry cleared these local browser keys first:

- `ohmic_amplab_http_url`
- `ohmic_amplab_ws_url`
- `ohmic_amplab_known_endpoints_v1`

After reload plus another `Refresh Devices`, the Fire browser still ended at:

- `Discovery: No reachable devices detected`
- `Unit: 192.168.1.91`

That means stale cached endpoints are not the only blocker.

## What This Rerun Proved

Validated:

- the live unit itself is reachable on the LAN
- the Fire browser can load the app shell
- the Fire browser can join the shared sync session
- the failure persists even after clearing stale cached AmpLab endpoint values

Not validated:

- phone-side discovery success against the live AmpLab unit
- phone-side link success
- phone-side confirmation that the linked/current unit disappears from the
  discovery list after linking

## Remaining Blocker

The remaining failure is still in the discovery propagation layer.

The Fire browser never received a usable live hardware candidate for
`192.168.1.113`; it stayed on local-host fallback candidates instead.

The next fix should stay focused on why the handset/browser session is not
getting a valid discovered AmpLab IP candidate even when:

- sync session presence exists
- the backend origin is known
- the live AmpLab endpoint itself is reachable
