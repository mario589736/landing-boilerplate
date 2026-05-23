// IndexNow ping — notifies Bing (and Yandex, Seznam, Naver, and Ecosia, which reads
// Bing) of all pages on every production deploy, instead of waiting to be crawled.
//
// Reads the Astro-generated sitemap from dist/, extracts every <loc>, and submits the
// batch to IndexNow. Runs after `astro build` via the `postbuild` script.
//
// ─────────────────────────────────────────────────────────────────────────────────
// ONE-TIME SETUP (per site):
//   1. Set HOST below to your canonical domain (the one your DNS/host serves — usually
//      the www or apex variant your platform redirects TO, not FROM). It must match
//      `site:` in astro.config.mjs.
//   2. Generate a key:  node -e "console.log(crypto.randomUUID().replace(/-/g,'')+crypto.randomUUID().replace(/-/g,''))"
//   3. Put that key in KEY below.
//   4. Create public/<KEY>.txt containing exactly the key on one line. This proves
//      domain ownership to the search engines.
//   5. Deploy. The key file goes live at https://<HOST>/<KEY>.txt and pings start.
// Until HOST and KEY are filled in, this script no-ops (won't break the build).
// ─────────────────────────────────────────────────────────────────────────────────
//
// Only pings on Vercel/Netlify PRODUCTION builds. Preview/local builds are skipped so
// they don't push staging URLs into the index. Override locally with INDEXNOW_FORCE=1.

import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const HOST = ''; // e.g. 'www.yourdomain.com' — TODO: set this
const KEY = ''; //  e.g. 64-char hex string — TODO: set this
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const DIST = 'dist';

if (!HOST || !KEY) {
  console.log('[indexnow] not configured (HOST/KEY empty) — skipping. See scripts/indexnow.mjs.');
  process.exit(0);
}

// VERCEL_ENV (Vercel) or CONTEXT (Netlify) tells us if this is a production build.
const isProd =
  process.env.VERCEL_ENV === 'production' || process.env.CONTEXT === 'production';
const forced = process.env.INDEXNOW_FORCE === '1';

if (!isProd && !forced) {
  console.log('[indexnow] skipped (not a production build). Set INDEXNOW_FORCE=1 to ping anyway.');
  process.exit(0);
}

// Astro's sitemap integration emits sitemap-index.xml + sitemap-0.xml (etc.). The
// output location varies by adapter (dist/ for static, dist/client/ for the Vercel
// adapter), so walk dist/ to find them. Pull <loc> values, skip the index entries.
async function findSitemaps(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await findSitemaps(full)));
    } else if (entry.name.startsWith('sitemap') && entry.name.endsWith('.xml')) {
      out.push(full);
    }
  }
  return out;
}

async function collectUrls() {
  let files;
  try {
    files = await findSitemaps(DIST);
  } catch {
    throw new Error(`[indexnow] cannot read ${DIST}/ — did the build run?`);
  }

  const urls = new Set();
  for (const file of files) {
    const xml = await readFile(file, 'utf8');
    for (const m of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
      const loc = m[1].trim();
      // Skip sitemap files referenced by the index; keep only real pages.
      if (loc.includes('/sitemap') && loc.endsWith('.xml')) continue;
      if (loc.startsWith(`https://${HOST}/`)) urls.add(loc);
    }
  }
  return [...urls];
}

const urlList = await collectUrls();

if (urlList.length === 0) {
  console.warn(
    '[indexnow] no URLs found for ' +
      `https://${HOST}/ — check that astro.config.mjs site matches HOST.`,
  );
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// IndexNow returns 200 (accepted) or 202 (accepted, pending verification).
if (res.ok || res.status === 202) {
  console.log(`[indexnow] submitted ${urlList.length} URLs (HTTP ${res.status}).`);
} else {
  const body = await res.text().catch(() => '');
  console.error(`[indexnow] failed: HTTP ${res.status} ${body}`.trim());
  // Don't fail the deploy over a search-ping error.
  process.exit(0);
}
