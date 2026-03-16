Status: blocked
Priority: medium
Date: 2026-03-16
Project: ohmic

# Rerun Phone Assisted AmpLab Smoke After Candidate Normalization

## Goal

Repeat the bounded phone-assisted AmpLab smoke flow only after the candidate
normalization fixes land.

## Focus

- corrected candidate list
- AP/LAN identity behavior
- refresh and link attempt
- honest post-fix outcome packet

## Acceptance

- the rerun happens against corrected candidate truth
- the resulting pass or blocker is attributable to a narrower remaining seam

## Blocker

- desktop direct requests to `http://192.168.1.113/api/status` and
  `http://192.168.4.1/api/status` both timed out during closeout
- no honest post-fix handset link pass has been recorded yet

## Resume When

- at least one live device endpoint responds from the desktop again
- the Fire/handset path is rerun against the corrected host
