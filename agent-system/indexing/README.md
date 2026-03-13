# Indexing and Retrieval

This folder documents how the shared agent system should use the semantic index.

## Role of the Database

The vector database exists to accelerate lookup across long-lived reference material.

It is for:

- finding the right document quickly
- surfacing similar prior decisions
- locating relevant architecture, contract, and handoff notes

It is not for:

- overriding source Markdown files
- storing the only copy of memory
- replacing repo inspection

## Recommended Index Corpus

Index first:

- `B:\ohmic\agent-system\AGENTS.md`
- `B:\ohmic\agent-system\instructions\*.md`
- `B:\ohmic\agent-system\memory\*.md`
- `B:\ohmic\agent-system\projects\*.md`
- stable docs in `B:\ohmic\docs\`
- selected durable handoffs

Index later:

- archived reference docs
- repo-local architecture/spec docs with repeated reuse value

Avoid indexing:

- temporary scratch files
- noisy generated output
- stale duplicate archives unless they have known historical value

## Suggested Metadata

Attach lightweight metadata per chunk or document:

```text
path
title
scope
horizon
authority
project
topic
updated
```

## Retrieval Rules

- retrieve shared agent docs first
- retrieve project overlays second
- retrieve repo-local docs third
- prefer canonical over working, and working over reference, when ranking results
