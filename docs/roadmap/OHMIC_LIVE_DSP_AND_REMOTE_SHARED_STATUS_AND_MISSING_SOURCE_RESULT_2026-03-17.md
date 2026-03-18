Date: 2026-03-17
Project: firmware
Status: done

# Ohmic Live DSP And Remote Shared Status And Missing Source Result

Live validation on March 17, 2026 confirmed that the active DSP-plus-remote
bench now reflects the shared status/source contract truthfully.

## Evidence

- live DSP on `192.168.1.113` returned `/api/status/core` with:
  - `node_kind = dsp_1701`
  - `runtime_role = controlled_node`
  - `network_mode = ap+sta_live`
  - `role_resolution = provisional`
  - `authority_state = unresolved`
  - `stream.state = missing`
  - `stream.available = false`
  - `stream.reason = stream source not implemented`
  - `network.target.class = recovery_ap`
  - `network.target.route_note = Recovery target off current LAN`
- live DSP `/api/status` legacy wrapper also matched the shared floor:
  - `topic = dsp.status`
  - `device.name = OHMIC-DSP-D4DB1C`
  - `connection.ws.clients = 5`
- remote serial on `COM16` reported:
  - `page=control`
  - `wifi=1`
  - `ssid=NETGEAR54`
  - `ws=1`
  - `host=192.168.1.113`

## Result

- the remote is reading live DSP shared status over the current contract
- missing-source truth is explicit and stable instead of decorative
- the active link is on the LAN host, not blind recovery AP routing
- current authority truth is visible as provisional/unresolved instead of
  implied ownership

## Scope Note

This validates the current DSP-plus-remote bench lane. AmpLab remains unplugged
and is not part of this result packet.
