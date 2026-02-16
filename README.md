# MBPopArt (Classic-Style Modernization)

Modernized Next.js rebuild of [mbpopart.com](https://www.mbpopart.com) that preserves the original comic-pop visual language and structure while making the site responsive for desktop/tablet/mobile.

## What This Project Preserves

- Original page rhythm and voice
- Top navigation style and route flow
- Speech-bubble container motif
- Left rail (copy/contact) + right rail (visual content) composition
- Legacy artwork, captions, and core text structure

## What Was Modernized

- Responsive layout behavior across breakpoints
- Mobile navigation (hamburger + paintings year submenu)
- Shared page layout components for consistency
- Unified card/grid styling and interactions
- In-page image preview behavior for media pages
- Cleaner spacing/typography and maintainable CSS organization

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind (imported in global stylesheet)

## Project Structure

- `src/app/` - route pages and global styles
- `src/components/` - shared UI components (nav, split layout, cards, viewers)
- `src/data/` - legacy text/media datasets and scraped content
- `scripts/scrape.mjs` - utility used to collect legacy site content/media

## Routes

- `/` - Home
- `/bio` - Bio
- `/gallery` - Paintings (supports `?year=...`)
- `/available` - Available Paintings
- `/commissions` - Commissions
- `/prints` - Framed Prints
- `/venues` - Venues
- `/news` - News
- `/photos` - Photos

## Run Locally

```bash
npm install
npm run dev
```

Default URL:

- `http://localhost:3000`

If port `3000` is busy, Next.js will automatically use the next available port.

## Build

```bash
npm run build
npm run start
```

## Content/Data Notes

The project intentionally keeps legacy content and media references to preserve brand continuity:

- `src/data/legacy-content.ts`
- `src/data/scraped-content.json`
- `src/data/scraped-artworks.json`

## Deploy (GitHub -> Vercel)

1. Push this repo to GitHub.
2. In Vercel, create a new project and import this repository.
3. Build command: `npm run build`
4. Output handled by Next.js automatically.

No special environment variables are required for the current site.

## Maintainer Notes

- Keep copy/captions faithful to source unless explicitly requested.
- Prefer structure-preserving visual tweaks over redesign.
- Test key pages on both desktop and mobile before release.
