Status: validation_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Browser UI Live AmpLab Link Flow

## Scope

Validate the actual browser-side AmpLab discovery and link flow against the
known live unit on the local network.

## Preconditions Used

- frontend served at `http://127.0.0.1:4174`
- backend bridge served at `http://127.0.0.1:8787`
- live device remained reachable at `http://192.168.1.113/api/status`
- browser automation was driven through the local Playwright CLI session

## Observed Browser Flow

1. Opened the main product shell at `http://127.0.0.1:4174/`.
2. Confirmed the root shell rendered the ecosystem launcher cards, including the
   AmpLab entry tile.
3. Entered `Hardware Lab -> AmpLab Deck`.
4. Initial AmpLab deck state did not auto-link to the live unit:
   - `Runtime Source: Simulated AmpLab data`
   - `Source: SIM`
   - `Discovery: No reachable AmpLab units detected`
5. With the backend bridge live, clicking `Refresh Units` updated discovery to
   `1 unit(s) detected` and selected:
   - `[LINKED] amp-24DA5ED4DB1C (AmpLab-SIM)`
6. Clicking `Link Unit` promoted the transport from simulated mode to the live
   hardware path:
   - `Runtime Source: Real AmpLab hardware`
   - `Source: AM1`
   - `Discovery: Linked to amp-24DA5ED4DB1C (AmpLab-SIM)`

## Browser Telemetry Result

After the explicit refresh-plus-link step, the AmpLab deck surfaced live device
telemetry in the browser shell, including:

- `VIN 33.04V`
- input current totals and per-channel current values
- thermal readings around `46.0C`
- live remote/contactor state
- speaker output rows

This confirms the browser telemetry path can reach the live unit once the user
refreshes discovery and explicitly links.

## Honest Boundaries

Validated:

- browser shell can reach the AmpLab deck
- discovery list renders in-browser
- live unit appears in the browser discovery list after refresh
- explicit link promotes the runtime source from `SIM` to real hardware
- browser shell displays live transport and telemetry state after linking

Not validated:

- automatic link on first deck entry
- phone browser path
- wrapper/mobile shell path

## Findings

- auto-link did not happen on initial AmpLab deck entry
- a manual `Refresh Units` step was required before the live unit appeared
- a manual `Link Unit` step was required before the runtime source switched to
  live hardware
- the browser console still emits repeated `404` noise against
  `/api/proxy?url=http%3A%2F%2F127.0.0.1%2Fapi%2Fstatus` while offline fallback
  candidates are probed; this did not block the final live link, but it is real
  browser-layer drift worth cleanup
