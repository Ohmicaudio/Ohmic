# Docker Semantic Index And Context Guide

Date: 2026-03-12
Status: active local setup guide

## Purpose

This stack is not the source of truth.

It exists to make cross-repo context retrieval faster when the system spans multiple repos and document trees.

Current intended uses:

- cross-project AI retrieval
- semantic search over contracts, ADRs, docs, and selected code
- temporary context assistance while the system is being migrated and normalized

It should **not** replace:

- git repos
- canonical schemas
- tracked architecture docs
- contract source-of-truth files

## Current Stack

The current local vector database choice is **Chroma**.

Files staged into this umbrella repo:

- [`tools/semantic-index/docker-compose.yml`](/mnt/b/ohmic/tools/semantic-index/docker-compose.yml)
- [`tools/semantic-index/indexer.py`](/mnt/b/ohmic/tools/semantic-index/indexer.py)

Original source:

- `/mnt/a/ohmic-audio-labs/tools/semantic-index/`

## Why this exists

The Ohmic system already spans multiple active code and docs roots:

- `ohmic-audio-labs`
- `amplab-firmware`
- `cyd-remote`
- additional specs, manifests, and hardware notes

That means cross-session or cross-repo context can get fragmented quickly.

The semantic index gives us a fast local retrieval layer while preserving the rule that git remains truth.

## Startup

From the umbrella root:

```bash
cd /mnt/b/ohmic/tools/semantic-index
docker compose up -d
```

Expected service:

- Chroma API at `http://localhost:8000`

Current compose settings:

- image: `chromadb/chroma:latest`
- container name: `ohmic-chromadb`
- persistent named volume: `ohmic-chroma-data`
- reset allowed: `ALLOW_RESET=TRUE`

## Shutdown

```bash
cd /mnt/b/ohmic/tools/semantic-index
docker compose down
```

## Reset

If you intentionally want a clean local semantic index:

```bash
cd /mnt/b/ohmic/tools/semantic-index
docker compose down -v
```

That deletes the named volume data for this stack.

## Integration Intent

This index is for:

- docs
- contracts
- ADRs
- repo maps
- selected code excerpts
- schema summaries

It is not meant to ingest random build artifacts or raw dumps by default.

Recommended ingestion priority:

1. umbrella docs under `B:/ohmic/docs`
2. contract and schema docs from `ohmic-audio-labs`
3. DSP and transport docs from `amplab-firmware`
4. handheld bring-up and UX docs from `cyd-remote`

## Ground Rules

1. The semantic index is an acceleration layer, not a truth store.
2. Every indexed item should point back to a tracked file path or repo source.
3. If a fact in the index disagrees with git, git wins.
4. Do not let this become an uncurated junk sink.

## Recommended Next Step

After repo migration settles:

- add a small indexed corpus manifest
- define what directories are indexed
- define what content is excluded
- record update/rebuild commands in `tools/sync`
