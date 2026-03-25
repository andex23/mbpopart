# MB Pop Art

Next.js + Sanity implementation of [mbpopart.com](https://www.mbpopart.com), with fixed layout templates and CMS-managed content.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Sanity Studio v3 (embedded at `/studio`)

## Key Routes

- `/` home
- `/bio`
- `/gallery`
- `/available`
- `/commissions`
- `/photos`
- `/studio` Sanity CMS

## Project Layout

- `src/app/` routes, API endpoints, global styles
- `src/components/` UI building blocks
- `src/lib/` Sanity client, queries, mapping, and fetch helpers
- `schemaTypes/` Sanity schema documents/objects
- `src/data/` migration seed sources from legacy content
- `docs/` Mintlify documentation

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-23
SANITY_REVALIDATE_SECRET=your_revalidate_secret
SANITY_API_WRITE_TOKEN=your_sanity_write_token
```

3. Start local app:

```bash
npm run dev -- --port 3010
```

4. Open:

- Site: `http://localhost:3010`
- Studio: `http://localhost:3010/studio`

## Seed CMS Content

Seed all singleton documents and paintings:

```bash
curl -X POST "http://localhost:3010/api/cms/seed?scope=all&secret=$SANITY_REVALIDATE_SECRET"
```

Seed only singleton documents:

```bash
curl -X POST "http://localhost:3010/api/cms/seed?scope=singletons&secret=$SANITY_REVALIDATE_SECRET"
```

## Revalidation

Webhook endpoint:

```text
/api/revalidate?secret=SANITY_REVALIDATE_SECRET
```

Set this URL in Sanity webhooks for publish/update events.

## Build and Run

```bash
npm run build
npm run start
```

## Mintlify Docs

Documentation is managed with Mintlify config at `mint.json`.

Local docs preview:

```bash
npx mintlify dev
```

## Deployment (Vercel)

1. Push branch to GitHub.
2. Import project in Vercel.
3. Add all required environment variables.
4. Deploy.
5. Register Studio host in Sanity (`https://your-domain/studio`) and add CORS origin (`https://your-domain`).

## Sanity Backups

Manual backup:

```bash
SANITY_AUTH_TOKEN=your_sanity_token npm run backup:sanity
```

Manual restore into a non-production dataset:

```bash
SANITY_AUTH_TOKEN=your_sanity_token npm run restore:sanity -- backups/sanity/production-YYYYMMDDTHHMMSSZ.tar.gz staging-restore --replace
```

Detailed backup and restore notes:

- `docs/operations/sanity-backups.md`
