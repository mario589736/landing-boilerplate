# CLAUDE.md — Landing Boilerplate

Instructions for Claude Code when working in this repo.

## What this is

A conversion-focused landing page boilerplate built on Astro. Zero JS by default. Ships fast. Designed for founders and indie hackers who want to go live this week.

## Core principle

Serve the user goal, not the developer ego. Every design decision, every line of copy, every component should answer: does this help a visitor convert?

---

## Architecture

```
src/
  layouts/
    Base.astro          — HTML shell, meta tags, SEO, font loading
  components/
    Nav.astro           — sticky nav with CTA
    Hero.astro          — headline, sub, CTA, social proof teaser
    Features.astro      — bento grid layout
    SocialProof.astro   — testimonials + logo strip
    FAQ.astro           — native details/summary, schema markup
    CTA.astro           — final call to action
    Footer.astro        — minimal footer
  styles/
    global.css          — design tokens + reset
    components.css      — shared utility classes (btn, container, section)
  pages/
    index.astro         — ALL CONTENT LIVES HERE — edit this file

skills/                 — reference docs for vibe coding (see below)
  design-direction.md
  copy-frameworks.md
  conversion-principles.md
  performance-checklist.md
```

**Rule: content lives in `pages/index.astro` — components are structure, not data.**

---

## Vibe coding guidelines

### When adding a new section

1. Create the component in `src/components/[Name].astro`
2. Define a clear Props interface at the top
3. Put content (copy, arrays, objects) in `pages/index.astro`, not inside the component
4. Add a comment block explaining the copy framework or design principle used
5. Import and use in `pages/index.astro`

### When changing colors or typography

Edit `src/styles/global.css` only. Never hardcode color values in component styles. Always use the token variables (`--color-text-primary`, `--color-interactive`, etc.). The three-layer system (Primitive → Semantic → Component) is intentional — respect it.

### When adding interactivity

Use Astro islands sparingly:
- `client:load` — visible immediately, essential UI
- `client:visible` — below the fold, loads when scrolled to
- `client:idle` — non-critical, loads when browser is idle

Default: no JS. Prefer native HTML (details/summary for accordions, form elements for input).

### When writing copy

Read `skills/copy-frameworks.md` first. Rules:
- Headline names the problem or outcome. Never a question. No buzzwords.
- Subheadline agitates the gap (where they are vs where they want to be).
- CTA uses an action verb. Never "Submit", "Click here", or "Learn more".
- Testimonials must include a specific outcome, full name, title, company.
- One idea per section. Do not cram.

### When doing design

Read `skills/design-direction.md`. Core rules:
- Functional before delightful. If it breaks on mobile, the hover animation doesn't matter.
- Use `clamp()` for fluid sizes — never hardcode px values for type or spacing.
- OKLCH for color — perceptually uniform, great for dark mode.
- 4px grid (0.25rem increments). Padding: 1rem, 1.5rem, 2rem, 3rem.
- Shadow on hover only — not decorative.

---

## Performance rules

- Images: use `loading="lazy"` on all images below the fold. Use `loading="eager"` on hero images.
- Fonts: self-host, preload in Base.astro, use `font-display: swap`.
- No external scripts unless absolutely necessary (analytics is the exception).
- Target: Lighthouse score 95+ on mobile.

---

## Deployment

```bash
npm run dev       # local dev at localhost:4321
npm run build     # production build to dist/
npm run preview   # preview production build locally
```

Deploy to Netlify or Vercel — drop the `dist/` folder or connect the repo with auto-deploy.

Set `site` in `astro.config.mjs` to your production URL for canonical links and sitemap.

---

## What NOT to do

- Do not install UI component libraries (shadcn, Flowbite, etc.) — the design system is intentionally minimal.
- Do not add React, Vue, or Svelte unless a specific interactive feature requires it.
- Do not hardcode colors — always use token variables.
- Do not put content strings inside component files — content belongs in the page.
- Do not add unnecessary wrapper divs — flat, semantic HTML is the goal.
