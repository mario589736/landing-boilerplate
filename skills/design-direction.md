# Design Direction

State-of-the-art design principles for landing pages (2025-2026). Use this when making visual decisions, reviewing output, or writing design specs.

---

## Core hierarchy

Every design decision passes this filter, in order:

1. Functional — does it work for the user?
2. Accessible — can everyone use it? (WCAG 2.2 AA minimum)
3. Clear — is the information hierarchy obvious?
4. Consistent — does it feel like one system?
5. Delightful — does it earn trust and emotional engagement?

Most design fails at level 2 or 3 while optimizing for 5. Don't.

---

## Design token system

This boilerplate uses a three-layer token system. Do not bypass it.

```
Primitive (raw values)
  --color-neutral-900: oklch(15% 0 0)
  --color-brand-500: oklch(60% 0.2 260)

Semantic (purpose)
  --color-text-primary: var(--color-neutral-900)
  --color-interactive: var(--color-brand-500)

Component (applied)
  .btn--primary { background-color: var(--color-interactive) }
```

To retheme: edit primitives in `global.css`. Semantic and component layers update automatically.

---

## Color

Use OKLCH. It is the 2025 standard. Perceptually uniform lightness, predictable hue shifts.

```css
/* Good */
--color-brand: oklch(60% 0.2 260);

/* Avoid */
--color-brand: #6366f1;
```

For dark mode: define a separate semantic layer under `@media (prefers-color-scheme: dark)`. Never just invert. Dark mode needs lower contrast ratios and warmer neutrals.

Accessibility minimums:
- Normal text: 4.5:1 contrast ratio
- Large text (18px+ or bold 14px+): 3:1
- Interactive elements: 3:1 against adjacent colors

---

## Typography

Fluid type using `clamp()`. Already defined in `global.css`. Never hardcode font sizes.

```css
/* Good */
font-size: var(--text-3xl);

/* Avoid */
font-size: 40px;
```

Type scale: Major Third (1.25 ratio) for body, Perfect Fourth (1.333) for display.

Readability rules:
- Line length: 60-75 characters per line (use `max-width: 65ch`)
- Line height: 1.5-1.7 for body, 1.1-1.2 for headings
- Tracking: tight for large headings (`letter-spacing: -0.025em`), normal for body

---

## Spacing

4px grid (0.25rem increments). Common values: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px.

Use the semantic spacing variables:
- `--space-content` — horizontal padding (responsive)
- `--space-section` — vertical section padding (responsive)

---

## Layout

Bento Grid is the dominant 2025 landing page pattern. It allows varied card sizes to create visual hierarchy without needing separate sections.

```css
/* 3-column responsive grid */
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1rem;
```

Breakpoints: mobile-first. 640px (sm), 768px (md), 1024px (lg), 1280px (xl).

---

## Shadows

Elevation only, not decoration. Three levels:

```css
--shadow-sm: 0 1px 3px oklch(0% 0 0 / 0.08);   /* resting state */
--shadow-md: 0 4px 16px oklch(0% 0 0 / 0.10);  /* hover state */
--shadow-lg: 0 12px 40px oklch(0% 0 0 / 0.12); /* modals, dropdowns */
```

In dark mode, shadows are nearly invisible. Use subtle borders instead.

---

## Motion

Micro-interactions build trust. Keep them fast and purposeful.

```css
/* Standard hover transition */
transition: background-color 0.15s, color 0.15s, box-shadow 0.2s, transform 0.1s;

/* Active press feedback */
.btn:active { transform: scale(0.98); }
```

Rules:
- Duration: 100-200ms for immediate feedback, 200-350ms for layout changes
- Easing: `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for continuous
- Never animate layout properties (width, height, top, left) — use transform instead
- Respect `prefers-reduced-motion`

---

## Images

- Hero images: `loading="eager"`, provide explicit width/height
- Below-fold images: `loading="lazy"`
- Format priority: AVIF > WebP > PNG/JPG
- Always include descriptive alt text. Decorative images: `alt=""`
- Optimize before shipping. Target: under 200KB for hero image

---

## Accessibility checklist

Before shipping any section:

- [ ] All interactive elements reachable by keyboard
- [ ] Focus styles visible and styled (not browser default)
- [ ] Color is not the only way to convey information
- [ ] Images have meaningful alt text
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skipping)
- [ ] Form fields have visible labels (not just placeholder text)
- [ ] Contrast ratios meet WCAG 2.2 AA

---

## Patterns to use

- Bento Grid — varied card sizes, visual hierarchy
- Glassmorphism — frosted glass nav, modals (not overused)
- Asymmetric hero — offset content + image, visual tension
- Full-bleed section backgrounds — alternating light/muted sections

## Patterns to avoid

- Carousels — mobile nightmare, low engagement, accessibility failure
- Popups on page load — users hate them, conversion data is mixed at best
- Infinite scroll — works for feeds, terrible for landing pages (no clear CTA)
- Parallax on mobile — causes motion sickness, kills performance
