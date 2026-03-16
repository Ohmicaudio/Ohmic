Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T015315Z-d297c42d

# Reconcile Ohmic Audio Labs Public Deletion Wave

## Goal

Run the first grouped normalization pass on the `public/*` deletion wave so it
stops colliding with active product work.

## Source

- `docs/roadmap/OHMIC_AUDIO_LABS_NONPRODUCT_DIRTY_DOMAIN_CLASSIFICATION_2026-03-15.md`

## Focus

- current deletion set under `public/*`
- app-owned keepers vs migrated static-host content
- one deliberate prune/reconcile packet

## Acceptance

- the public deletion wave is classified and reconciled deliberately
- casual `public/*` drift stops competing with product work
- one bounded prune packet is obvious or landed

## Result

- classified the full `594`-entry app-side `public/*` deletion wave against the
  already-live static-content repo and documented the deliberate prune packet
  in `docs/roadmap/OHMIC_AUDIO_LABS_PUBLIC_DELETION_RECONCILIATION_PACKET_2026-03-15.md`
- identified the only real app-owned keeper dependency:
  `scripts/generate-android-logo-assets.mjs` still reading
  `public/ohmic-logo.svg`
- retargeted Android logo generation to the existing app-local asset at
  `android/app/src/main/assets/public/ohmic-logo.svg`, leaving no known
  build-critical dependency on the removed app-side `public/*` tree
- verified:
  - `node -e "const fs=require('fs'); const path=require('path'); const p=path.resolve('B:/ohmic/repos/ohmic-audio-labs/android/app/src/main/assets/public/ohmic-logo.svg'); console.log(fs.existsSync(p)?p:'MISSING')"`
  - `npm run build`
