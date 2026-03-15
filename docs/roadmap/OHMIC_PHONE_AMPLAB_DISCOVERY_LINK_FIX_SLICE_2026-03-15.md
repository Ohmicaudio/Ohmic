Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Phone AmpLab Discovery Link Fix Slice

## Purpose

Capture the next highest-value fix after the phone-assisted live smoke result:
the phone can reach the app and backend, but still does not discover or link to
the live AmpLab unit on-device.

## Why This Is Now Top Priority

The current evidence says:

- browser shell path works after explicit `Refresh Units` + `Link Unit`
- live DSP HTTP reachability is proven
- phone can load the UI and talk to the sync/backend bridge
- only the phone-side AmpLab discovery/link layer remains unproven and blocked

If mobile-first is the real product direction, this is now a stronger next fix
than more desktop-only shell polish.

## Exact Slice Scope

- phone/browser AmpLab discovery behavior only
- phone/browser manual-link or explicit refresh-link behavior only
- no broader wrapper, BLE, or measurement orchestration work

## Target Questions

1. Is the phone path failing to probe the same candidate endpoints as desktop?
2. Does the phone path render stale cached candidates instead of live ones?
3. Is the browser-side proxy/fallback logic behaving differently on handset?
4. Can the phone path link successfully if the known unit base URL is injected
   or selected explicitly?

## Acceptance

- one precise phone-side discovery/link failure or fix is recorded
- the result is isolated from generic Wi-Fi or backend availability
- follow-on work can target the exact phone/browser layer instead of guessing

## Explicitly Out Of Scope

- Android wrapper packaging
- BLE provisioning
- generalized hardware shell cleanup
- static-site or landing-page refinement
