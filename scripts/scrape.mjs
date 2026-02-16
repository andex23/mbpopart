/**
 * scrape.mjs
 *
 * Scrapes artwork data and site content from mbpopart.com using only built-in
 * Node.js modules. Outputs two JSON files:
 *   - src/data/scraped-artworks.json   (gallery artwork entries)
 *   - src/data/scraped-content.json    (bio, contact, venue info)
 *
 * Usage:  node scripts/scrape.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BASE_URL = "https://mbpopart.com";

const GALLERY_PAGES = [
  "2020.html",
  "2019.html",
  "2018.html",
  "2017.html",
  "2016.html",
  "2015.html",
  "2014.html",
  "2013.html",
  "2012.html",
  "2011.html",
  "2010.html",
  "2009.html",
  "2008.html",
  "2007.html",
  "2005.html",
  "2001.html",
  "1998.html",
  "before.html",
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, "..");
const DATA_DIR = resolve(PROJECT_ROOT, "src", "data");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Fetch a page and decode it as ISO-8859-1 (Latin-1).
 * The site declares charset=ISO-8859-1, so raw 0xA9 bytes (copyright symbol)
 * must be decoded with this charset rather than the default UTF-8.
 */
async function fetchPage(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  const buf = await res.arrayBuffer();
  return new TextDecoder("iso-8859-1").decode(buf);
}

/** Pause for ms milliseconds. */
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Decode common HTML entities. */
function decodeEntities(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

/** Collapse runs of whitespace (tabs, newlines, spaces) into single spaces. */
function cleanWhitespace(str) {
  return str.replace(/[\t\r\n]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

/**
 * Derive a "year" label from the gallery page filename.
 */
function yearLabelFromFilename(filename) {
  const map = {
    "2005.html": "2005-2006",
    "2001.html": "2001-2004",
    "1998.html": "1998-2000",
    "before.html": "Before 1998",
  };
  if (map[filename]) return map[filename];
  return filename.replace(".html", "");
}

// ---------------------------------------------------------------------------
// Artwork parsing
// ---------------------------------------------------------------------------

function parseGalleryPage(html, pageFilename) {
  const yearLabel = yearLabelFromFilename(pageFilename);
  const artworks = [];
  const seen = new Set();

  // Match each artwork block. Attribute order inside <a> may vary, so we
  // capture the full opening tag attributes and parse href/title individually.
  const blockRegex =
    /<a\s+class="single_image"([^>]*)>[\s\S]*?<img\s+src="([^"]*)"[^>]*\/?>[\s\S]*?<\/a>\s*(?:\r?\n)?\s*<p>([\s\S]*?)<\/p>/gi;

  let m;
  while ((m = blockRegex.exec(html)) !== null) {
    const aAttrs = m[1];
    const thumbRaw = m[2];
    const captionRaw = m[3];

    // Extract href
    const hrefMatch = aAttrs.match(/href="([^"]*)"/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1].trim();

    // Extract title (may be empty, missing, or title=>)
    const titleMatch = aAttrs.match(/title="([^"]*)"/i);
    const titleRaw = titleMatch ? titleMatch[1].trim() : "";

    const thumb = thumbRaw.trim();

    // Filter out comingsoon.gif placeholders
    if (href.includes("comingsoon") || thumb.includes("comingsoon")) {
      continue;
    }

    // Deduplicate by href
    if (seen.has(href)) continue;
    seen.add(href);

    // Build absolute URLs
    const fullImageUrl = BASE_URL + "/" + href.replace(/ /g, "%20");
    const thumbnailUrl = BASE_URL + "/" + thumb.replace(/ /g, "%20");

    // Decode entities in title and caption
    const title = decodeEntities(titleRaw);
    const caption = cleanWhitespace(
      decodeEntities(captionRaw.trim()).replace(/<[^>]*>/g, "")
    );

    // Parse title: "Name ©Year Medium Dimensions"
    let paintingName = "";
    let dimensions = null;
    let medium = null;

    if (title) {
      // \u00A9 is the copyright symbol after ISO-8859-1 decode
      const titleParts = title.match(/^(.+?)\s*\u00A9\s*(\d{4})\s*(.*?)$/);
      if (titleParts) {
        paintingName = titleParts[1].trim();
        const rest = titleParts[3].trim();

        // Extract dimensions: e.g. 24" x 24", 40" x 30", 48" x 48"
        const dimMatch = rest.match(
          /(\d+(?:\s*\d+\/\d+)?\s*"\s*x\s*\d+(?:\s*\d+\/\d+)?\s*"(?:\s*x\s*\d+(?:\s*\d+\/\d+)?\s*")?)$/
        );
        if (dimMatch) {
          dimensions = dimMatch[1].trim();
          medium = rest.slice(0, rest.indexOf(dimMatch[1])).trim() || null;
        } else {
          medium = rest || null;
        }
      } else {
        paintingName = title;
      }
    } else {
      // No title -- derive name from caption
      paintingName = caption
        .replace(/\u00A9\s*\d{4}/, "")
        .replace(/\(.*?\)/g, "")
        .trim();
    }

    const isCommission = /commission/i.test(caption);

    artworks.push({
      paintingName,
      title: title || caption,
      imageUrl: fullImageUrl,
      thumbnailUrl,
      dimensions,
      medium,
      caption,
      year: yearLabel,
      isCommission,
      sourceFile: pageFilename,
    });
  }

  return artworks;
}

// ---------------------------------------------------------------------------
// Content parsing (homepage + bio + venues)
// ---------------------------------------------------------------------------

function parseHomepage(html) {
  const result = {
    welcomeText: "",
    contact: {},
    exhibiting: [],
  };

  const introMatch = html.match(
    /<div\s+class="intro_main">([\s\S]*?)<\/div>/i
  );
  if (introMatch) {
    const introHtml = introMatch[1];
    const paragraphs = [];
    const pRegex = /<p>([\s\S]*?)<\/p>/gi;
    let pm;
    while ((pm = pRegex.exec(introHtml)) !== null) {
      const text = cleanWhitespace(pm[1].replace(/<[^>]*>/g, ""));
      if (text) paragraphs.push(decodeEntities(text));
    }
    result.welcomeText = paragraphs.join("\n\n");

    const contactMatch = introHtml.match(
      /<ul\s+class="contact">([\s\S]*?)<\/ul>/i
    );
    if (contactMatch) {
      const phoneMatch = contactMatch[1].match(/Phone:\s*([^<]+)/i);
      const emailMatch = contactMatch[1].match(/href="mailto:([^"]+)"/i);
      if (phoneMatch) result.contact.phone = phoneMatch[1].trim();
      if (emailMatch) result.contact.email = emailMatch[1].trim();
    }
  }

  const exhibitsMatch = html.match(
    /<div\s+class="exhibits">([\s\S]*?)<\/div>/i
  );
  if (exhibitsMatch) {
    const liRegex = /<li>([\s\S]*?)<\/li>/gi;
    let lm;
    while ((lm = liRegex.exec(exhibitsMatch[1])) !== null) {
      const raw = cleanWhitespace(
        lm[1]
          .replace(/<br\s*\/?>/gi, " | ")
          .replace(/<[^>]*>/g, "")
      );
      if (raw) result.exhibiting.push(decodeEntities(raw));
    }
  }

  return result;
}

function parseBioPage(html) {
  const result = {
    bioText: "",
    contact: {},
  };

  const introMatch = html.match(/<div\s+class="intro">([\s\S]*?)<\/div>/i);
  if (introMatch) {
    const introHtml = introMatch[1];
    const paragraphs = [];
    const pRegex = /<p>([\s\S]*?)<\/p>/gi;
    let pm;
    while ((pm = pRegex.exec(introHtml)) !== null) {
      const text = cleanWhitespace(pm[1].replace(/<[^>]*>/g, ""));
      if (text && text !== "&nbsp;" && text.length > 1) {
        paragraphs.push(decodeEntities(text));
      }
    }
    result.bioText = paragraphs.join("\n\n");

    const contactMatch = introHtml.match(
      /<ul\s+class="contact">([\s\S]*?)<\/ul>/i
    );
    if (contactMatch) {
      const phoneMatch = contactMatch[1].match(/Phone:\s*([^<]+)/i);
      const emailMatch = contactMatch[1].match(/href="mailto:([^"]+)"/i);
      if (phoneMatch) result.contact.phone = phoneMatch[1].trim();
      if (emailMatch) result.contact.email = emailMatch[1].trim();
    }
  }

  return result;
}

function parseVenuesPage(html) {
  const venues = [];

  // The venue <li> blocks contain nested <li> inside <ul class="contact">,
  // which breaks regex-based tag matching. Instead, split the HTML on the
  // venue opener tags and process each fragment independently.
  const parts = html.split(/<li\s+class="grid_venues\s+box">/i);

  // First part is everything before the first venue -- skip it.
  for (let i = 1; i < parts.length; i++) {
    const block = parts[i];

    // Extract venue image
    const imgMatch = block.match(/<img\s+src="([^"]*)"[^>]*>/i);
    const imageUrl = imgMatch
      ? BASE_URL + "/" + imgMatch[1].trim().replace(/ /g, "%20")
      : null;

    // Extract contact list items from <ul class="contact">
    const contactMatch = block.match(
      /<ul\s+class="contact">([\s\S]*?)<\/ul>/i
    );
    if (contactMatch) {
      const liTexts = [];
      const liRegex = /<li>([\s\S]*?)<\/li>/gi;
      let lm;
      while ((lm = liRegex.exec(contactMatch[1])) !== null) {
        const text = cleanWhitespace(
          decodeEntities(
            lm[1]
              .replace(/<b>([\s\S]*?)<\/b>/g, "$1")
              .replace(/<[^>]*>/g, "")
          )
        );
        if (text) liTexts.push(text);
      }

      const name = liTexts[0] || "";
      const phone = liTexts.find((t) => /^phone:/i.test(t));
      const email = liTexts.find((t) => /^email:/i.test(t));
      const website = liTexts.find((t) => t.startsWith("http"));
      const addressParts = liTexts
        .slice(1)
        .filter(
          (t) =>
            !/^phone:/i.test(t) &&
            !/^email:/i.test(t) &&
            !t.startsWith("http")
        );
      const address = addressParts.join(", ") || null;

      venues.push({
        name,
        address,
        phone: phone ? phone.replace(/^phone:\s*/i, "").trim() : null,
        email: email ? email.replace(/^email:\s*/i, "").trim() : null,
        website: website || null,
        imageUrl,
      });
    }
  }

  return venues;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Scraping mbpopart.com ...\n");

  mkdirSync(DATA_DIR, { recursive: true });

  // -----------------------------------------------------------------------
  // 1. Scrape gallery pages
  // -----------------------------------------------------------------------
  const allArtworks = [];

  for (const page of GALLERY_PAGES) {
    const url = BASE_URL + "/" + page;
    console.log("  Fetching " + url + " ...");
    try {
      const html = await fetchPage(url);
      const artworks = parseGalleryPage(html, page);
      console.log("    -> Found " + artworks.length + " artworks");
      allArtworks.push(...artworks);
    } catch (err) {
      console.error("    !! Error fetching " + page + ": " + err.message);
    }
    await sleep(300);
  }

  console.log("\n  Total artworks scraped: " + allArtworks.length);

  const artworksPath = resolve(DATA_DIR, "scraped-artworks.json");
  writeFileSync(artworksPath, JSON.stringify(allArtworks, null, 2), "utf-8");
  console.log("  Saved -> " + artworksPath + "\n");

  // -----------------------------------------------------------------------
  // 2. Scrape homepage, bio, and venues for content
  // -----------------------------------------------------------------------
  console.log("  Fetching homepage ...");
  const homepageHtml = await fetchPage(BASE_URL + "/index.html");
  const homepageData = parseHomepage(homepageHtml);
  await sleep(300);

  console.log("  Fetching bio page ...");
  const bioHtml = await fetchPage(BASE_URL + "/bio.html");
  const bioData = parseBioPage(bioHtml);
  await sleep(300);

  console.log("  Fetching venues page ...");
  const venuesHtml = await fetchPage(BASE_URL + "/venues.html");
  const venuesData = parseVenuesPage(venuesHtml);

  const contentData = {
    homepage: homepageData,
    bio: bioData,
    venues: venuesData,
    scrapedAt: new Date().toISOString(),
  };

  const contentPath = resolve(DATA_DIR, "scraped-content.json");
  writeFileSync(contentPath, JSON.stringify(contentData, null, 2), "utf-8");
  console.log("  Saved -> " + contentPath + "\n");

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
