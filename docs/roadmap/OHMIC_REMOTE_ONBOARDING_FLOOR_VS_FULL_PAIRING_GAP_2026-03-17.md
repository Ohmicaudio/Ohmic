Date: 2026-03-17
Project: cyd-remote
Status: done

# Ohmic Remote Onboarding Floor Vs Full Pairing Gap

The remote now has a bounded fallback host-selection floor:

- saved target across boot
- AP-default recovery target
- gateway shortcut for same-LAN use
- bounded IPv4 last-octet retargeting
- reconnect on target change

What it still does not have:

- device discovery
- target claiming / mutual agreement
- QR onboarding
- a remote-specific backend
- Wi-Fi join credentials and network enrollment UI

So this slice makes the handheld operable without source edits, but it does not
complete the pairing story.

Correction note:

- saved target, AP default, and last-octet retargeting are recovery tools, not
  the intended primary onboarding path
- discovery, pairing, and target truth should move under the shared network
  core instead of remaining handheld-local behavior
