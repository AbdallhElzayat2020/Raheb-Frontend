# Ibrahim Web Frontend — Advanced Guide

This document is a practical, opinionated guide for developing, maintaining, and shipping the frontend of this project. It consolidates architecture, conventions, performance, accessibility, and delivery workflows in one place.

## Table of Contents
- [Stack Overview](#stack-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Styling & Design System](#styling--design-system)
- [JavaScript Architecture](#javascript-architecture)
- [Accessibility (A11y) Standards](#accessibility-a11y-standards)
- [Performance Budget & Optimizations](#performance-budget--optimizations)
- [SEO & Social Sharing](#seo--social-sharing)
- [Internationalization (i18n) Readiness](#internationalization-i18n-readiness)
- [Quality Gates](#quality-gates)
- [Build, Optimize, and Ship](#build-optimize-and-ship)
- [Troubleshooting](#troubleshooting)

---

## Stack Overview
- HTML5, modern semantic tags
- CSS with a component-first approach (custom CSS + Bootstrap 5 utilities)
- JavaScript (Vanilla ES2015+)
- UI libs: 
  - Bootstrap 5 (layout, navbar, responsive utilities)
  - AOS (Animate On Scroll) for subtle entrance animations
  - Font Awesome for icons

No runtime framework is required; the site serves as static assets that work on any HTTP server (Laragon, Nginx, Apache, Vercel static, Netlify, GitHub Pages…).

---

## Project Structure
```
main_code/
  assets/
    css/
      style.css            # Primary stylesheet (design system, components, utilities)
    js/
      main.js              # Single entry for interactivity and behaviors
    img/                   # Place images here if needed
  index.html               # Landing page (single page)
  about.html               # Optional secondary page (if used)
```
Conventions:
- Keep all public assets under `assets/`.
- Do not commit large media (>5MB) without optimization.
- Co-locate new page-specific CSS in `style.css` using component scopes, not extra files (unless the page is heavy).

---

## Getting Started
### Prerequisites
- A modern browser (Edge/Chrome/Firefox/Safari)
- Any static server (recommended):
  - Laragon (Windows) — out of the box in this workspace
  - `npx serve` (Node.js) or `python -m http.server`

### Run Locally
- With Laragon: place the project directory under Laragon www (already done), then open:
  - `http://localhost/main_code/index.html` (or the virtual host you set)
- With Node:
  ```bash
  npx serve main_code -p 3000
  # open http://localhost:3000
  ```
- With Python:
  ```bash
  cd main_code
  python -m http.server 3000
  # open http://localhost:3000
  ```

---

## Development Workflow
1. Branching (if using git):
   - `main` is production-ready.
   - Feature branches: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`.
2. Edit HTML/CSS/JS in `main_code/`.
3. Test responsive at key breakpoints: 1440, 1200, 992, 768, 576, 375.
4. Validate Lighthouse for Performance/Accessibility/Best Practices/SEO ≥ 90.
5. Commit with conventional messages (e.g., `feat(nav): convert navbar to Bootstrap`).

---

## Styling & Design System
### Tokens (style.css :root)
- Primary brand: `#1f2b7b`
- Secondary brand: `#5fc3ac`
- Keep neutral palette in CSS variables for re-use.

### Architecture
- Component-first BEM-ish naming:
  - Blocks: `.navbar`, `.service-card`, `.vm-item`
  - Elements: `.service-card__icon` (or `.service-icon`), `.vm-item__title`
  - Modifiers: `.is-active`, `.has-error`
- Avoid deep nesting (>3 levels). Prefer flat, readable selectors.
- Use Bootstrap utilities for spacing/layout first; custom CSS for brand look and advanced UI.

### Responsive Rules
- Breakpoints are Bootstrap defaults:
  - `>= 1200px` desktop, `>= 992px` laptop, `>= 768px` tablet, `< 576px` phones
- Navbar is handled by Bootstrap’s `navbar-expand-lg` with toggler.
- Sections use container + rows/cols; no custom CSS grid where Bootstrap suffices.

### Animations
- AOS is enabled globally in `main.js` (`AOS.init`).
- Prefer subtle animations (duration ~1000ms, once: true). Avoid parallax on mobile.

---

## JavaScript Architecture
- Single entry: `assets/js/main.js`
- Modules (by responsibility):
  - Navigation: smooth scroll, active link highlighting, collapse on link click (Bootstrap Collapse API)
  - UX helpers: notifications, scroll-to-top, counters (lightweight, no dependencies)
  - AOS init & refresh when needed
- No jQuery; use modern DOM APIs.

### Rules
- Keep functions small, pure where possible.
- Avoid `setTimeout` where events exist; if used (e.g., for loader fallback), constrain durations.
- Do not mutate DOM more than necessary; batch updates.

---

## Accessibility (A11y) Standards
- Semantic HTML (header/nav/main/section/footer).
- Color contrast:
  - Aim for WCAG AA (contrast ratio ≥ 4.5:1 for text on backgrounds).
- Keyboard navigation:
  - Ensure focus styles are visible.
  - Bootstrap toggler is keyboard-accessible by default.
- ARIA:
  - The navbar toggler has proper `aria-*` attributes.
- Motion:
  - Keep animations subtle; avoid motion-triggered issues.

Checklist:
- [ ] All images have `alt` (or `alt=""` if purely decorative).
- [ ] Links have discernible text.
- [ ] Focus order is logical.

---

## Performance Budget & Optimizations
Targets (mobile, slow 4G):
- First Contentful Paint (FCP): < 2.0s
- Total Blocking Time (TBT): < 150ms
- Total Transfer (HTML+CSS+JS+fonts): < 300KB gzipped (excluding hero image)

Tactics:
- Use Bootstrap CDN + `preconnect` for fonts.
- Defer non-critical JS (Bootstrap bundle + AOS loaded at end of body).
- Compress images (WebP/AVIF preferred). Scale hero images to viewport.
- Avoid layout thrash: batch DOM writes, use CSS transforms for animations.
- Lazy-load large images if added later (IntersectionObserver).

---

## SEO & Social Sharing
- `index.html` includes:
  - `<meta name="description">` with brand message
  - OpenGraph tags for title/description/image
- Use one `<h1>` per page; subsequent headings are hierarchical.
- Use descriptive link text (avoid `click here`).
- Provide a valid `favicon.svg` and `logo.svg`.

---

## Internationalization (i18n) Readiness
- Base language: Arabic (`lang="ar" dir="rtl"`).
- Keep strings in HTML; if adding dynamic content later, isolate strings in a config object so they can be swapped.
- For future i18n: build a simple `translations/<locale>.json` and a loader that switches content after DOM ready.

---

## Quality Gates
- Manual checks:
  - Responsive: test 1440 / 1200 / 992 / 768 / 576 / 375 widths
  - Lighthouse score ≥ 90 in all categories
  - Keyboard-only navigation flows
- Optional tooling (if Node available):
  - Prettier for formatting
  - Stylelint (recommended config) for CSS hygiene

---

## Build, Optimize, and Ship
This is a static site. Deployment = copy `main_code/` to your static host.

### Minimal production hardening
- Inline critical CSS for above-the-fold (optional if needed).
- Minify CSS/JS (optional):
  - CSS: `csso style.css -o style.min.css`
  - JS: `terser main.js -o main.min.js --compress --mangle`
- Add `<link rel="preload">` for critical hero image (optional).

### Hosting Options
- Laragon/Apache/Nginx: point document root to `main_code/`.
- Netlify/Vercel: set `main_code/` as publish directory.
- GitHub Pages: move content to `/docs` or set Pages to serve `/main_code`.

---

## Troubleshooting
- Navbar link does not scroll: ensure target section has a unique `id` and `main.js` uses `.navbar` height for offset (already handled).
- Loader keeps showing: JS fallback hides it after a timeout; verify that the `<script>` tags are not blocked by CSP.
- AOS not animating: ensure the library CSS/JS CDN loads and elements have `data-aos` attributes.
- RTL issues: use Bootstrap RTL build if needed, or prefer logical CSS properties (inline-start/end) in custom CSS.

---

## Contributing
1. Fork / branch from `main`.
2. Follow the conventions in this README.
3. Keep PRs focused and small; include before/after screenshots for UI changes.

---

## License
Proprietary — internal use for Ibrahim Web unless otherwise agreed.
