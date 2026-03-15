Status: implementation_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic AmpLab Vs Device-Link Naming Boundary

## Canonical Layer Names

- `Ohmic Live Link`
  The generic discovery, find, link, and endpoint-selection layer.

- `Ohmic Audio Labs`
  The main shell and workspace.

- `AmpLab Deck`
  The interpolated control/view surface inside the shell.

- `AmpLab`
  The actual device/product/protocol surface.

## Applied First Safe Slice

The shell copy now separates current-link state from discovery semantics:

- the deck shows the current linked device in the `Unit:` row
- the deck no longer says `Unit: linked: ...`
- when devices are discoverable but none is linked, the row now reads
  `Unit: none linked`
- discovery/finding behavior stays described separately from the current-link
  state

## Why This Helps

This makes it harder to conflate:

- AmpLab the device
- AmpLab Deck the surface
- Ohmic Live Link the generic find/link layer

It also keeps future rename work incremental instead of forcing a full code
rewrite in one pass.
