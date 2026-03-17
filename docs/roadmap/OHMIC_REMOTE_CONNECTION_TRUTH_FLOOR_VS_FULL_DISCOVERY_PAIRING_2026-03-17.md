Date: 2026-03-17
Project: cyd-remote
Status: done

# Ohmic Remote Connection Truth Floor Vs Full Discovery Pairing

This slice gives the handheld a real connection-truth floor:

- saved target
- boot connect
- reconnect loop
- `/api/status` probe
- UI distinction between `host alive` and `WS linked`

This was always intended as a bounded safety floor, not the final operator
model.

It still does not provide:

- target discovery
- mutual agreement / pairing
- QR onboarding
- automatic host selection
- Wi-Fi join and credential flow

So the remote is now much more honest about communications state, but it is not
yet a full onboarding or discovery client.

Important correction:

- saved host entry is fallback behavior, not the intended primary path
- discovery should become the default path once shared network-core behavior is
  available
- connection actions should be real command/runtime actions first, then mapped
  to the handheld UI
