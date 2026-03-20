# Landing Boilerplate

A conversion-focused landing page boilerplate built on Astro. Ships zero JavaScript by default. Designed to go live in a day, not a week.

Built with a real design system, copy frameworks baked into every component, and a skills library that guides every decision from headline to deploy.

---

## Get started

```bash
git clone git@github.com:mario589736/landing-boilerplate.git my-landing
cd my-landing
npm install
npm run dev
```

Open `http://localhost:4321`.

---

## How to launch your landing page

### 1. Write your content

All content lives in one file: `src/pages/index.astro`. Open it and fill in:

- `<Nav>` — your brand name and CTA label
- `<Hero>` — headline, subheadline, CTA, social proof teaser
- `<Features>` — your 4-6 benefits as bento grid cards
- `<SocialProof>` — testimonials with real names, titles, and specific outcomes
- `<FAQ>` — 4-6 objection-removing questions
- `<CTA>` — closing call to action
- `<Base>` — page title and meta description

Do not touch the component files. Components are structure. `index.astro` is content.

**Before writing a single word, read `skills/copy-frameworks.md`.** It covers headline formulas, CTA rules, what makes a testimonial credible, and GDPR requirements for EU audiences.

### 2. Set your brand

Edit `src/styles/global.css`. Three variables control your entire visual identity:

```css
--color-brand-500: oklch(60% 0.2 260);  /* primary brand color */
--color-brand-600: oklch(52% 0.2 260);  /* hover state */
--color-brand-700: oklch(44% 0.2 260);  /* active state */
```

Change the hue (the last number, `260` = indigo) to shift the palette. Everything else — buttons, links, eyebrows, gradients — updates automatically. Dark mode is automatic via `prefers-color-scheme`.

For typography, fonts, and spacing rules see `skills/design-direction.md`.

### 3. Add your images

Drop images in `public/`. Reference them as `/your-image.png`.

Rules:
- Hero image: `loading="eager"`, explicit `width` and `height`
- Everything else: `loading="lazy"`
- Compress before adding. Target under 200KB per image.

### 4. Set your production URL

In `astro.config.mjs`, add your domain:

```js
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

This enables canonical URLs and sitemap generation.

### 5. Deploy

**Netlify or Vercel (recommended):** Connect your GitHub repo and set the build command to `npm run build` with publish directory `dist/`. Auto-deploys on every push.

**Manual:**
```bash
npm run build
# upload dist/ to any static host
```

---

## Skills library

Four reference files in `skills/`. Read before making decisions.

| File | When to use |
|------|-------------|
| `copy-frameworks.md` | Writing headlines, CTAs, testimonials, FAQ answers |
| `design-direction.md` | Changing colors, typography, layout, adding animations |
| `conversion-principles.md` | Page flow, CTA placement, reducing friction, A/B testing |
| `performance-checklist.md` | Before every deploy — Lighthouse 95+ checklist |

---

## Project structure

```
src/
  layouts/
    Base.astro          HTML shell, meta tags, OG, canonical URL
  components/
    Nav.astro           Sticky nav with logo and one CTA
    Hero.astro          Headline, subheadline, CTA pair, social proof teaser
    Features.astro      Bento grid — benefits, not feature specs
    SocialProof.astro   Testimonials + optional logo strip
    FAQ.astro           Native details/summary + JSON-LD schema markup
    CTA.astro           Final call to action with risk reducer
    Footer.astro        Minimal footer with legal links
  styles/
    global.css          Design tokens (Primitive, Semantic, Component layers)
    components.css      Shared utilities: .btn, .container, .section, .eyebrow
  pages/
    index.astro         YOUR CONTENT LIVES HERE

skills/
  copy-frameworks.md
  design-direction.md
  conversion-principles.md
  performance-checklist.md
```

---

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build locally |

---

## Design system

Three-layer token architecture in `global.css`:

```
Primitive  →  raw values (colors, sizes)
Semantic   →  purpose-named aliases (--color-text-primary, --color-interactive)
Component  →  applied in component styles (.btn--primary)
```

Never hardcode a color or font size in a component. Always use the token variables. This is what makes restyling and dark mode work without touching components.

Color uses OKLCH throughout — perceptually uniform, predictable in dark mode.
Typography uses `clamp()` — fluid scaling between mobile and desktop with no breakpoint hacks.
