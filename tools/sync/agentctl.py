#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


ROOT = Path("/mnt/b/ohmic")
SYNC_DIR = ROOT / "tools" / "sync"
VALIDATE_SH = SYNC_DIR / "validate-agent-system.sh"
REFRESH_SH = SYNC_DIR / "refresh-agent-work-snapshot.sh"


def run_script(script: Path, args: list[str]) -> int:
    if not script.exists():
      print(f"Missing script: {script}", file=sys.stderr)
      return 1
    cmd = [str(script), *args]
    completed = subprocess.run(cmd, check=False)
    return completed.returncode


def handle_validate(args: argparse.Namespace) -> int:
    script_args: list[str] = []
    if args.json:
        script_args.append("--json")
    return run_script(VALIDATE_SH, script_args)


def handle_refresh(args: argparse.Namespace) -> int:
    script_args: list[str] = []
    if args.project:
        script_args.extend(["--project", args.project])
    if args.out_file:
        script_args.extend(["--out-file", args.out_file])
    return run_script(REFRESH_SH, script_args)


def handle_placeholder(command_path: str) -> int:
    print(
        f"`{command_path}` is not implemented yet in agentctl.\n"
        "Use the existing PowerShell or bash wrappers for this command family for now.",
        file=sys.stderr,
    )
    return 2


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="agentctl",
        description="Cross-platform entrypoint for the Ohmic shared agent system.",
    )
    subparsers = parser.add_subparsers(dest="command")

    validate_parser = subparsers.add_parser("validate", help="Run shared agent-system validation.")
    validate_parser.add_argument("--json", action="store_true", help="Emit JSON validator output.")
    validate_parser.set_defaults(handler=handle_validate)

    refresh_parser = subparsers.add_parser("refresh", help="Refresh generated agent-work snapshots.")
    refresh_parser.add_argument("--project", default="", help="Optional project filter.")
    refresh_parser.add_argument("--out-file", default="", help="Optional output file override.")
    refresh_parser.set_defaults(handler=handle_refresh)

    claim_parser = subparsers.add_parser("claim", help="Claim workflow commands.")
    claim_subparsers = claim_parser.add_subparsers(dest="claim_command")
    for claim_command in ("status", "create", "complete"):
        sub = claim_subparsers.add_parser(claim_command, help=f"Placeholder for claim {claim_command}.")
        sub.set_defaults(handler=lambda _args, cmd=f"claim {claim_command}": handle_placeholder(cmd))

    request_parser = subparsers.add_parser("request", help="Request workflow commands.")
    request_subparsers = request_parser.add_subparsers(dest="request_command")
    for request_command in ("list", "create", "move"):
        sub = request_subparsers.add_parser(request_command, help=f"Placeholder for request {request_command}.")
        sub.set_defaults(handler=lambda _args, cmd=f"request {request_command}": handle_placeholder(cmd))

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    if not getattr(args, "command", None):
        parser.print_help()
        return 0

    handler = getattr(args, "handler", None)
    if handler is None:
        parser.print_help()
        return 1

    return handler(args)


if __name__ == "__main__":
    raise SystemExit(main())
