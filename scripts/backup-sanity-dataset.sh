#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

: "${NEXT_PUBLIC_SANITY_PROJECT_ID:?NEXT_PUBLIC_SANITY_PROJECT_ID is required}"
: "${NEXT_PUBLIC_SANITY_DATASET:?NEXT_PUBLIC_SANITY_DATASET is required}"

export SANITY_AUTH_TOKEN="${SANITY_AUTH_TOKEN:-${SANITY_API_WRITE_TOKEN:-}}"
: "${SANITY_AUTH_TOKEN:?SANITY_AUTH_TOKEN or SANITY_API_WRITE_TOKEN is required}"

BACKUP_DIR="${BACKUP_DIR:-$ROOT_DIR/backups/sanity}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUTPUT_PATH="${1:-$BACKUP_DIR/${NEXT_PUBLIC_SANITY_DATASET}-${TIMESTAMP}.tar.gz}"

mkdir -p "$(dirname "$OUTPUT_PATH")"

echo "Exporting Sanity dataset '${NEXT_PUBLIC_SANITY_DATASET}'..."
npx --yes sanity dataset export "$NEXT_PUBLIC_SANITY_DATASET" "$OUTPUT_PATH" --overwrite

CHECKSUM="$(shasum -a 256 "$OUTPUT_PATH" | awk '{print $1}')"
ARCHIVE_NAME="$(basename "$OUTPUT_PATH")"
CHECKSUM_PATH="${OUTPUT_PATH}.sha256"
MANIFEST_PATH="${OUTPUT_PATH}.json"
ARCHIVE_SIZE_BYTES="$(stat -f%z "$OUTPUT_PATH" 2>/dev/null || stat -c%s "$OUTPUT_PATH")"

printf '%s  %s\n' "$CHECKSUM" "$ARCHIVE_NAME" > "$CHECKSUM_PATH"

cat > "$MANIFEST_PATH" <<JSON
{
  "projectId": "${NEXT_PUBLIC_SANITY_PROJECT_ID}",
  "dataset": "${NEXT_PUBLIC_SANITY_DATASET}",
  "createdAtUtc": "${TIMESTAMP}",
  "archiveFile": "${ARCHIVE_NAME}",
  "archivePath": "${OUTPUT_PATH}",
  "archiveSizeBytes": ${ARCHIVE_SIZE_BYTES},
  "sha256": "${CHECKSUM}"
}
JSON

echo "Backup created:"
echo "  Archive:  $OUTPUT_PATH"
echo "  Checksum: $CHECKSUM_PATH"
echo "  Manifest: $MANIFEST_PATH"
