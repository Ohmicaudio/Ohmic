Date: 2026-03-17
Project: cyd-remote
Status: done

# Ohmic Live Slot And Missing Source Quarantine Result

The reserved small-screen dynamic surface is now treated as a generic live slot
instead of a fake `RTA` page or a DSP-only promise.

## Result

- `UI_PAGE_VISUAL` now opens its own live-slot screen instead of incorrectly
  routing to the monitor page
- the page label is now `Live`, not `RTA`
- normal mode only shows honest live-source truth:
  - active source
  - available source
  - missing source
  - host alive / linked state
- the copy explicitly leaves room for future stream, run, or status panes
  without reintroducing fake motion into normal mode

## Verification

- `cyd-remote` build passed for `cyd24r`
- commits pushed:
  - `d9cab77` `Reserve stream slot outside normal demo behavior`
  - `3bf88fb` `Generalize reserved live slot naming`

## Honest Gap

The last remote upload attempt for this specific naming pass hit a hardware
boot-mode issue on `COM16`, so the code is built and pushed, but the final
renaming copy has not been re-verified on-screen in this pass.
