#!/usr/bin/env python3
from __future__ import annotations

import argparse
import fnmatch
import hashlib
import json
import os
from pathlib import Path
import re
from typing import Any

import yaml


TOOL_ROOT = Path(__file__).resolve().parent
DEFAULT_MANIFEST = TOOL_ROOT / "corpus.yaml"
DEFAULT_COLLECTION = "ohmic_context"


def load_manifest(path: Path) -> dict[str, Any]:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"Manifest is not an object: {path}")
    return data


def normalize_patterns(raw: list[Any] | None) -> list[str]:
    patterns: list[str] = []
    for item in raw or []:
        if isinstance(item, str) and item.strip():
            patterns.append(item.strip())
    return patterns


def matches_any(rel_path: str, patterns: list[str]) -> bool:
    if not patterns:
        return False
    rel = Path(rel_path)
    for pattern in patterns:
        if rel.match(pattern) or fnmatch.fnmatch(rel_path, pattern):
            return True
    return False


def should_exclude_dir(rel_dir: str, patterns: list[str]) -> bool:
    if not rel_dir:
        return False
    probe = f"{rel_dir}/__dir__"
    return matches_any(rel_dir, patterns) or matches_any(probe, patterns)


def static_prefix(pattern: str) -> str:
    parts = Path(pattern).parts
    prefix_parts: list[str] = []
    for part in parts:
        if any(char in part for char in "*?[]"):
            break
        prefix_parts.append(part)
    if not prefix_parts:
        return "."
    return Path(*prefix_parts).as_posix()


def resolve_root_path(raw_root: str) -> Path:
    raw = raw_root.strip()

    # Support WSL-style mount roots when running on Windows.
    if os.name == "nt":
        wsl_match = re.match(r"^/mnt/([a-zA-Z])(?:/(.*))?$", raw)
        if wsl_match:
            drive = wsl_match.group(1).upper()
            suffix = (wsl_match.group(2) or "").replace("/", "\\")
            windows_root = f"{drive}:\\{suffix}" if suffix else f"{drive}:\\"
            return Path(windows_root).resolve()
        return Path(raw).resolve()

    # Support Windows-style drive paths when running under WSL/Linux.
    windows_match = re.match(r"^([a-zA-Z]):[\\/]*(.*)$", raw)
    if windows_match:
        drive = windows_match.group(1).lower()
        suffix = windows_match.group(2).replace("\\", "/")
        posix_root = f"/mnt/{drive}/{suffix}" if suffix else f"/mnt/{drive}"
        return Path(posix_root).resolve()

    return Path(raw).resolve()


def iter_repo_files(repo_entry: dict[str, Any]) -> list[tuple[Path, str]]:
    root = resolve_root_path(str(repo_entry["root"]))
    includes = normalize_patterns(repo_entry.get("include"))
    excludes = normalize_patterns(repo_entry.get("exclude"))
    if not root.exists():
        raise FileNotFoundError(f"Repo root does not exist: {root}")

    files: dict[str, Path] = {}
    for pattern in includes:
        if not any(char in pattern for char in "*?[]"):
            path = root / pattern
            if path.is_file():
                rel_path = path.relative_to(root).as_posix()
                if not matches_any(rel_path, excludes):
                    files[rel_path] = path
            continue

        anchor = root / static_prefix(pattern)
        if not anchor.exists():
            continue

        if "**" in pattern and anchor.is_dir():
            for dirpath, dirnames, filenames in os.walk(anchor, topdown=True):
                rel_dir = Path(dirpath).relative_to(root).as_posix()
                dirnames[:] = [
                    name
                    for name in dirnames
                    if not should_exclude_dir(f"{rel_dir}/{name}" if rel_dir != "." else name, excludes)
                ]
                for filename in filenames:
                    path = Path(dirpath) / filename
                    rel_path = path.relative_to(root).as_posix()
                    if matches_any(rel_path, excludes):
                        continue
                    if matches_any(rel_path, [pattern]):
                        files[rel_path] = path
            continue

        for path in anchor.glob(Path(pattern).name if anchor != root else pattern):
            if not path.is_file():
                continue
            rel_path = path.relative_to(root).as_posix()
            if matches_any(rel_path, excludes):
                continue
            if matches_any(rel_path, [pattern]):
                files[rel_path] = path

    return sorted(((path, rel_path) for rel_path, path in files.items()), key=lambda item: item[1])


def read_text_file(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return None


def make_doc_id(repo_name: str, rel_path: str) -> str:
    digest = hashlib.sha1(f"{repo_name}:{rel_path}".encode("utf-8")).hexdigest()
    return digest


def collect_plan(
    manifest: dict[str, Any], selected_repos: set[str] | None = None
) -> tuple[str, int, list[dict[str, Any]]]:
    collection_name = str(manifest.get("collection") or DEFAULT_COLLECTION)
    total_documents = 0
    included_repos: list[dict[str, Any]] = []

    for repo_entry in manifest.get("repos", []):
        if not isinstance(repo_entry, dict):
            continue
        repo_name = str(repo_entry.get("name") or "unknown")
        if selected_repos and repo_name not in selected_repos:
            continue
        included_repos.append(repo_entry)
        total_documents += len(iter_repo_files(repo_entry))

    return collection_name, total_documents, included_repos


def collect_documents(
    manifest: dict[str, Any], selected_repos: set[str] | None = None
) -> tuple[str, list[str], list[dict[str, Any]], list[str], list[dict[str, Any]]]:
    collection_name = str(manifest.get("collection") or DEFAULT_COLLECTION)
    documents: list[str] = []
    metadatas: list[dict[str, Any]] = []
    ids: list[str] = []
    included_repos: list[dict[str, Any]] = []

    for repo_entry in manifest.get("repos", []):
        if not isinstance(repo_entry, dict):
            continue
        repo_name = str(repo_entry.get("name") or "unknown")
        if selected_repos and repo_name not in selected_repos:
            continue
        repo_root = resolve_root_path(str(repo_entry["root"]))
        repo_kind = str(repo_entry.get("kind") or "mixed")
        included_repos.append(repo_entry)

        for path, rel_path in iter_repo_files(repo_entry):
            content = read_text_file(path)
            if content is None:
                continue
            documents.append(content)
            metadatas.append(
                {
                    "repo": repo_name,
                    "repo_kind": repo_kind,
                    "source": rel_path,
                    "abs_path": str(path),
                    "root": str(repo_root),
                    "type": path.suffix.lstrip(".") or "text",
                }
            )
            ids.append(make_doc_id(repo_name, rel_path))

    return collection_name, documents, metadatas, ids, included_repos


def main() -> int:
    parser = argparse.ArgumentParser(description="Index the Ohmic multi-repo corpus into Chroma")
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST, help="Path to corpus manifest")
    parser.add_argument("--host", default="localhost", help="Chroma host")
    parser.add_argument("--port", type=int, default=8000, help="Chroma port")
    parser.add_argument("--dry-run", action="store_true", help="Print the corpus plan without writing to Chroma")
    parser.add_argument(
        "--repo",
        action="append",
        dest="repos",
        help="Limit indexing to one or more repo names from the corpus manifest",
    )
    args = parser.parse_args()

    manifest = load_manifest(args.manifest)
    selected_repos = set(args.repos or [])

    if args.dry_run:
        collection_name, total_documents, included_repos = collect_plan(manifest, selected_repos or None)
        print(
            json.dumps(
                {
                    "collection": collection_name,
                    "documents": total_documents,
                    "repos": included_repos,
                },
                indent=2,
            )
        )
        return 0

    collection_name, documents, metadatas, ids, included_repos = collect_documents(
        manifest, selected_repos or None
    )

    import chromadb

    print(f"Connecting to ChromaDB at {args.host}:{args.port}...")
    client = chromadb.HttpClient(host=args.host, port=args.port)
    collection = client.get_or_create_collection(name=collection_name)

    print(f"Upserting {len(documents)} documents into '{collection_name}'...")
    if documents:
        collection.upsert(documents=documents, metadatas=metadatas, ids=ids)
    print("Indexing complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
