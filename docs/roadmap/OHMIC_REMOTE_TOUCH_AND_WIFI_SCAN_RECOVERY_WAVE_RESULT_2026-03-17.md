Date: 2026-03-17
Project: cyd-remote
Status: done

# Ohmic Remote Touch And Wifi Scan Recovery Wave Result

The handheld recovery wave landed three useful truths:

- stale touch calibration is no longer trusted, so the next boot can force a
  fresh calibration floor instead of reusing bad hitboxes
- Wi-Fi scan state is surfaced honestly enough to distinguish scan work from
  empty or failed results
- auto-scan-on-entry was not retained as the steady-state behavior because it
  exposed a lock boundary on the live device; later work moved scan/join onto
  safer operator-triggered flow and then into the join-floor family

The wave is closed because the recovery goal was met and the unsafe scan-on-entry
path is now documented as a boundary rather than left masquerading as active
work.
