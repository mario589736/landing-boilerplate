# Performance Checklist

Target: Lighthouse 95+ on mobile. Run before every deploy.

---

## Images

- [ ] All images below fold have `loading="lazy"`
- [ ] Hero images have `loading="eager"` and explicit `width`/`height`
- [ ] Images are AVIF or WebP (with fallback via `<picture>`)
- [ ] No image exceeds 200KB after compression
- [ ] SVG icons are inlined or in a sprite (not individual HTTP requests)
- [ ] `alt` attributes on all images (empty string for decorative)

## Fonts

- [ ] Font files are self-hosted in `/public/fonts/` (no Google Fonts CDN)
- [ ] Font preloaded in `<head>`: `<link rel="preload" as="font" ...>`
- [ ] `font-display: swap` or `font-display: optional` set
- [ ] Maximum 2 typefaces. Maximum 4 weights total.

## JavaScript

- [ ] Zero unnecessary client-side JS (Astro ships none by default)
- [ ] Analytics script loaded with `async` or `defer`
- [ ] No render-blocking scripts in `<head>`
- [ ] Astro islands use `client:visible` for below-fold components

## CSS

- [ ] No unused CSS shipped (Tailwind purges automatically)
- [ ] Critical CSS inlined for above-fold content where needed
- [ ] Animations use `transform` and `opacity` only (GPU-composited)
- [ ] `will-change` used sparingly, only on actively animating elements

## HTML

- [ ] `<html lang="...">` set correctly
- [ ] One `<h1>` per page
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] `<meta name="description">` populated
- [ ] Open Graph tags complete
- [ ] Canonical URL set
- [ ] `robots.txt` exists

## Core Web Vitals targets

| Metric | Target | What it measures |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | Perceived load speed |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |
| INP (Interaction to Next Paint) | < 200ms | Responsiveness |

Common LCP fixes: preload hero image, self-host font, defer non-critical resources.
Common CLS fixes: set explicit width/height on images, reserve space for lazy-loaded content, avoid inserting elements above existing content.

## Pre-deploy commands

```bash
npm run build          # check for build errors
npm run preview        # test production build locally
npx lighthouse http://localhost:4321 --view  # run Lighthouse
```
