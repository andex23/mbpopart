# Sanity Backups

This project already has code history in GitHub and deployment rollback history in Vercel. This document covers the missing part: backing up the live Sanity dataset.

## What Is Backed Up

- Sanity documents
- Sanity image/file asset references
- Export metadata and SHA-256 checksum

The export is a gzipped Sanity dataset tarball that can be restored later.

## Manual Backup

Run from the repo root:

```bash
SANITY_AUTH_TOKEN=your_sanity_token npm run backup:sanity
```

That creates files in `backups/sanity/`:

- `production-YYYYMMDDTHHMMSSZ.tar.gz`
- `production-YYYYMMDDTHHMMSSZ.tar.gz.sha256`
- `production-YYYYMMDDTHHMMSSZ.tar.gz.json`

## Manual Restore

Recommended: restore into a separate dataset first, not directly into production.

Create a restore dataset if needed:

```bash
npx sanity dataset create staging-restore --visibility private
```

Restore into that dataset:

```bash
SANITY_AUTH_TOKEN=your_sanity_token npm run restore:sanity -- backups/sanity/production-YYYYMMDDTHHMMSSZ.tar.gz staging-restore --replace
```

Direct production restore is intentionally blocked unless you explicitly opt in:

```bash
SANITY_AUTH_TOKEN=your_sanity_token SANITY_RESTORE_PRODUCTION=1 npm run restore:sanity -- backups/sanity/production-YYYYMMDDTHHMMSSZ.tar.gz production --replace
```

## Scheduled GitHub Backup

Workflow file:

- `.github/workflows/sanity-backup.yml`

Schedule:

- every day at `02:15 UTC`
- can also be run manually with `workflow_dispatch`

GitHub secret required:

- `SANITY_AUTH_TOKEN`

The workflow:

1. checks out the repo
2. installs dependencies
3. exports the `production` dataset
4. uploads the backup files as a GitHub Actions artifact

Artifact retention is currently `90 days`.

## Important Notes

- This backup plan protects Sanity content. GitHub already protects code history, and Vercel already preserves deployment rollback history.
- GitHub Actions artifacts are not permanent archival storage. For longer retention, add external object storage later.
- If content is badly damaged, restore into a separate dataset first and inspect it before touching production.
