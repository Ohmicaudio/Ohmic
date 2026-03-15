Status: verified
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Hardware Shell Deck Smoke Check Coverage

## Purpose

Record the first direct automated check for the hardware shell/deck slice so the
new host/deck surfaces are no longer covered only by a root production build.

## Added Check

Test file:

- `B:\ohmic\repos\ohmic-audio-labs\test\components\HardwareShellDecks.test.tsx`

Runnable command:

- `npx vitest run test/components/HardwareShellDecks.test.tsx`

## What It Covers

### Desktop deck stack shell controls

- deck cards render in the expected visible order
- activation buttons still wire the selected deck callback
- collapse controls still wire the collapse callback
- collapsed deck state stops rendering the hidden deck body

### Deck content host mounting

- the AmpLab branch mounts the hardware deck panel path
- auxiliary deck branches switch cleanly between deck content bodies

## Remaining Gap

This closes the biggest honesty gap from the earlier shell-slice verification,
but it is still not a full interactive hardware-route smoke pass.

Still missing:

- a route-level or browser-level hardware shell smoke that mounts the real
  shell in the running app
- direct deck switching validation through the actual route chrome instead of
  only component tests

## Conclusion

The hardware shell/deck slice now has one direct automated component smoke path.
That is a real improvement over the prior "build only" floor, while keeping the
remaining route-level gap explicit.
