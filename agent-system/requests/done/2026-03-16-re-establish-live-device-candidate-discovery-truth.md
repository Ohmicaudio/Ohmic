Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T112206Z-b79199f9

# Re Establish Live Device Candidate Discovery Truth

## Goal

Reconfirm the current discovery candidate set and the truthful boundary between
reachable devices, stale candidates, and missing live candidates.

## Focus

- candidate source list
- stale candidate removal
- live endpoint reachability
- discovery truth summary

## Acceptance

- discovery truth is explicit again
- stale candidate confusion is reduced before rerun

## Result

Completed on 2026-03-16.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_LIVE_DEVICE_CANDIDATE_DISCOVERY_TRUTH_2026-03-16.md`

Outcome:

- direct device truth now explicitly records both `ap_ip=192.168.4.1` and
  `sta.ip=192.168.1.113`
- browser-side candidate state was confirmed to still be seeded only by
  `http://amplab.local`
- the browser-visible select list still omitted both the AP and LAN identities
