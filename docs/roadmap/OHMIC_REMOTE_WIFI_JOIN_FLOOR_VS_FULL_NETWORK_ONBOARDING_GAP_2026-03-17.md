Date: 2026-03-17
Project: cyd-remote
Status: done

# Ohmic Remote Wifi Join Floor Vs Full Network Onboarding Gap

What the handheld Wi-Fi join floor now does:

- scan visible networks
- select a candidate SSID
- join open or secured networks
- persist and retry saved credentials
- report compact join-result truth to the operator

What it does not do yet:

- discover candidate Ohmic hosts automatically after join
- negotiate pairing or ownership
- resolve cloud vs LAN vs AP recovery targets by itself
- present a full network-management workflow across multiple remembered nodes

The next honest follow-on is shared target selection and onboarding truth over
the converged network core, not more local-only Wi-Fi UI branching.

Correction note:

- the handheld Wi-Fi page can expose join actions, but those actions should map
  onto shared network-core behavior
- discovery and candidate host selection should become the default follow-on
  after join
- manual target entry should remain available only as fallback or recovery
