Date: 2026-03-17
Project: firmware
Status: done

# Ohmic Live AP Guard And LAN Target Validation Result

Live validation on March 17, 2026 confirmed that the handheld is no longer
falling back into blind `192.168.4.1` websocket retries while joined to the
normal LAN, even on a noisy host with multiple active Wi-Fi adapters.

## Evidence

- Windows host showed two active `192.168.1.x` Wi-Fi interfaces:
  - `Wi-Fi = 192.168.1.115`
  - `Wi-Fi 2 = 192.168.1.91`
- AmpLab answered live on `http://192.168.1.113/api/status`
- Remote serial on `COM16` reported:
  - `wifi=1`
  - `ssid=NETGEAR54`
  - `ws=1`
  - `host=192.168.1.113`
- A second live serial node reported:
  - `AP_IP=192.168.4.1`
  - `STA=disconnected`
  - `WS=0`

## Result

- actionable LAN target truth is working on the handheld
- wrong-subnet AP retry behavior stayed guarded during this pass
- the saved host stayed on the live LAN target instead of regressing back to
  blind AP websocket retries

## Important Follow-on

The live AmpLab unit is still exposing the richer legacy `/api/status` shape on
the wire. The next consolidation slice should carry that real AmpLab
network/status runtime floor into the shared-core branch instead of assuming the
current shared branch already matches live behavior.
