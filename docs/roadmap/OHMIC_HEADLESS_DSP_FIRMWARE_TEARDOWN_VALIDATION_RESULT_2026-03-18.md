Date: 2026-03-18
Project: firmware
Status: done

# Ohmic Headless DSP Firmware Teardown Validation Result

The DSP firmware teardown crossed the point where `main.cpp` is no longer the
primary implementation file. It now acts mostly as wiring over core-owned
modules for:

- app lifecycle and loop orchestration
- HTTP status and runtime Wi-Fi routes
- transport dispatch, reply, websocket, and serial glue
- network bootstrap, target truth, and network-status shaping
- plugin attach/update flow
- identity helpers
- master-control helpers
- Wi-Fi profile runtime persistence/adaptation

Headless-first validation is now the default iteration path for the live DSP
bench because the display stack has not been the source of runtime divergence
for these core/comms refactors.

## Live bench result

The live DSP on `COM27` was repeatedly flashed with the headless
`esp32s3_dsp_headless` build and remained healthy on LAN at
`http://192.168.1.113`.

Verified live HTTP surfaces:

- `/api/status/core`
- `/api/status`
- `/api/wifi/status`
- `/api/wifi/profiles`
- `/api/wifi/scan`

Observed runtime truth after the latest headless validation:

- `identity.node_kind = dsp_1701`
- `identity.board_profile = dsp_apm2_esp32s3`
- `capabilities.display = false`
- `network.station_ssid = NETGEAR54`
- `network.station_ip = 192.168.1.113`
- `network.target.class = recovery_ap`
- `plugins.http.active = true`
- `plugins.ws.active = true`

The legacy/hybrid status surface also remained coherent, including:

- `topic = dsp.status`
- `device.name = OHMIC-DSP-D4DB1C`
- `transport_mode = ap+sta-http-serial-can`
- `connection.sta.selected_profile = 0`
- `connection.sta.profile_count = 1`

## Why this matters

This is the point where further refactoring should stop optimizing for "make
`main.cpp` smaller at any cost" and start optimizing for stable shared command
ownership and cross-profile convergence.

The next correct move is:

- treat the teardown as operationally validated on the DSP bench
- continue the shared `sys.network.*` and command-surface cleanup from this
  headless producer baseline
- only bring AmpLab back into the lane after the producer contract is stable
  enough to compare profiles instead of debugging basic teardown fallout
