#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

ARCHIVE_PATH="${1:-}"
TARGET_DATASET="${2:-${NEXT_PUBLIC_SANITY_DATASET:-}}"
IMPORT_MODE="${3:---replace}"

if [[ -z "$ARCHIVE_PATH" ]]; then
  echo "Usage: bash scripts/restore-sanity-dataset.sh <backup.tar.gz> [target-dataset] [--replace|--missing]" >&2
  exit 1
fi

if [[ ! -f "$ARCHIVE_PATH" ]]; then
  echo "Backup file not found: $ARCHIVE_PATH" >&2
  exit 1
fi

if [[ -z "$TARGET_DATASET" ]]; then
  echo "Target dataset is required as the second argument or via NEXT_PUBLIC_SANITY_DATASET." >&2
  exit 1
fi

if [[ "$IMPORT_MODE" != "--replace" && "$IMPORT_MODE" != "--missing" ]]; then
  echo "Import mode must be --replace or --missing." >&2
  exit 1
fi

: "${NEXT_PUBLIC_SANITY_PROJECT_ID:?NEXT_PUBLIC_SANITY_PROJECT_ID is required}"

export SANITY_AUTH_TOKEN="${SANITY_AUTH_TOKEN:-${SANITY_API_WRITE_TOKEN:-}}"
: "${SANITY_AUTH_TOKEN:?SANITY_AUTH_TOKEN or SANITY_API_WRITE_TOKEN is required}"

if [[ "$TARGET_DATASET" == "${NEXT_PUBLIC_SANITY_DATASET}" && "${SANITY_RESTORE_PRODUCTION:-0}" != "1" ]]; then
  echo "Refusing to restore directly into the production dataset." >&2
  echo "Set SANITY_RESTORE_PRODUCTION=1 only if you intentionally want to overwrite production." >&2
  exit 1
fi

echo "Importing '$ARCHIVE_PATH' into dataset '$TARGET_DATASET'..."
npx sanity dataset import "$ARCHIVE_PATH" "$TARGET_DATASET" "$IMPORT_MODE"
