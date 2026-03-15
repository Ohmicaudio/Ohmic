Status: validation_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Live AmpLab DSP Validation

## Device Found

- live device IP: `192.168.1.113`
- identity: `amp-24DA5ED4DB1C`
- advertised name: `AmpLab-D4DB1C`
- reported role: `master`

## Live Discovery Result

`GET /api/status` responded successfully without additional auth from:

- `http://192.168.1.113/api/status`

Observed live state:

- STA connected on `NETGEAR54`
- device IP `192.168.1.113`
- AP SSID `AmpLab-SIM`
- transport mode `ap+sta-http-serial-can`
- WS clients `1`
- stream enabled `true`
- BLE `disabled`

## Live Telemetry Result

`GET /api/state` responded successfully and returned live telemetry, including:

- DC supply voltage around `33.36 V`
- thermal readings around `43 C`
- remote/contact state fields
- channel telemetry arrays for `vin_a` and speaker lanes

`GET /api/inputs` also responded successfully and returned enabled analog inputs,
including:

- `Supply V`
- `Vin A`
- `Vin B`
- `Vin C`
- `Vin D`
- `Die Temp`

## Honest Scope Boundary

This validates:

- live device reachability on the local network
- the HTTP discovery/status path
- the HTTP telemetry/input path

This does not yet validate:

- browser UI discovery list rendering
- browser auto-link/manual-link behavior against the live unit
- browser WS telemetry behavior against the live unit
